const fs = require('fs')
const ncp = require('ncp')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')

function writeFile(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

function copyFile(input, output) {
  return new Promise((resolve, reject) => {
    ncp(input, output, error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

function removeFile(file) {
  return new Promise((resolve, reject) => {
    rimraf(file, [], error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

function readDirectory(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (error, files) => {
      if (error) {
        reject(error)
      } else {
        resolve(files)
      }
    })
  })
}

function makeDirectory(path) {
  return new Promise((resolve, reject) => {
    mkdirp(path, error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

module.exports = {
  writeFile,
  copyFile,
  removeFile,
  readDirectory,
  makeDirectory,
}
