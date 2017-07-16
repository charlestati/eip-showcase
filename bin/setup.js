const chalk = require('chalk')
const figures = require('figures')
const mkdirp = require('mkdirp')

function makeDirectory(directory) {
  return new Promise((resolve, reject) => {
    mkdirp(directory, error => (error ? reject(error) : resolve()))
  })
}

function setup() {
  console.log(chalk.bold.blue(`${figures.pointer} Creating directories`))

  const directories = [
    'dist/fonts/',
    'dist/images/',
    'dist/scripts/',
    'dist/styles/',
  ]

  Promise.all(directories.map(makeDirectory))
    .then(() => {
      console.log(chalk.bold.green(`${figures.tick} Directories created`))
    })
    .catch(error => {
      console.log(chalk.bold.red(`${figures.cross} ${error.toString()}`))
    })
}

setup()
