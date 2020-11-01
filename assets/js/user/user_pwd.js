//表单验证
$(function () {
  var form = layui.form
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能一致'
      }
    },
    repwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致'

      }

    },

  })

  // 重置密码
  //给表单绑定submit提交
  $('.layui-form').on('submit', function (e) {
    //阻止表单的默认行为
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if(res.status !== 0) return layui.layer.msg('更新密码失败')
        layui.layer.msg('更新密码成功')
        //重置表单 （清空表单）
        $('.layui-form')[0].reset()

      }

    })

  })
})