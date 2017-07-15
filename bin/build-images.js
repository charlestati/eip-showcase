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

function build() {
  console.log(chalk.bold.blue(`${figures.pointer} Building images`))

  imagemin([path.join(sourceDir, '*.{jpg,png}')], outputDir, {
    plugins: [imageminJpegtran(), imageminPngquant({ quality: '90-100' })],
  })
    .then(() => {
      console.log(chalk.bold.green(`${figures.tick} Images built`))
    })
    .catch(error =>
      console.log(chalk.bold.red(`${figures.cross} ${error.toString()}`))
    )
}

function copy() {
  fs
    .copy(sourceDir, outputDir)
    .then(() => {
      console.log(chalk.bold.green(`${figures.tick} Images built`))
    })
    .catch(error => {
      console.log(chalk.bold.red(`${figures.cross} ${error.toString()}`))
    })
}

if (argv.watch) {
  watch.watchTree(sourceDir, build)
} else if (argv.minify) {
  build()
} else {
  copy()
}
