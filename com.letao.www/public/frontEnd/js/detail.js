$(function ($) {
  // 页面请求时获取数据
  getDetailData();
})
var getDetailData = function () {
  // 获取整个url
  var url = new URLSearchParams(location.search);
  // 获取指定的url参数
  var id = url.get('id');
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: id
    },
    success: function (data) {
      // 将获取的数据添加到模板中
      var detail = template('detailTemplate', data);
      $('.lt-detail').html(detail);
      // 获取产品尺寸数据
      var sizeStr = data.size;
      // 截取最小尺寸和最大尺寸
      data.minSize = sizeStr.substring(0, 2);
      data.maxSize = sizeStr.substring(3, 5);
      // 将新的数据添加到模板中
      var sizeData = template('sizeTemplate',data);
      $('.detail-size').append(sizeData);
    }
  })
}