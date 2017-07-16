const path = require('path')
const yargs = require('yargs')
const chalk = require('chalk')
const figures = require('figures')
const watch = require('watch')
const fs = require('fs-extra')
const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')

const config = require('../config')

const sourceDir = path.join(config.sourceDir, config.images.sourceDir)
const outputDir = path.join(config.distDir, config.images.outputDir)

const argv = yargs.argv

function minify() {
  console.log(chalk.bold.blue(`${figures.pointer} Minifying images`))

  imagemin([path.join(sourceDir, '*.{jpg,png}')], outputDir, {
    plugins: [imageminJpegtran(), imageminPngquant({ quality: '90-100' })],
  })
    .then(() => {
      console.log(chalk.bold.green(`${figures.tick} Images minified`))
    })
    .catch(error =>
      console.log(chalk.bold.red(`${figures.cross} ${error.toString()}`))
    )
}

function copy() {
  console.log(chalk.bold.blue(`${figures.pointer} Copying images`))

  fs
    .copy(sourceDir, outputDir)
    .then(() => {
      console.log(chalk.bold.green(`${figures.tick} Images copied`))
    })
    .catch(error => {
      console.log(chalk.bold.red(`${figures.cross} ${error.toString()}`))
    })
}

if (argv.watch) {
  watch.watchTree(sourceDir, copy)
} else if (argv.minify) {
  minify()
} else {
  copy()
}
