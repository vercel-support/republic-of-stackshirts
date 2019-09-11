const spawn = require('cross-spawn');

console.log('Doing gcloud actions against:', process.env.FIREBASE_PROJECT_ID);

module.exports = function uploadStatic() {
  spawn.sync('gcloud', ['config', 'set', 'project', process.env.FIREBASE_PROJECT_ID], { stdio: 'inherit' });
  spawn.sync('gsutil', ['-m', 'rsync', '-d', '-r', '-x', '.*\\.(yml|snap|js)$', 'src', `${process.env.FIREBASE_STORAGE_BUCKET}`], { stdio: 'inherit' });
  spawn.sync('gsutil', ['acl', 'ch', '-u', 'AllUsers:R', process.env.FIREBASE_STORAGE_BUCKET], { stdio: 'inherit' });

  // gcloud config set project ${FIREBASE_PROJECT_ID}
  // gsutil -m rsync -r build ${FIREBASE_STORAGE_BUCKET}
  // gsutil acl ch -u AllUsers:R ${FIREBASE_STORAGE_BUCKET}
};
