$(function () {
  var getSecondData = function (pageNum) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        // 当前页面 参数不传默认为1
        page: pageNum || 1,
        // 每页数据呈现的行数
        pageSize: 5
      },
      dataType: 'json',
      success: function (data) {
        var secondResult = template('second-template', data);
        // 将获取到的数据渲染到页面中
        $('tbody').html(secondResult);
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
            getSecondData(page);
          }
        })
      }
    })
  }
  // 获取页面数据
  getSecondData();
  // 下拉菜单选项
  initDropdown();
  // 图片预览选项
  initUpload();

  // 添加分类选项
  $('#secondform').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 字段名是name属性的值
      brandName: {
        validators: {
          notEmpty: {
            message: '二级分类名称不能为空'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    // Prevent form submission
    e.preventDefault();
    // Get the form instance
    var $form = $(e.target);
    // Get the BootstrapValidator instance
    var bv = $form.data('bootstrapValidator');
    // 写成http协议要求的格式 
    var data = $form.serialize();
    // 发送ajax请求
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: data,
      success: function (data) {
        // 模态框隐藏
        $('#second-modal').modal('hide');
        // 获取最新的数据
        getSecondData();  
      }
    })
  });


})


// 下拉菜单(一级分类)
var initDropdown = function () {
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategoryPaging',
    data: {
      page: 1,
      pageSize: 100
    },
    dataType: 'json',
    success: function (data) {
      // 把数据给添加到dropmenu
      // 1.遍历data中的数据
      // $.each(将要被遍历的数组,function(i(索引),item(遍历出的每一项)){}})
      var html = '';
      $.each(data.rows, function (i, item) {
        // 创建下拉项 并把 数据中的id设置给a标签的自定义data-id属性
        // 把数据中的一级分类名称添加给a标签的文本
        // 为了提交请求能让后端拿到对应的数据
        html += '<li><a href="javascript:;" data-id="' + item.id + '" >' + item.categoryName + '</a></li>'
      })
      // 2.将数据插入到ul中
      $('.dropdown-menu').html(html);
      // 事件委托给下拉菜单项中的a标签
      $('.dropdown-menu').on('click', 'a', function () {
        // a标签的文本添加给下拉按钮
        $('.dropdown-text').html($(this).html());
        // a标签的自定义data-id属性值添加给一级分类隐藏域
        $('#categoryId').val($(this).attr('data-id'));
      })
    }
  })
};

// 图片预览效果
var initUpload = function () {
  // [name="pic1"] 表示的是上传文件的input
  $('[name="pic1"]').fileupload({
    url: "/category/addSecondCategoryPic",
    dataType: 'json',
    done: function (e, data) {
      // 获取到的图片路径 设置给预先准备好的img标签的src属性 达到图片的预览
      $('#previewimg').attr('src', data.result.picAddr);
    }
  });
}