var QQMapWX = require('qqmap-wx-jssdk.js');
let qqmapsdk = new QQMapWX({
  key: 'SO7BZ-4223F-REQJI-NWWIF-OVAWS-BRFB7'
});
Component({
  data:{
    //picker
    index: 0,
    multiArray: [['2021', '2020'], ['2102舒力基', '2101杜鹃']],
    multiIndex: [0, 0],
   

    markers:[
      {
        id: 0,
        latitude: 9.2,
        longitude: 133.9,
        //TODO:加label
        iconPath:"../../image/point.png",
        width:20,
        height:20,
        callout:{//不适用自定义气泡的东西，在这里面写样式和内容
          content:"99+",
          textAlign:"center",
          color:"#fff",
          borderWidth:0,
          bgColor:'rgba(0,0,0,0.2)',//背景颜色，可使用rgba
          anchorX:20,
          anchorY:20,
          fontSize:16,
          display:"BYCLICK",
        }, 
      },
      {
        id: 1,
        latitude: 10,
        longitude: 132.2,
        customCallout:{//自定义气泡
          display:"BYCLICK",//显示方式，可选值BYCLICK
          anchorX:1,//横向偏移
          anchorY:1,
          content:"测试",
          fontSize:15,
          textAlign:"left"  
        },
      },
      {
        id: 2,
        latitude: 10.7,
        longitude: 131.3,
      },
      {
        id: 3,
        latitude: 11.4,
        longitude: 130.2,
      }
    ],

    polyline: [{
      points: [{
        latitude: "34",
        longitude: "132"
      },
      {
        latitude: "15",
        longitude: "132"
      },
      {
        latitude: "0",
        longitude: "120"
      },
      {
        latitude: "0",
        longitude: "105"
      }
    ],
      color: "#403C3C",
      width: 1,
      dottedLine:true,
      borderWidth: 1 //线的边框宽度，还有很多参数，请看文档 
    },{
      points: [{
        latitude: "34",
        longitude: "127"
      },
      {
        latitude: "22",
        longitude: "127"
      },
      {
        latitude: "18",
        longitude: "119"
      },
      {
        latitude: "11",
        longitude: "119"
      },
      {
        latitude: "4.9",
        longitude: "113"
      },
      {
        latitude: "0",
        longitude: "105"
      }
    ],
      color: "#403C3C",
      width: 1,
      borderWidth: 1 //线的边框宽度，还有很多参数，请看文档 
    },
  {
    points: [
      {
        id: 0,
        latitude: 9.2,
        longitude: 133.9,
      },
      {
        id: 1,
        latitude: 10,
        longitude: 132.2,
      },
      {
        id: 2,
        latitude: 10.7,
        longitude: 131.3,
      },
      {
        id: 3,
        latitude: 11.4,
        longitude: 130.2,
      },
      
    ],
    color: "#403C3C",
    width: 3,
    borderWidth: 1 //线的边框宽度，还有很多参数，请看文档 
  }],

  },

  //picker槽函数
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['2102舒力基', '2101杜鹃'];
            break;
          case 1:
            data.multiArray[1] = ['2023科罗旺', '2022环高', '2021艾涛'];
            break;
        }
        data.multiIndex[1] = 0;
        break;      
    }
    this.setData(data);
  },



  methods:{
  },
  pageLifetimes: {
    show() {
      var that = this;
      wx.request({
        url: 'http://1.117.40.47:8080/queryTyphoonRoute',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var list = res.data;
          console.log(list)
          var points = []
          var mas = []
          for(var i =0 ; i<list.length;i++)
          {
            var point = {
              id:list[i].route_no,
              longitude:list[i].longitude,
              latitude:list[i].latitude
            }
            var maker = {
              id:list[i].route_no,
              longitude:list[i].longitude,
              latitude:list[i].latitude,
              //TODO:加label
              iconPath:"../../image/point.png",
              width:15,
              height:15,
              anchor:{x:.5,y:1},
              callout:{
                content:"台风:"+list[i].typhoon_id.toString()+"\n"
                       +"经度:"+list[i].longitude.toString()+"\n"
                       +"纬度:"+list[i].latitude.toString(),
                color:"#000000",
                borderRadius:7,
                borderColor:"#000000",
                borderWidth:2,
                bgColor:'rgba(255,255,0,0.7)',//背景颜色，可使用rgba
                textAlign:"center",
                anchorX:0,
                anchorY:0,
                fontSize:12,
                display:"BYCLICK",
              }
          }
            points.push(point);
            mas.push(maker)
          }
          var po = that.data.polyline
          var ma = that.data.markers
          var poltline = {
            points:points,
            color: "#403C3C",
            width: 1,
            dottedLine:true,
            borderWidth: 1 
          }
          
          po.push(poltline); 
          console.log(poltline);
          that.setData({
            polyline:po,
            markers:mas
          })
        }
      })
      
      if (this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
    },
  },
})