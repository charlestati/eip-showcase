const path = require('path')
const yargs = require('yargs')
const gaze = require('gaze')

const { logInfo, logSuccess, logError } = require('./logging-tools')
const { copyFile } = require('./fs-tools')

const config = require('../config')

const inputDir = config.fonts.inputDir
const outputDir = config.fonts.outputDir

const argv = yargs.argv

if (argv.watch) {
  watch()
} else {
  build()
}

function watch() {
  gaze(path.join(inputDir, '**', '*'), (error, watcher) => {
    if (error) {
      logError(error.toString())
    } else {
      watcher.on('changed', handleChange)
      watcher.on('added', handleChange)
    }
  })
}

function handleChange(filepath) {
  const basename = path.basename(filepath)
  logInfo(`Copying ${basename}`)
  copyFile(filepath, path.join(outputDir, basename))
    .then(() => logSuccess(`${basename} copied`))
    .catch(error => {
      if (error[0].code !== 'ENOENT') {
        logError(error.toString())
      }
    })
}

function build() {
  logInfo('Copying fonts')
  copyFile(inputDir, outputDir)
    .then(() => logSuccess('Fonts copied'))
    .catch(error => {
      if (error[0].code !== 'ENOENT') {
        logError(error.toString())
      }
    })
}
