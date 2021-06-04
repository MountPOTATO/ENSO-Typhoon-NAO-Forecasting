// pages/showChart/show.js
var wxCharts = require('wxcharts.js');
var lineChart = null;
Component({
  data:
  {

  },
  methods:{
    bindDateChange: function(e) {
      var str;
      var year;
      console.log('picker发送选择改变，携带值为', e.detail.value)
      year = e.detail.value.slice(0,4)
      console.log(year)
      if(e.detail.value == 0)
      {
        str = '总览'
      }
      else{
        str = year+"年1月-"+year+"年12月"
      }
      this.setData({
        date:e.detail.value,
        show:str
      })
    },
    getData_btn()
    {
      var that=this;
      var flag;
      var month = parseInt(this.data.date.slice(5))
      console.log(this.data.date.slice(0,4))
      flag = false;
      wx.request({
        url: 'http://1.117.40.473:8080/queryNaoData1?year='+this.data.date.slice(0,4),
        method:'GET',
        success:function(res){
          console.log(res)
          var list=res.data;
          console.log(list)
          var dataList = []
          var catagory =[]
          var avg_data;
          var avg_pred;
          var min = 10000;
          var max = -1;
          var predict =[]
          for(let i in list)
          {
            if(i == list.length-1){
              avg_data = list[i].avg_data
              avg_pred = list[i].avg_pred
              break;
            }
            else{
              dataList.push(list[i].data)
              predict.push(list[i].predict)
              if(list[i].data<min)
                min = list[i].data
              if(list[i].data>max)
                max= list[i].data
              if(flag)
                catagory.push(list[i].year+'年')
              else
                catagory.push(list[i].year+'年-'+list[i].month+'月')
            }
          }
          console.log(dataList);
          console.log(catagory);
          for(var i =0 ;i<month-1;i++)
          {
            predict[i] = dataList[i];
          }
          dataList.splice(month-1)
          if(list==null){
            var toastText='获取数据失败';
            wx.showToast({
              title: toastText,
              icon:'Errorr',
              duration:2000 //弹出时间
            })   
          }else{
            that.setData({
              avg_data:avg_data.toPrecision(4),
              avg_pred:avg_pred.toPrecision(4)
            })
            that.draw(dataList,catagory,max,min,predict);
          }
        }
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
    draw:function(data,category,max,min,predict){
      var windowWidth = '', windowHeight='';    //定义宽高
      try {
        var res = wx.getSystemInfoSync();    //试图获取屏幕宽高数据
        windowWidth = res.windowWidth / 750 * 690;   //以设计图750为主进行比例算换
        windowHeight = res.windowWidth / 750 * 550    //以设计图750为主进行比例算换
      } catch (e) {
        console.error('getSystemInfoSync failed!');   //如果获取失败
      }
      lineChart = new wxCharts({     //定义一个wxCharts图表实例
        canvasId: 'lineCanvas',     //输入wxml中canvas的id
        type: 'line',       //图标展示的类型有:'line','pie','column','area','ring','radar'
        categories: category,    //模拟的x轴横坐标参数
        animation: true,  //是否开启动画
         series: [{   //具体坐标数据
           name: '预测数据',  //名字
            data: predict,  //数据点
            format: function (val, name) {  //点击显示的数据注释
              return val.toPrecision(5);
            }
          },
          {
            name: '实际数据',  //名字
            data: data,  //数据点
            format: function (val, name) {  //点击显示的数据注释
              return val.toPrecision(5);
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
           min: min,   //最小值
           max:max,   //最大值
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
    },
  },

  pageLifetimes: {
    show() {
      var that = this;
      wx.request({
        url: 'http://1.117.40.47:8080/queryNaoYear',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var list = res.data
          var str1 = list[0].year+'-'+list[0].month
          var str2 = list[1].year+'-'+list[1].month
          console.log(str1)
          console.log(str2)
          that.setData({
            date:str1,
            avg_data:0,
            avg_pred:0,
            start:str1,
            end:str2
          })
          wx.request({
            url: 'http://1.117.40.47:8080/queryNaoData1?year='+str1.slice(0,4),
            method:'GET',
            success:function(res){
              console.log(res)
              var list=res.data;
              console.log(list)
              var dataList = []
              var catagory =[]
              var avg_data;
              var avg_pred;
              var min = 10000;
              var max = -1;
              var predict =[]
              for(let i in list)
              {
                if(i == list.length-1){
                  avg_data = list[i].avg_data
                  avg_pred = list[i].avg_pred
                  break;
                }
                else{
                  dataList.push(list[i].data)
                  predict.push(list[i].predict)
                  if(list[i].data<min)
                    min = list[i].data
                  if(list[i].data>max)
                    max= list[i].data
                    catagory.push(list[i].year+'年-'+list[i].month+'月')
                }
              }
              console.log(dataList);
              console.log(catagory);
              if(list==null){
                var toastText='获取数据失败';
                wx.showToast({
                  title: toastText,
                  icon:'Errorr',
                  duration:2000 //弹出时间
                })   
              }else{
                that.setData({
                  avg_data:avg_data.toPrecision(4),
                  avg_pred:avg_pred.toPrecision(4)
                })
                that.draw(dataList,catagory,max,min,predict);
              }
            }
          })
        }
      })
     
      if (this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    },
  },
})