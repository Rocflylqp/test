$(function () {
  // 获取数据
  var getUserManageData = function (pageNum) {
    // ajax请求
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        // 参数不传默认为1
        page: pageNum || 1,
        // 每一页呈现的行数
        pageSize: 5
      },
      success: function (data) {
        // 获取模板引擎
        var userManageList = template('userManage-template', data);
        // 把拿到的数据渲染到html中
        $('table tbody').html(userManageList);
        // 分页
        $('.pagination').bootstrapPaginator({
          /*当前使用的是3版本的bootstrap*/
          bootstrapMajorVersion: 3,
          /*配置的字体大小是小号*/
          size: 'small',
          /*当前页*/
          currentPage: data.page,
          /*一共多少页*/
          // 总页数=数据的总数/每页显示多少条数据
          totalPages: Math.ceil(data.total / data.size),
          /*点击页面事件*/
          onPageClicked: function (event, originalEvent, type, page) {
            /*改变当前页再渲染 page当前点击的按钮的页面*/
            getUserManageData(page);
          }
        })
      }
    })
  }

  // 页面载入完成 调用ajax 呈现数据
  getUserManageData();

  $('tbody').on('click', '.btn', function () {
    // 获取自定义属性data-id
    var id = $(this).data('id');
    // 获取自定义属性data-name
    var name = $(this).data('name');
    // 判断是否有禁用按钮的class属性
    var isDelete = $(this).hasClass('btn-danger') ? 1 : 0;
    // 根据得到isDelete值判断模态框的提示是禁用还是启用
    if (isDelete == 1) {
      // 提示是否要禁止
      $('#manage-modal').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i> 您确定要禁止'+ name +'吗？');
    } else {
      // 提示是否要启用
      $('#manage-modal').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i> 您确定要启用'+ name +'吗？');
    }
    // 点击模态框确定按钮
    $('#manage-modal').on('click', '.btn-primary', function () {
      $.ajax({
        type: 'post',
        url: '/user/updateUser',
        data: {
          id: id,
          isDelete: isDelete
        },
        dataType: 'json',
        success: function (data) {
          if (data.success == true) {
            // 隐藏模态框
            $('#manage-modal').modal('hide');
            // 调用ajax获取最新的数据
            getUserManageData();
          }
        }
      })
    })
  })
})