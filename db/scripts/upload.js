const dotenv = require('dotenv');

process.env.NODE_ENV === 'production' /* eslint-disable-line no-unused-expressions */
  ? dotenv.config({ path: '.env.production' })
  : dotenv.config({ path: '.env.development' });
dotenv.config();

const P = require('bluebird');
const mri = require('mri');
const uploadToSearch = require('api/scripts/utils/uploadToSearch');
const uploadResources = require('api/scripts/utils/uploadResources');
const removeResources = require('api/scripts/utils/removeResources');
const uploadStatic = require('api/scripts/utils/uploadStatic');
const matchPath = require('api/scripts/utils/matchPath');
const childProcess = require('@lerna/child-process');

const argv = process.argv.slice(2);
const args = mri(argv);


function getLastTag() {
  return childProcess.execSync('git', ['describe', '--tags', '--abbrev=0']);
}

function getChangesSinceLastTag(lastCommit) {
  return childProcess.execSync('git', ['diff', lastCommit, '--name-only']).split('\n');
}

const RESOURCE_PATH = 'api/src/:resourceType(organizations|productLabels|products)/:letter/:id/(.*).yml';

P.method(async () => {

  console.log('args', args);
  if (args.rsync) {
    await uploadToSearch();
    const uploadCache = await uploadResources();
    await removeResources(uploadCache);
  }
  else {
    const lastTag = getLastTag();
    const resourceChanges = getChangesSinceLastTag(lastTag)
      .filter(filename => {
        return matchPath(filename, {
          path: RESOURCE_PATH
        });
      });
    if (resourceChanges && resourceChanges.length) {
      await uploadResources(resourceChanges);
      await uploadToSearch(resourceChanges);
    }
    else {
      console.log('No relevant changes since last release')
    }
  }

  uploadStatic();

})();
