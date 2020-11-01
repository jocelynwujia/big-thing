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
  let msg = layer.msg;
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
  //监听注册表单提交事件
  $('#reg_form').on('submit', function (e) {
    e.preventDefault()
    var data = {
      username: $('#reg_form [name=username]').val(),
      password: $('#reg_form [name=password]').val()
    }
    $.post('/api/reguser', data, function (res) {
      // console.log(res)
      if (res.status !== 0) return layer.msg(res.message)
      layer.msg('注册成功')
      //自动触发登录页面的点击事件
      $('#link_reg').click()
    })

  })

  //监听登录表单提交事件
  $('#form_login').submit(function(e){
    //阻止表单提交行为
    e.preventDefault()
    //快速获取表单数据
    var data = $('#form_login').serialize()

    console.log(data)
    $.ajax({
      type:'POST',
      url:'/api/login',
      data,   
      success:function(res){
          // console.log(res)
          if(res.status !== 0) layer.msg(res.message)
          layer.msg('登录成功')
          //拿到的数据里面有一个token ，是访问有权限接口的 存储到本地存储
          localStorage.setItem('token',res.token)
          //同时页面跳转到后台页面首页
          // location.href = '/index.html'
}
})
})
   

})