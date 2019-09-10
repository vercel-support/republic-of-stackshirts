const P = require('bluebird');
const algoliasearch = require('algoliasearch');
const through = require('through2');
const yaml = require('js-yaml');
const gulp = require('gulp');

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY,
);

const pipeOptions = {
  highWaterMark: 2,
  objectMode: true
};


/**
 *
 * {
    action: 'addObject',
    indexName: 'products',
    body: {
      objectID: 'myID2',
      id: 'apache',
      ...
    }
  },
 */

module.exports = function uploadResources(filenames = 'api/src/**/*.yml') {
  
  console.log('filenames', filenames);

  return new P((resolve) => {

    const operations = [];

    gulp
      .src(filenames, {
        cwd: '../',
      })
      .pipe(
        through.obj(pipeOptions, (file, _, next) => {
          const resource = yaml.safeLoad(file.contents.toString('utf8'));
          next(null, {
            resource,
          });
        })
      )
      .on('data', ({ resource }) => {
        if (!resource.type || !resource.id) {
          return console.log('Not a valid resource');
        }
        console.log(`Add resource ${resource.type}:${resource.id}`);
        operations.push({
          action: 'addObject',
          indexName: resource.type,
          body: {
            ...resource,
            objectID: resource.id,
          }
        });
      })
      .on('end', async () => {
        await client.batch(operations);
        resolve();
      });

  })
    .then(() => {
      console.log('Everything updated in algolia');
    })
    .catch((e) => {
      console.warn(e);
    });
};
