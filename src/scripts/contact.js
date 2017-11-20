import $ from 'jquery'

export const handleContactForm = () => {
  $('.contact-form').on('submit', () => {
    const $email = $('#contact-email')
    const $message = $('#contact-message')
    const $button = $('.btn-submit')
    const $success = $('.form-success')
    const $failure = $('.form-failure')

    if ($email.val() !== '' && $message.val() !== '') {
      $('.contact-form button').addClass('disabled')

      $.ajax({
        url: 'https://formspree.io/charles.tatibouet@epitech.eu', // todo sportsfun_2019@labeip.epitech.eu
        method: 'POST',
        data: {
          _subject: 'Message depuis le formulaire de contact',
          email: $email.val(),
          message: $message.val(),
        },
        dataType: 'json',
      })
        .done(() => {
          $email.val('')
          $message.val('')
          $button.removeClass('disabled')
          $success.fadeIn(600)
          setTimeout(() => $success.fadeOut(600), 3000)
        })
        .fail(() => {
          $failure.fadeIn(600)
          setTimeout(() => $failure.fadeOut(600), 3000)
        })
        .always(() => $button.removeClass('disabled'))
    }

    return false
  })
}
