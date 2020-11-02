$(function () {

  //向服务器请求数据
  var layer = layui.layer
  //layui 提供的方法
  var form = layui.form
  init()
  function init() {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        // console.log(res)
        var htmlStr = template('tpl-cate', res)
        // console.log(htmlStr)
        $('tbody').html(htmlStr)
      }
    })
  }
  var indexAdd = null
  $('#btnAdd').on('click', function () {
    // console.log('ok');

    indexAdd = layer.open({
      type: 1,
      title: '添加文章分类',
      area: ['500px', '300px'],
      content: $('#layAdd').html()

    });
  })
  // 用事件代理给表单绑定事件
  $('body').on('submit', '#layui-form', function (e) {
    console.log('ok');
    e.preventDefault()
    //向服务器请求数据
    // console.log($(this).serialize());
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: res => {
        // console.log(res);
        if (res.status !== 0) return layer.msg('获取数据失败')
        // 将获取数据渲染到页面 调用函数
        init()
        layer.msg('添加成功')
        layer.close(indexAdd)

      }

    })
  })
  // 编辑模块
  // 用事件代理给编辑按钮绑定事件
  var indexEdit = null
  $('tbody').on('click', '#btn-edit', function () {
    indexEdit = layer.open({
      type: 1,
      title: '修改文章分类',
      area: ['500px', '300px'],
      content: $('#lay-edit').html()
    });
    // 获取当前点击那一行的id
    var id = $(this).attr('data-id')
    //获取点击行的数据并更改
    $.ajax({
      type: 'GET',
      url: '/my/article/cates/' + id,
      success: res => {
        // console.log(res)
        // layui 提供的方法,更改表单数据
        form.val('edit', res.data)
      }

    })

  })
  //  用事件委托给修改按钮绑定事件
  $('body').on('submit', '#layui-edit', function (e) {
    e.preventDefault()
    // console.log($(this).serialize())
    $.ajax({
      type: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: res => {
        if (res.status !== 0) return layer.msg('修改失败')
        layer.msg('修改成功')
        init()
        layer.close(indexEdit)
      }
    })


  })

  // 删除模块
  // 给删除按钮绑定submit事件
  $('tbody').on('click', '#btnDelete', function () {
    console.log('ok');
    var indexDel = $(this).attr('data-index')
    layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
  //do something
    $.ajax({
    type:'GET',
    url:'/my/article/deletecate/'+indexDel,
    success: res =>{
        if(res.status !== 0) return layer.msg('删除文章列表失败')
        layer.msg('删除成功')
        init()
}
})
  layer.close(index);
});


  })
})