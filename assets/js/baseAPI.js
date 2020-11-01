 // 使用ajaxprefilter方法统一根目录
    //不管是发起$.get()、$.post()、$.ajax()请求前，都先调动ajaxprefilter()函数
    //ajaxprefilter()函数可以先设置配置对象
    $.ajaxPrefilter(function(options){
        // 在发起ajax之前，统一拼接根路径
        options.url = 'http://ajax.frontend.itheima.net' + options.url
        console.log(options.url)

})