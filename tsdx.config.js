const path = require('path')

module.exports = {
  rollup(config, options) {
    // export in separate dist/esm and dist/cjs directories
    delete config.output.file
    config.output.dir = path.join(__dirname, `dist/${options.format}`)
    return config
  },
}
