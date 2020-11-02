$(function () {
  var layer = layui.layer
  var q = {
    pagenum: 1,
    pagesize: 1,
    cate_id: '',
    state: ''
  }

  // 获取文章列表数据的方法
  initTable()
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: res => {
        console.log(res)
        if(res.status !== 0) return layer.msg('文章列表获取失败')
        // 使用模板引擎渲染页面的数据
        var htmlStr = template('tpl-table',res)
        $('tbody').html(htmlStr )
      }

    })
  }
})