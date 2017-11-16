$(function ($) {

  // 请求页面时显示数据
  showHistoryData();
  // 获取元素
  var searchVal = $('#inputVal');
  // 添加移动端点击事件
  $('.search-box span').on('tap', function () {
    // 获取输入框输入的值
    var inputVal = searchVal.val();
    // 保存数据
    setHistoryData(inputVal);
    // 把输入的值拼接到url地址中 进行传参
    location.href = './searchList.html?proName=' + inputVal;
    // 显示页面数据
    showHistoryData();
  })

  // 历史纪录点击时进行跳转
  $('.search-history-list').on('tap', 'span', function () {
    // 获取点击历史纪录的值
    var keyword = $(this).html();
    location.href = './searchList.html?proName=' + keyword;
  })

  // 清空历史记录
  $('#clear-history').on('tap', function () {
    localStorage.removeItem('ltHistory');
    showHistoryData();
  })

  // 单个删除历史纪录
  $(".search-history-list").on('tap', 'i', function () {
    var deleteData = $(this).siblings('span').html();
    removeHistory(deleteData);
    showHistoryData();
  })

})

// 获取本地存储
var getHistoryData = function () {
  // 如果本地存储总没有数据，返回一个空数组，便于后续操作
  return JSON.parse(window.localStorage.getItem('ltHistory') || '[]');
}

// 设置本地存储
var setHistoryData = function (value) {
  // 获取本地的存储
  var setLocal = getHistoryData();
  // 进行遍历
  $.each(setLocal, function (i, item) {
    // 如果输入的值在本地存储中存在，那么删除这条数据
    if (value == item) {
      setLocal.splice(i, 1);
    }
  })
  // 把输入的值添加到获取的本地存储数组中
  setLocal.push(value);
  // 再以json字符串的格式保存在本地存储中
  localStorage.setItem('ltHistory', JSON.stringify(setLocal));
}

// 删除历史记录
var removeHistory = function (value) {
  var list = getHistoryData();
  $.each(list, function (i, item) {
    if (value == item) {
      list.splice(i, 1);
    }
  })
  window.localStorage.setItem('ltHistory', JSON.stringify(list));
}

// 显示历史记录
var showHistoryData = function () {
  var list = getHistoryData();
  if (list.length == 0) {
    $('.msg').show();
    $('.search-history').hide();
  } else {
    var historyList = template('historyTemplate', {
      list: list
    });
    $('.search-history-list').html(historyList);
    $('.search-history').show();
    $('.msg').hide();
  }
}