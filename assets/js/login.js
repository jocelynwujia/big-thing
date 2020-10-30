$(function () {
  $('#link_login').on('click', function () {
    $('.loginBox').hide()
    $('.regBox').show()
    // console.log('nt');

  })
  $('#link_reg').on('click', function () {
    $('.loginBox').show()
    $('.regBox').hide()

  })
  //自定义校验规则
  let form = layui.form;
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      let pwd = $('.regBox [name=password]').val()
      if (value !== pwd) {
        return '两次密码输入不一致'
      }
    }
  })
  //给监听表单提交事件
  $('#reg_form').on('submit', function (e) {
    e.preventDefault()
    var data = {
      username: $('#reg_form [name=username]').val(),
      password: $('#reg_form [name=password]').val()
    }
    $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
      console.log(res)
      if(res.status !== 0) return console.log(res.message)
      console.log('注册成功')

    })

  })


})