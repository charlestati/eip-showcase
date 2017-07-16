const chalk = require('chalk')
const figures = require('figures')
const rimraf = require('rimraf')

function removeFile(file) {
  return new Promise((resolve, reject) => {
    rimraf(file, [], error => (error ? reject(error) : resolve()))
  })
}

function clean() {
  console.log(chalk.bold.blue(`${figures.pointer} Cleaning directory`))

  const files = [
    'dist/fonts/*',
    'dist/images/*',
    'dist/scripts/*',
    'dist/styles/*',
    'dist/*.html',
  ]

  Promise.all(files.map(removeFile))
    .then(() => {
      console.log(chalk.bold.green(`${figures.tick} Directory cleaned`))
    })
    .catch(error => {
      console.log(chalk.bold.red(`${figures.cross} ${error.toString()}`))
    })
}

clean()
