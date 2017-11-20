const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
const imageminSvgo = require('imagemin-svgo')

const imageminPlugins = [
  imageminJpegtran(),
  imageminPngquant({ quality: '90-100' }),
]

const svgoPlugins = [{ removeViewBox: false, convertShapeToPath: false }]

function minifyImageFiles(files, outputDir) {
  return imagemin(files, outputDir, {
    plugins: imageminPlugins,
  })
}

function minifyImageBuffer(buffer) {
  return imagemin.buffer(buffer, {
    plugins: imageminPlugins,
  })
}

function minifySvgFiles(files, outputDir) {
  return imagemin(files, outputDir, {
    use: [
      imageminSvgo({
        plugins: svgoPlugins,
      }),
    ],
  })
}

module.exports = {
  minifyImageFiles,
  minifyImageBuffer,
  minifySvgFiles,
}
