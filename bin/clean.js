const chalk = require('chalk')
const figures = require('figures')

const { logInfo, logSuccess, logError } = require('./logging-tools')
const { removeFile } = require('./fs-tools')

const config = require('../config')

clean()

function clean() {
  logInfo('Cleaning app')
  const files = [config.distDir, config.tmpDir]
  Promise.all(files.map(removeFile))
    .then(() => {
      logSuccess('App cleaned')
    })
    .catch(error => {
      logError(error.toString())
    })
}
