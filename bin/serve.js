const BrowserSync = require('browser-sync')

const config = require('../config')

let bs

if (require.main === module) {
  bs = BrowserSync.create()

  bs.init({
    server: config.distDir,
    files: config.distDir,
    ghostMode: false,
    notify: false,
    open: false,
  })
}

module.exports = bs
