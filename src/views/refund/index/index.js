/**
 * Created by sunday on 06/11/2016.
 */
import loader from './../../../router/loader'
import wxService from './../../../services/wechat'
import wx from 'weixin-js-sdk'
import lrz from 'lrz'
var randomString = require('random-string')

export default {
  name: 'Refund',
  data () {
    var self = this
    return {
      options1: [
        { value: 1, text: '已经收到产品' },
        { value: 2, text: '没有收到产品' }
      ],
      options2: [
        { value: 1, text: '一直未收到产品' },
        { value: 2, text: '破损严重当面拒签' },
        { value: 3, text: '未按约定时间发货' },
        { value: 4, text: '快递物流无跟踪记录' },
        { value: 5, text: '其他原因' }
      ],
      options3: [
        { value: 1, text: '退运费' },
        { value: 2, text: '产品质量问题' },
        { value: 3, text: '少发/漏发' },
        { value: 4, text: '产品与描述不符' },
        { value: 5, text: '发错货' },
        { value: 6, text: '其他原因' }
      ],
      options4: [
        { value: 1, text: '未按约定时间发货' },
        { value: 2, text: '信息填写错误' },
        { value: 3, text: '发货期间无法收货' },
        { value: 4, text: '不想买了' },
        { value: 5, text: '其他原因' }
      ],
      radio1: 1,
      radio2: 2,
      orderInfo: [],
      ship_status: 3,
      money: '',
      moneyTip: '不可修改',
      readOnly: true,
      placeholder: '',
      reasonShow: true,
      refundReason1: 'refund-reason',
      refundReason2: '',
      reason1: 6,
      reason2: 7,
      reason3: 6,
      historyId: 0,
      refundPath: 1,
      refundSay: '',
      iswx: /micromessenger/.test(navigator.userAgent.toLowerCase()),
      imgs: [],
      locals: [],
      servers: [],
      submitting: false
    }
  },

  created () {
    var self = this
    if (self.iswx) {
      var url = self.$route.path.split('?')
      var apiList = ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage']
      wxService.jsSign(process.env.CROS_DOMAIN + url[0], apiList)
    }
  },

  mounted () {
    var self = this
    var id = self.$route.query.id
    if (id > 0) {
      var hid = self.$route.query.hid
      hid = hid > 0 ? hid : 0
      self.$http.get(`refund/apply?id=${id}&hid=${hid}`).then(
        ({ data }) => {
          self.orderInfo = data;
          self.money = data.money;
          if(data.history_id != undefined) {
            self.historyId = data.history_id;
          }
        },
        (response) => {
          window.router.replace('/')
        }
      )
    } else {
      window.router.replace('/')
    }
  },

  methods: {
    //收货状态改变
    receiveStatus () {
      var self = this;
      if(self.ship_status==1) {
        self.moneyTip = '最多￥'+self.orderInfo.money;
        self.readOnly = false;
        self.money = '';
        self.placeholder = '请输入退款金额';
        self.reasonShow = false;
        self.refundReason1 = '';
        self.reason1 = '';
        self.refundReason2 = 'refund-reason';
        self.reason2 = 7;
      }else if(self.ship_status==2) {
        self.moneyTip = '不可修改';
        self.readOnly = true;
        self.money = self.orderInfo.money;
        self.reasonShow = true;
        self.refundReason1 = 'refund-reason';
        self.reason1 = 6;
        self.refundReason2 = '';
        self.reason2 = '';
      }
    },

    //未发货，退款原因改变
    shipStatus () {
      var self = this;
      if(self.reason3 == 5) {
        self.moneyTip = '最多￥'+self.orderInfo.money;
        self.readOnly = false;
        self.money = '';
        self.placeholder = '请输入退款金额';
        self.reasonShow = false;
      }else {
        self.moneyTip = '不可修改';
        self.readOnly = true;
        self.money = self.orderInfo.money;
        self.reasonShow = true;
      }
    },

    //表单验证
    submitApply () {
      var self = this;
      self.submitting = true
      var alertText = '';
      var reg = /^[0-9]+(.[0-9]{1,2})?$/;
      if(self.orderInfo.shipping_status != 0) {
        if(self.ship_status == 3) {
          alertText = '请您选择收货状态哦';
          self.aler(alertText);
          self.submitting = false
          return false;
        }else if(self.reason1 == 6 || self.reason2 == 7) {
          alertText = '请您选择退款原因哦';
          self.aler(alertText);
          self.submitting = false
          return false;
        }
      }else {//self.orderInfo.shipping_status == 0
        if(self.reason3 == 6) {
          alertText = '请您选择退款原因哦';
          self.aler(alertText);
          self.submitting = false
          return false;
        }
      }

      if(self.money == '') {
        alertText = '请您填写退款金额哦～';
        self.aler(alertText);
        self.submitting = false
        return false;
      }else if(!reg.test(self.money)) {
        if(isNaN(self.money)) {
          alertText = '您填写的退款金额填写不是数字哦~';
          self.aler(alertText);
        }else {
          self.money = parseFloat(self.money).toFixed(2);
        }
        self.submitting = false
        return false;
      }else if(self.money > self.orderInfo.money) {
        alertText = '申请退款金额错啦～不能大于' + self.orderInfo.money + '哦～';
        self.aler(alertText);
        self.submitting = false
        return false;
      }else {
        self.submitting = true
        var imgs = '';
        for(var i=0;i<self.imgs.length;i++) {
          if(i != self.imgs.length) {
            imgs = imgs + self.imgs[i] + ',';
          }else {
            imgs = imgs + self.imgs[i];
          }
        }
        var param = {
          id: self.orderInfo.order_id,
          history: self.historyId,
          refund_reason: self.refundReason1 != '' ? self.reason1 : (self.refundReason2 != '' ? self.reason2 : self.reason3),
          ship_status: self.ship_status,
          refund_path: self.refundPath,
          refund_money: self.money,
          refund_say: self.refundSay,
          img_url: imgs
        };
        self.$http.post('refund/submit', param).then(
          ({ data }) => {
            swal({ type: 'success', title: '申请退款成功，请等待处理...', text: '', timer: 4000 }, function () {
              window.location.replace('/order/orders?type=5')
            })
          },
          (response) => {
            var tip = "提交申请失败，请稍后重新申请"
            swal({ type: "warning", title: "", text: tip })
          }
        )
      }

    },

    //alert弹窗样式
    aler (alertText) {
      swal({
        type: "warning",
        title: "",
        text: alertText,
        confirmButtonText: "我知道了",
        confirmButtonColor: "#b0afaf"
      })
    },

    //删除图片
    deleteImg (index) {
      var self = this
      self.locals.$remove(self.locals[index])
      self.imgs.$remove(self.imgs[index])
    },

    newFileName (filename) {
      var pos = filename.lastIndexOf('.')
      var suffix = ''
      if (pos != -1)
        suffix = filename.substring(pos)
      return randomString() + suffix
    },

    //file控件change后是上传图片
    upload (event) {
      var self = this
      var files = event.target.files
      var len = 3 - self.imgs.length
      if (len <= 0) {
        alert('最多可上传3张图片');
      } else {
        for (var i = 0; i < files.length; i++) {
          var file = files[i]
          self.$http.get('ossjs/index').then(
            ({ data }) => {
              var filename = self.uploadToOss(data, file)
              self.imgs.push(filename)
              lrz(file, { quality: 0.5, width: 150 })
                .then(function (rst) {
                  self.locals.push(rst.base64)
                })
            }, (response) => {
              console.log(response)
            })
        }
      }
    },

    uploadToOss (data, file) {
      var self = this
      var filename = data.dir + self.newFileName(file.name)
      var form = new FormData()
      form.append("key", filename)
      form.append("policy", data.policy)
      form.append("OSSAccessKeyId", data.accessid)
      form.append("success_action_status", '200')
      form.append("callback", data.callback)
      form.append("signature", data.signature)
      form.append("file", file)
      self.$http.post(data.host, form).then(
        ({ data }) => {
          console.log(data)
        }, (response) => {
          console.log(response)
        })
      return filename
    },

    uploadWx () {
      var self = this
      var len = 3 - self.imgs.length
      if (len <= 0) {
        alert('最多上传3张哦 ^_^');
      } else {
        wx.chooseImage({
          count: 1,//len, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            self.upToWx(res.localIds)
          }
        });
      }
    },

    upToWx (localIds) {
      var self = this
      var len = 3 - self.imgs.length
      if (len <= 0) {
        alert('最多上传3张图片')
      } else {
        if (localIds.length > 0) {
          var localId = localIds.pop()
          if (self.locals.indexOf(localId) < 0) {
            self.locals.push(localId)
            wx.uploadImage({
              localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function (res) {
                self.servers.push(res.serverId)
                self.upToWx(localIds)
              }
            })
          } else {
            self.upToWx(localIds)
          }
        } else {
          self.upToOss(self.servers)
        }
      }
    },

    upToOss (serverIds) {
      var self = this
      var len = 3 - self.imgs.length
      if (len < 0) {
        alert('最多上传3张哦 ^_^')
      } else {
        if (serverIds.length > 0) {
          var serverId = serverIds.pop()
          self.$http.post('wxtooss/index', { serverId: serverId }).then(
            ({ data }) => {
              self.imgs.push(data)
              self.upToOss(serverIds)
            }, (response) => {
              console.log(response)
            })
        } else {
          // console.log(self.imgs)
        }
      }
    },
  },

  components: {
    Layout: loader.layout('app'),
    Foot: loader.component('foot')
  }
}
