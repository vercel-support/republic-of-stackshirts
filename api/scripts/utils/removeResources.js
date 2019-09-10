const { firebaseDb } = require('@stackshirts/firebase');
const Queue = require('p-queue/index');
const _mapValues = require('lodash/mapValues');

const queue = new Queue({ concurrency: 4 });

module.exports = function removeResources(uploadCache) {

  _mapValues(uploadCache, (resourceCache, resourceType) => {

    firebaseDb.collection(resourceType).get()
      .then((snap) => {
        snap.forEach((doc) => {
          const {
            type,
            id,
          } = doc.data();
          if (!resourceCache[doc.id]) {
            queue.add(() => {
              console.log(`Removing ${type}:${id}`);
              return firebaseDb
                .doc(`${type}/${id}`).delete()
            });
          }
        });
      });
  });
};
