Component({
  data: {
    selected: 1,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/Enso/Enso",
      iconPath: "/image/ENSO.png",
      selectedIconPath: "/image/ENSO_Selected.png",
      text: "ENSO"
    }, {
      pagePath: "/pages/Nao/Nao",
      iconPath: "/image/NAO.png",
      selectedIconPath: "/image/NAO_Selected.png",
      text: "NAO"
    },{
      pagePath: "/pages/typhoon/typhoon",
      iconPath: "/image/Typhoon.png",
      selectedIconPath: "/image/Typhoon_Selected.png",
      text: "Typhoon"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      var that = this//不要漏了这句，很重要
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})