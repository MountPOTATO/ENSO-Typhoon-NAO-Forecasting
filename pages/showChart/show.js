// pages/showChart/show.js
var wxCharts = require('wxcharts.js');
var lineChart = null;
var dataList = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: [{
      city_id: '001',
      city_name: '北京'
    }, {
      city_id: '002',
      city_name: '上海'
    }, {
      city_id: '003',
      city_name: '深圳'
    }],
    selected:{}
  },
  change (e) {
    this.setData({
      selected: { ...e.detail }
    })
    wx.showToast({
      title: `${this.data.selected.id} - ${this.data.selected.name}`,
      icon: 'success',
      duration: 1000
    })
  },
  close () {
    // 关闭select
    this.selectComponent('#select').close()
  },
  
  //获取数据按钮
  getData_btn:function(){
    console.log('dddddd')
    var that=this;
    wx.request({
      url: 'http://localhost:8080/query',
      method:'GET',
      data:{},
      success:function(res){
        var list=res.data;
        if(list==null){
          var toastText='获取数据失败';
          wx.showToast({
            title: toastText,
            icon:'',
            duration:2000 //弹出时间
          })
          console.log('111')
        }else{
          that.setData({
            list:list
          })
          console.log('222');
          dataList = list;
          console.log(dataList);
          lineChart = new wxCharts({     //定义一个wxCharts图表实例
            canvasId: 'lineCanvas',     //输入wxml中canvas的id
            type: 'line',       //图标展示的类型有:'line','pie','column','area','ring','radar'
            categories: ['2020-1', '2020-2', '2020-3', '2020-4', '2020-5', '2020-6', '2020-7'],    //模拟的x轴横坐标参数
            animation: true,  //是否开启动画
            series: [{   //具体坐标数据
              name: 'data1',  //名字
              data: dataList,  //数据点
              format: function (val, name) {  //点击显示的数据注释
                return val + '%';
              }
            }, {
              name: 'data2',
              data: [0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6],
              format: function (val, name) {
                return val + '%';
              }
            }, {
              name: 'data3',
              data: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
              format: function (val, name) {
                return val + '%';
              }
            }
            ],
            xAxis: {   //是否隐藏x轴分割线
              disableGrid: true,
            },
            yAxis: {      //y轴数据
              title: '数值',  //标题
              format: function (val) {  //返回数值
                return val.toFixed(2);
              },
              min: 0,   //最小值
              max:1,   //最大值
              gridColor: '#D8D8D8',
            },
            width: windowWidth,  //图表展示内容宽度
            height: windowHeight,  //图表展示内容高度
            dataLabel: false,  //是否在图表上直接显示数据
            dataPointShape: true, //是否在图标上显示数据点标志
            extra: {
              lineStyle: 'curve'  //曲线
            },
          });
        }
      }
    })
    var windowWidth = '', windowHeight='';    //定义宽高
    try {
      var res = wx.getSystemInfoSync();    //试图获取屏幕宽高数据
      windowWidth = res.windowWidth / 750 * 690;   //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 550    //以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!');   //如果获取失败
    }
    
  },

  torecord() {
    // wx.navigateTo({
    //   url: '../lookrecord/lookrecord',
    // })
    wx.navigateBack({
      delta: 1,
    })
  },
  touchHandler: function (e) {
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})