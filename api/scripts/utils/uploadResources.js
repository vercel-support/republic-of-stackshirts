const methods = require('@stackshirts/sdk/methods');
const P = require('bluebird');
const gulp = require('gulp');
const Queue = require('p-queue/index');
const through = require('through2');
const yaml = require('js-yaml');
const _set = require('lodash/set');

const queue = new Queue({ concurrency: 4 });
const pipeOptions = {
  highWaterMark: 4,
  objectMode: true
};

module.exports = function uploadToSearch(filenames = 'api/src/**/*.yml') {

  const uploadCache = {};

  if (!filenames.length) {
    return uploadCache
  }

  return new P(resolve => {
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
          return console.log('Not a valid resource')
        }
        console.log(`Add resource ${resource.type}:${resource.id}`);
        queue.add(async () => {
          methods.createResource(resource)
          _set(uploadCache, `${resource.type}.${resource.id}`, true);
        });

      })
      .on('end', () => {
        resolve(uploadCache);
      });
  });

};


