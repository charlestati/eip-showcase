const path = require('path')
const yargs = require('yargs')
const chalk = require('chalk')
const figures = require('figures')
const imagemin = require('imagemin')
const imageminSvgo = require('imagemin-svgo')

const config = require('../config')

const sourceDir = path.join(config.sourceDir, config.svg.sourceDir)
const outputDir = path.join(config.sourceDir, config.svg.outputDir)

function minify() {
  console.log(chalk.bold.blue(`${figures.pointer} Minifying SVG files`))

  imagemin([path.join(sourceDir, '*.svg')], outputDir, {
    use: [
      imageminSvgo({
        plugins: [{ removeViewBox: false }],
      }),
    ],
  })
    .then(() => {
      console.log(chalk.bold.green(`${figures.tick} SVG files minified`))
    })
    .catch(error =>
      console.log(chalk.bold.red(`${figures.cross} ${error.toString()}`))
    )
}

minify()
