$(function () {
  $('#link_login').on('click', function () {
    $('.loginBox').hide()
    $('.regBox').show()

  })
  $('#link_reg').on('click', function () {
    $('.loginBox').show()
    $('.regBox').hide()

  })
})