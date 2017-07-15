const fs = require('fs')
const path = require('path')
const url = require('url')
const yargs = require('yargs')
const chalk = require('chalk')
const figures = require('figures')
const watch = require('watch')
const async = require('async')
const pug = require('pug')
const minify = require('html-minifier').minify

const config = require('../config')

const sourceDir = path.join(config.sourceDir, config.templates.sourceDir)
const outputDir = path.join(config.distDir, config.templates.outputDir)

const title = config.title
const description = config.description
const themeColor = config.themeColor
const favicon = config.favicon
const shareFacebook = url.resolve(config.url, config.share.facebook)
const shareTwitter = url.resolve(config.url, config.share.twitter)
const stylesFile = path.join(config.styles.outputDir, config.styles.outputFile)
const scriptsFile = path.join(
  config.scripts.outputDir,
  config.scripts.outputFile
)

const argv = yargs.argv

function compileFile(file, done) {
  if (path.extname(file) === '.pug') {
    let html = pug.renderFile(path.join(sourceDir, file), {
      title,
      description,
      themeColor,
      favicon,
      shareFacebook,
      shareTwitter,
      stylesFile,
      scriptsFile,
    })
    if (argv.minify) {
      const options = {
        removeComments: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
      }
      html = minify(html, options)
    }
    const htmlFile = path.basename(file, '.pug') + '.html'
    const outputFile = path.join(outputDir, htmlFile)
    fs.writeFile(outputFile, html, done)
  } else {
    done()
  }
}

function build() {
  console.log(chalk.bold.blue(`${figures.pointer} Building templates`))

  fs.readdir(sourceDir, (error, files) => {
    if (error) {
      console.log(chalk.bold.red(`${figures.cross} ${error.toString()}`))
    } else {
      async.each(files, compileFile, error => {
        if (error) {
          console.log(chalk.bold.red(`${figures.cross} ${error.toString()}`))
        } else {
          console.log(chalk.bold.green(`${figures.tick} Templates built`))
        }
      })
    }
  })
}

if (argv.watch) {
  watch.watchTree(sourceDir, build)
} else {
  build()
}
