const fs = require('fs')
const path = require('path')
const yargs = require('yargs')
const chalk = require('chalk')
const figures = require('figures')
const watch = require('watch')
const sass = require('node-sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const config = require('../config')

const sourceDir = path.join(config.sourceDir, config.styles.sourceDir)
const sourceFile = path.join(sourceDir, config.styles.sourceFile)

const outputFile = path.join(
  config.distDir,
  config.styles.outputDir,
  config.styles.outputFile
)

const argv = yargs.argv

function renderStyles() {
  return new Promise((resolve, reject) => {
    sass.render(
      {
        file: sourceFile,
        precision: 10,
        sourceMapEmbed: !argv.minify,
      },
      (error, result) => (error ? reject(error) : resolve(result.css))
    )
  })
}

function postProcStyles(data) {
  const plugins = [autoprefixer]

  if (argv.minify) {
    plugins.push(cssnano)
  }

  return postcss(plugins).process(data)
}

function writeStyles(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      outputFile,
      data.css,
      error => (error ? reject(error) : resolve())
    )
  })
}

function build() {
  console.log(chalk.bold.blue(`${figures.pointer} Building styles`))

  renderStyles()
    .then(postProcStyles)
    .then(writeStyles)
    .then(() => console.log(chalk.bold.green(`${figures.tick} Styles built`)))
    .catch(error =>
      console.log(chalk.bold.red(`${figures.cross} ${error.toString()}`))
    )
}

if (argv.watch) {
  watch.watchTree(sourceDir, build)
} else {
  build()
}
