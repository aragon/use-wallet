const path = require('path')
const images = require('rollup-plugin-image-files')

module.exports = {
  rollup(config, options) {
    config.plugins = [
      images({ incude: ['**/*.png', '**/*.jpg', '**/*.svg'] }),
      ...config.plugins,
    ]
    // export in separate dist/esm and dist/cjs directories
    delete config.output.file
    config.output.dir = path.join(__dirname, `dist/${options.format}`)
    return config
  },
}
