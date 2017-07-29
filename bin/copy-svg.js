const path = require('path')
const yargs = require('yargs')
const gaze = require('gaze')

const { logInfo, logSuccess, logError } = require('./logging-tools')
const { minifySvgFiles } = require('./image-tools')
const { copyFile } = require('./fs-tools')

const config = require('../config')

const inputDir = config.svg.inputDir
const outputDir = config.svg.outputDir

const argv = yargs.argv

if (argv.watch) {
  watch()
} else if (argv.minify) {
  minifyAllSvg()
} else {
  copyAllSvg()
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
  if (argv.minify) {
    minifySvg(filepath)
  } else {
    copySvg(filepath)
  }
}

function minifySvg(filepath) {
  const basename = path.basename(filepath)
  logInfo(`Minifying ${basename}`)
  minifySvgFiles([filepath], outputDir)
    .then(() => logSuccess(`${basename} minified`))
    .catch(error => logError(error.toString()))
}

function copySvg(filepath) {
  const basename = path.basename(filepath)
  logInfo(`Copying ${basename}`)
  copyFile(filepath, path.join(outputDir, basename))
    .then(() => logSuccess(`${basename} copied`))
    .catch(error => logError(error.toString()))
}

function minifyAllSvg() {
  logInfo('Minifying SVG files')
  minifySvgFiles([path.join(inputDir, '*.svg')], outputDir)
    .then(() => logSuccess('SVG files minified'))
    .catch(error => logError(error.toString()))
}

function copyAllSvg() {
  logInfo('Copying SVG files')
  copyFile(inputDir, outputDir)
    .then(() => logSuccess('SVG files copied'))
    .catch(error => logError(error.toString()))
}
