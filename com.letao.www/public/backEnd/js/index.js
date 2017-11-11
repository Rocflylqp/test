// 该文件是用来写echarts这个图表的文件
$(function () {
  // 获取柱状图的容器
  var firstDom = document.querySelector('.lt-canvas .picTable:first-child');
  // 基于准备好的dom，初始化echarts实例
  var zhuChart = echarts.init(firstDom);
  var option = {
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data: ['人数']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '人数',
        type: 'bar',
        data: [1000, 2500, 3600, 1800, 1100, 1000]
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  zhuChart.setOption(option);


  // 获取饼状图的容器
  var secondDom = document.querySelector('.lt-canvas .picTable:last-child');
  // 基于准备好的dom，初始化echarts实例
  var bingChart = echarts.init(secondDom);
  var secondOption = {
    title: {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克', '阿迪', '新百伦', '安踏', '李宁']
    },
    series: [
      {
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '耐克' },
          { value: 310, name: '阿迪' },
          { value: 234, name: '新百伦' },
          { value: 135, name: '安踏' },
          { value: 1548, name: '李宁' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  bingChart.setOption(secondOption);
})


