const path = require('path')
const yargs = require('yargs')
const gaze = require('gaze')
const babel = require('babel-core')
const UglifyJS = require('uglify-js')

const { logInfo, logSuccess, logError } = require('./logging-tools')
const { writeFile } = require('./fs-tools')
const pjson = require('../package.json')

const config = require('../config')

const babelOptions = pjson.browserify.transform[0][1]

const inputDir = path.join(config.sourceDir, config.scripts.inputDir)
const inputFile = path.join(inputDir, config.scripts.inlineInputFile)
const outputDir = path.join(config.tmpDir, config.scripts.outputDir)
const outputFile = path.join(outputDir, config.scripts.inlineOutputFile)

const argv = yargs.argv

if (argv.watch) {
  watch()
} else {
  build()
}

function watch() {
  gaze(inputFile, (error, watcher) => {
    if (error) {
      logError(error.toString())
    } else {
      watcher.on('changed', handleChange)
      watcher.on('added', handleChange)
    }
  })
}

function handleChange() {
  build()
}

function build() {
  logInfo('Building inline scripts')
  return transformScripts()
    .then(minifyScripts)
    .then(data => writeFile(outputFile, data))
    .then(() => logSuccess('Inline scripts built'))
    .catch(error => logError(error))
}

function transformScripts() {
  return new Promise((resolve, reject) => {
    babel.transformFile(inputFile, babelOptions, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result.code)
      }
    })
  })
}

function minifyScripts(data) {
  if (argv.minify) {
    return new Promise((resolve, reject) => {
      const minified = UglifyJS.minify(data)
      if (minified.error) {
        reject(minified.error)
      } else {
        resolve(minified.code)
      }
    })
  } else {
    return Promise.resolve(data)
  }
}
