import glob from 'glob';
import P from 'bluebird';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import path from 'path';

const resolve = (p) => path.resolve(__dirname, p);

async function main() {
  await fs.emptyDir(resolve('../build'));
  const globPath = resolve('../src/**/*.yml');
  const filenames = glob.sync(globPath);
  await P.map(filenames, async function (filename) {
    const yml = await fs.readFile(filename, 'utf8');
    const resource = yaml.safeLoad(yml);
    const buildPath = filename.replace('/src/', '/build/').replace('.yml', '.json').toLowerCase();
    await fs.outputJson(buildPath, resource);
  });
}

main()
  .then(() => {
    console.log('Build completed');
  })
  .catch((e) => {
    console.error(e);
  });
