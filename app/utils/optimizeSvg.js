const P = require('bluebird')
const path = require('path')
const SVGO = require('svgo')

const svgo = new SVGO({
  plugins: [{
    removeDimensions: true,
  }, {
    removeXMLNS: true,
  }, {
    cleanupIDs: true,
  }],
})

const fs = P.promisifyAll(require('fs'))

// Get pathToSvg from args
const args = process.argv.slice(2)

// static/gilbarbaraLogos
// yarn svgo static/gilbarbaraLogos/100

const pathToSvg = path.resolve(__dirname, '../', args[0])

return fs.readFileAsync(pathToSvg)
  .then((data) => {


    return svgo.optimize(data, { path: pathToSvg })
      .then((result) => {

        // {
        //     // optimized SVG data string
        //     data: '<svg width="10" height="20">test</svg>'
        //     // additional info such as width/height
        //     info: {
        //         width: '10',
        //         height: '20'
        //     }
        // }

        return fs.writeFileAsync(pathToSvg, result.data)

      })

  })
