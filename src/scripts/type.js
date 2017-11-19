function handleAnchors() {
  $('a[href*="#"]')
    .not('[href="#"]')
    .click(e => {
      const href = $(e.currentTarget).attr('href')
      $('html, body').animate(
        {
          scrollTop: $(href).offset().top,
        },
        600
      )
      return false
    })
}

module.exports = {
  handleAnchors,
}
