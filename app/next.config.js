const withPlugins = require('next-compose-plugins');

const withSass = require('@zeit/next-sass')
const withMDX = require('@zeit/next-mdx')
const optimizedImages = require('next-optimized-images')


module.exports = withPlugins([
  [withSass, {
    pageExtensions: ['js', 'jsx', 'mdx'],
  }],
  [optimizedImages],
  [withMDX, {
    extension: /\.mdx?$/,
    options: {
      mdPlugins: [

      ],
      hastPlugins: [

      ]
    }
  }]
], {
  webpack: function (config) {
    config.module.rules.push(
      {
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      },
    )
    return config
  }
})

