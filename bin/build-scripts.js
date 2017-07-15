const fs = require('fs')
const path = require('path')
const yargs = require('yargs')
const chalk = require('chalk')
const figures = require('figures')
const browserify = require('browserify')
const watchify = require('watchify')
const UglifyJS = require('uglify-js')

const config = require('../config')

const sourceFile = path.join(
  config.sourceDir,
  config.scripts.sourceDir,
  config.scripts.sourceFile
)

const outputFile = path.join(
  config.distDir,
  config.scripts.outputDir,
  config.scripts.outputFile
)

const argv = yargs.argv

const b = browserify({
  entries: sourceFile,
  cache: {},
  packageCache: {},
  debug: !argv.minify,
})

if (argv.watch) {
  b.plugin(watchify)
  b.on('update', build)
}

function bundleScripts() {
  return new Promise((resolve, reject) => {
    b.bundle(
      (error, buffer) => (error ? reject(error) : resolve(buffer.toString()))
    )
  })
}

function minifyScripts(data) {
  return new Promise((resolve, reject) => {
    if (argv.minify) {
      const minified = UglifyJS.minify(data)
      if (minified.error) {
        reject(minified.error)
      } else {
        resolve(minified.code)
      }
    } else {
      resolve(data)
    }
  })
}

function writeScripts(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(outputFile, data, error => (error ? reject(error) : resolve()))
  })
}

function build() {
  console.log(chalk.bold.blue(`${figures.pointer} Building scripts`))

  bundleScripts()
    .then(minifyScripts)
    .then(writeScripts)
    .then(() => console.log(chalk.bold.green(`${figures.tick} Scripts built`)))
    .catch(error =>
      console.log(chalk.bold.red(`${figures.cross} ${error.toString()}`))
    )
}

build()
