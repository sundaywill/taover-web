/**
 * Created by sunday on 04/11/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/comment'
import wxService from './../../../services/wechat'
import wx from 'weixin-js-sdk'
import lrz from 'lrz'
import randStr from 'random-string'

export default {
  data() {
    var self = this
    return {
      iswx: /micromessenger/.test(navigator.userAgent.toLowerCase()),
      pid: self.$route.query.pid,
      content: '',
      image: '',
      imgs: [],
      locals: [],
      servers: [],
      uploading: false,
      showEmojis: false,
      emojis: [
        '😀', '😁', '😂', '😄', '😅', '😆', '😇', '😉', '😊', '🙂', '🙃',
        '😍', '😘', '😙', '😜', '😝', '🤑', '🤓', '😎', '🤗', '😏', '😶',
        '😑', '😒', '🙄', '🤔', '😳', '😞', '😟', '😠', '😡', '😔', '😕',
        '😣', '😖', '😫', '😤', '😮', '😱', '😨', '😰', '😯', '😦', '😢',
        '😥', '😪', '😓', '😭', '😲', '🤐', '😷', '🤒', '🤕', '😴', '💤',
        '💩', '😈', '👹', '👺', '💀', '👻', '👽', '🤖', '👏', '👋', '👍',
        '👎', '👊', '👌', '✋', '💪', '🙏', '👆', '👇', '👈', '👉', '🖐',
      ]
    }
  },

  computed: {
    authenticated () { return this.$store.state.auth.authenticated },
  },

  created () {
    var self = this
    self.uploading = false
  },

  methods: {
    reply () {
      var self = this
      if (self.uploading)
        return false
      if (self.content == '' || self.content.length == 0)
        return false
      if (self.content.length < 15) {
        swal("", "再多说一点吧，至少15字哦")
        return false
      }
      var i = self.$route.query.i//index
      var id = self.$route.query.id//project_id
      var rid = self.$route.query.rid//
      var vid = self.$route.query.vid
      var p_name = self.$route.query.p_name
      self.$http.post('vote/reply', {
        pid: self.pid,//comment_id
        id: id,
        vid: vid,
        rid: rid,
        content: "回复 " + p_name + "：" + self.content,
        images: ''
      }).then(
        ({ data }) => {
          /*service.reply(data, i)*/
          if(data == 1) {
            self.$router.go(-1)
          }else {
            var alertText = "评论失败，请稍候再试！";
            swal({
              type: "warning",
              title: "",
              text: alertText,
              confirmButtonText: "我知道了",
              confirmButtonColor: "#b0afaf"
            })
          }

          /*self.$router.push({
            path: '/comment',
            query: {
              id: id
            },
            hash: 'c' + i
          })*/
        },
        (response) => {
          console.log(response)
        })
    },
    typeEmoji(emoji) {
      var self = this
      self.content += emoji
      self.showEmojis = false
    },
    /*deleteImg(index) {
      var self = this
      self.locals.splice(index)
      self.imgs.splice(index)
      self.$refs.uploader.value = ''
    },
    newFileName(filename) {
      var pos = filename.lastIndexOf('.')
      var suffix = ''
      if (pos != -1)
        suffix = filename.substring(pos)
      return randStr() + suffix
    },
    upload(event) {
      var self = this
      self.uploading = true
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
              lrz(file, { quality: 0.7, width: 150 })
                .then(function (rst) {
                  self.locals.push(rst.base64)
                })
            }, (response) => {
              console.log(response)
            })
        }
      }
      self.uploading = false
    },
    uploadToOss(data, file) {
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
    uploadWx() {
      var self = this
      self.uploading = true
      var len = 3 - self.imgs.length
      if (len <= 0) {
        alert('最多可上传3张图片');
      } else {
        wx.chooseImage({
          count: 1,//len, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            self.upToWx(res.localIds)
          }
        })
      }
      self.uploading = false
    },
    upToWx(localIds) {
      var self = this
      var len = 3 - self.imgs.length
      if (len <= 0) {
        alert('最多可上传3张图片')
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
    upToOss(serverIds) {
      var self = this
      var len = 3 - self.imgs.length
      if (len < 0) {
        alert('最多可上传3张图片')
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
    },*/
  },

  components: {
    Layout: loader.layout('app')
  }
}
