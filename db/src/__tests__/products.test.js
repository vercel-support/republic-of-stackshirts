import glob from 'glob';
import path from 'path';
import update from 'immutability-helper';
import fs from 'fs';
import yaml from 'js-yaml';
import _each from 'lodash/each';

describe('All products have propTypes', () => {

  const filenames = glob.sync('src/products/**/*.yml');

  _each(filenames, (filename) => {


    it(filename, async () => {


      let yamlString = fs.readFileSync(path.resolve('.', filename), 'utf8');
      let product = yaml.load(yamlString);
      

      product = update(product, {
        attributes: {
          logos: (logos) => Object.values(logos),
          icons: (icons) => Object.values(icons),
        }
      });

      yamlString = yaml.dump(product, {
        'styles': {
          '!!null': 'canonical' // dump null as ~
        },
      });
      expect(yamlString).toMatchSnapshot();

      fs.writeFileSync(filename, yamlString, 'utf8');
    });

  });


});

// describe('All productLabels', () => {
//
//   const productLabels = _values(require('../productLabels/productLabels.json'))
//
//   _each(productLabels, (productLabel) => {
//
//     it(productLabel.id, async () => {
//
//       let yamlString = yaml.dump(productLabel, {
//         'styles': {
//           '!!null': 'canonical' // dump null as ~
//         },
//         sortKeys: (key) => {
//           console.log('key', key);
//           return ['id', 'type', 'attributes', 'createOn', 'name'].indexOf(key)
//         }
//       })
//
//       const writeToPath = path.resolve(__dirname, `../productLabels/${productLabel.id.slice(0, 1)}/${productLabel.id}/${productLabel.id}.yml`)
//       // console.log('writeToPath', writeToPath);
//       // console.log('yamlString', yamlString);
//       // expect(yamlString).toMatchSnapshot()
//       mkdirp(getDirName(writeToPath), function (err) {
//         if (err) return cb(err);
//
//         fs.writeFileSync(writeToPath, yamlString, 'utf8')
//       });
//
//
//     })
//
//
//   })
//
// })

