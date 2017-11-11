// 该文件的功能是用来写首页的js交互的

// 进度条=============

// 不要让进度条显示圆圈
NProgress.configure({ showSpinner: false });

// 全局监听 当页面有人一个ajax请求开始时 让进度条开始
$(window).ajaxStart(function () {
  NProgress.start();
})

// 当ajax请求完成时 让进度条读取完成
$(window).ajaxComplete(function () {
  NProgress.done();
})

// 点击导航按钮时让侧边栏隐藏或显示
$('[data-menu]').on('click', function () {
  $('.lt-aside').toggle();
  $('.lt-section').toggleClass('toggle');
})

// 侧边栏分类管理
$('.lt-aside .menu').on('click', '[href="javascript:;"]', function () {
  var child = $(this).siblings();
  child.slideToggle();
})

// 退出登陆遮罩层
$('#logout-modal').on('click', '.btn-primary', function () {
  $.ajax({
    type: 'get',
    url: '/employee/employeeLogout',
    data: {},
    dataType: 'json',
    success: function (data) {
      if (data.success == true) {
        $('#logout-model').modal('hide');
        setTimeout(function () {
          location.href = './login.html';
        },500)
      }
    }
  })
})


