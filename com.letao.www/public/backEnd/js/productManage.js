$(function () {
  var getProductData = function (pageNum) {
    $.ajax({
      type: 'get',
      url: ' /product/queryProductDetailList',
      data: {
        page: pageNum || 1,
        pageSize: 5
      },
      success: function (data) {
        // console.log(data);
        var productResult = template('product-template', data);
        $('tbody').html(productResult);
      }
    })
  }
  getProductData();
  initUpload();




  $('#productform').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 字段名是name属性的值
      proName: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '商品描述不能为空'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '商品库存不能为空'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '商品价格不能为空'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '商品原价不能为空'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '商品尺码不能为空'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    // Prevent form submission
    e.preventDefault();
    // Get the form instance
    var $form = $(e.target);
    // serialize() 可以将提交的数据转换成 http需要的格式
    var data = $form.serialize();
    // 遍历上传图片的数组
    $.each(picList, function (i, item) {
      // 把提交的数据和上传的图片的数据拼接起来
      data += '&picName' + (i + 1) + '=' + item.picName + '&picAddr' + (i + 1) + '=' + item.picAddr;
    })
    // 因为没有barandId可以创造一个
    data = data + '&brandId=4';
    // 发送ajax请求
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      // 拼接的字符串 提交的数据
      data: data,
      success: function (data) {
        // 添加分类模态框隐藏
        $('#product-modal').modal('hide');
        // 获取最新的页面数据
        getProductData();
      }
    })
  });

  // 上架与下架功能
  $('tbody').on('click', '.btn', function () {
    // 获取自定义属性data-id
    var id = $(this).data('id');
    // 判断是否有下架按钮的class属性
    var brandId = $(this).data('brandId')
    var statu = $(this).hasClass('btn-danger') ? 1 : 0;
    // 根据提示做出判断 是上架还是下架
    if (statu == 1) {
      $('#sx-modal').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i> 您确定要下架此商品吗？')
    } else {
      $('#sx-modal').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i> 您确定要上架此商品吗？')
    }

    // 确定按钮
    $('#sx-modal').on('click', '.btn-primary', function () {
      $.ajax({
        type: 'post',
        url: '/product/updateProduct',
        data: {
          id: id,
          statu: statu,
          brandId: brandId
        },
        success: function (data) {
          if (data.success == true) {
            // 隐藏模态框
            $('#sx-modal').modal('hide');
            // 调用ajax获取最新的数据
            getProductData();
          }
        }
      })
    })
  })
})



// 图片上传与预览 
var picList = [];
var initUpload = function () {
  // 上传图片的input元素
  $("#pic").fileupload({
    // 找到上传图片的接口
    url: "/product/addProductPic",
    done: function (e, data) {
      // 创建img标签 并把上传的图片信息 添加给img元素的src属性
      $('.fileupload').append('<img width="50" height="auto" src="' + data.result.picAddr + '" alt="">');
      // 因为要求最少上传三张图片
      // 又因为后台又规定了图片提交的格式
      // 所以可以把每次上传的图片信息加到数组里面
      picList.push(data.result);
    }
  })
}