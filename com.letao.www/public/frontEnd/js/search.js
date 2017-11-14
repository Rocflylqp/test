$(function ($) {
  // 设置搜索按钮点击事件
  $('.search-box span').on('tap', function () {
    // 获取输入框的内容
    var searchVal = $(this).next().val();
    // 声明一个空数组 用于保存每次输入的值
    var searchArr = [];
    // 获取本地存储 localStorage
    var getLocal = localStorage.getItem('searchHistory');
    // 判断本地存储是否有值
    if (getLocal == null) {
      // 没有值 把输入的值添加到数组中
      searchArr[searchArr.length] = searchVal;
      // 把这个数组以JSON字符串的格式保存在本地存储中
      localStorage.setItem('searchHistory', JSON.stringify(searchArr));
    } else {
      // 有值 获取本地存储中的数据 转换成数组格式
      var getLocalVal = JSON.parse(getLocal);
      // 进行遍历
      for (var i = 0; i < getLocalVal.length; i++) {
        // 如果本地存储中有本次输入的值则不添加
        if (searchVal == getLocalVal[i]) {
          return;
        }
      }
      // 把输入的值添加到数组中
      getLocalVal.push(searchVal);
      // 把这个数组以JSON字符串的格式添加到本地存储中
      localStorage.setItem('searchHistory', JSON.stringify(getLocalVal));
    }
  })
  // 创建搜索纪录
  // 获取本地存储中的数据
  var historyVal = JSON.parse(localStorage.getItem('searchHistory'));
  // 获取元素 ul
  var ul = document.querySelector('ul');
  // 如果本地存储中的数据不为空 则进行动态创建
  if (historyVal != null) {
    // 遍历本地存储
    for (var i = 0; i < historyVal.length; i++) {
      // 动态创建
      var lis = document.createElement('li');
      var span = document.createElement('span');
      var is = document.createElement('i');
      // 添加相应的class类名 和文本
      span.className = 'mui-pull-left';
      span.innerHTML = historyVal[i];
      is.className = 'fa fa-times mui-pull-right';
      // 添加到页面中
      lis.appendChild(span);
      lis.appendChild(is);
      $(ul).prepend(lis);
    }
  }

  
})