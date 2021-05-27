var QQMapWX = require('qqmap-wx-jssdk.js');
let qqmapsdk = new QQMapWX({
  key: 'SO7BZ-4223F-REQJI-NWWIF-OVAWS-BRFB7'
});
Component({
  data:{
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
      color: "#FA6400",
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
      color: "#FA6400",
      width: 1,
      borderWidth: 1 //线的边框宽度，还有很多参数，请看文档 
    }],
    markers:[{
      id:1,
      latitude:34,
      longitude:127,
    },

    ]
  },
  methods:{
  },
  pageLifetimes: {
    show() {
      if (this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
    },
  },
})