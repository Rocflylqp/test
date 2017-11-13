$(function () {
  // 页面载入显示数据
  var getFirstData = function (pagenum) {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        // 参数不传默认为1
        page: pagenum || 1,
        // 每页呈现的行数
        pageSize: 5
      },
      dataType: 'json',
      success: function (data) {
        var firstResult = template('first-template', data);
        // 把数据渲染到页面上
        $('tbody').html(firstResult);
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
            getFirstData(page);
          }
        });
      }
    })
  }

  // 发送ajax请求
  getFirstData();

  // 添加--校验
  $('#first-form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 字段名是name属性的值
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类名称不能为空'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    // Prevent form submission
    e.preventDefault();
  });
  // 事件委托 确认按钮点击事
  $('#first-modal').on('click', '#save', function () {
    // form表单提交的数据 serialize() 可以让提交的数据呈现键值的格式 value=key&value1=key1
    var formData = $('#first-form').serialize();
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: formData,
      dataType: 'json',
      success: function (data) {
        if (data.success == true) {
          // 模态框隐藏
          $('#first-modal').modal('hide');
          // 发送ajax请求获取最新的数据
          getFirstData();
        }
      }
    })
  })
})