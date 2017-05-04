/**
 * Created by sunday on 08/11/2016.
 */
import loader from './../../../router/loader'
import wxService from './../../../services/wechat'
import Bar from './../../../components/charts/bar.vue'
import wx from 'weixin-js-sdk'
import lrz from 'lrz'
import randStr from 'random-string'

export default {
  data() {
    var self = this
    return {
      project: '',
      shoming: '',
      toVoteNow: [],
      voteNow: [],
      voteOld: [],
      content: '',
      iswx: /micromessenger/.test(navigator.userAgent.toLowerCase()),
      imgs: [],
      locals: [],
      servers: [],
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      content: '',
      locals: [],
      servers: [],
      shoming: false,
      uploading: false,
      uploaded: false,
      showEmojis: false,
      emojis: [
        '😀', '😁', '😂', '😄', '😅', '😆', '😇', '😉', '😊', '🙂', '🙃',
        '😍', '😘', '😙', '😜', '😝', '🤑', '🤓', '😎', '🤗', '😏', '😶',
        '😑', '😒', '🙄', '🤔', '😳', '😞', '😟', '😠', '😡', '😔', '😕',
        '😣', '😖', '😫', '😤', '😮', '😱', '😨', '😰', '😯', '😦', '😢',
        '😥', '😪', '😓', '😭', '😲', '🤐', '😷', '🤒', '🤕', '😴', '💤',
        '💩', '😈', '👹', '👺', '💀', '👻', '👽', '🤖', '👏', '👋', '👍',
        '👎', '👊', '👌', '✋', '💪', '🙏', '👆', '👇', '👈', '👉', '🖐',
      ],
      subData: [],
      id: '',
      pid: '',
      questionnaire: '',
      voteId: 0,
      tid: '',
      parentId: 0,
      zhankai: 0,
      isNow: true,
      projectType: 0,
      countlist: 0,
      tuijian: 0,
      baifen: 0,
      datasets: [],
      count: 0,
      comments: [],
      skip: 0,
      take: 10,
      isVoted: 0,
      more: 1,
      votego: 0,
      voteCount: 0,
      voting: false
    }
  },

  computed: {
    authenticated () {
      return this.$store.state.auth.authenticated
    }
  },

  created () {
    var self = this
    self.uploading = false
    self.uploaded = false
  },

  mounted () {
    var self = this
    self.uploading = false
    self.uploaded = false
    var id = self.$route.query.id
    var pid = self.$route.query.pid
    var votego = self.$route.query.votego
    self.$http.get(`vote/index?id=${id}&pid=${pid}&votego=${votego}`).then(
      ({data}) => {
        self.project = data.project
        self.toVoteNow = data.toVoteNow
        self.subData = data.sub_data
        self.shoming = data.shoming
        self.id = data.order_id
        self.pid = data.project.project_id
        self.voteId = data.vote_id ? data.vote_id : 0
        self.tid = data.tid
        self.voteNow = data.voteNow
        self.voteOld = data.voteOld
        self.projectType = data.project_type
        self.zhankai = data.zhankai
        self.countlist = data.countlist
        self.tuijian = data.tuijian
        self.baifen = data.baifen
        self.count = data.count
        self.isVoted = data.isVoted
        self.votego = data.votego != 'undefined' ? data.votego : self.votego
        self.voteCount = data.vote_count

        if (data.listtmids != undefined) {
          var ar = []
          self.datasets = data.listtmids
        }
      })
    var skip = self.skip
    var take = self.take
    self.getList(pid, skip, take)
  },

  methods: {
    zan (index, id, cid) {
      var self = this
      if (self.authenticated) {
        self.$http.post('vote/zan', {id: id, cid: cid}).then(
          ({data}) => {
            console.log(data)
            self.comments[index].iszan = data
            if (data == 1) {
              self.comments[index].zans++
            } else {
              self.comments[index].zans--
            }
            console.log(self.comments[index].iszan)
          },
          (response) => {
            console.log(response)
          })
      } else {
        window.router.go({
          path: 'login',
          query: {
            jump: self.$route.fullPath
          }
        })
      }
    },

    refresh () {
      var self = this
      self.initial()
      self.getList(0, 10)
      setTimeout(function () {
        self.$refs.top.onLoaded()
      }, 500)
    },

    onInfinite () {
      var self = this
      if (self.more) {
        self.getList(self.pid, self.skip, self.take)
        self.$emit('$InfiniteLoading:loaded')
      } else {
        self.$emit('$InfiniteLoading:complete')
      }
    },

    getList (pid, skip, take) {
      var self = this;
      if (self.more == 0)
        return false;
      self.$http.get(`vote/comments?id=${pid}&skip=${skip}&take=${take}`).then(
        ({data}) => {
          var count = 0;
          for (var item in data.comments) {
            self.comments.push(data.comments[item])
            count++
          }
          if (count >= 10) {
            self.skip += 10
            self.take = 10
          } else {
            self.more = 0;
          }
        },
        (response) => {
          // window.router.replace('/')
        })
    },

    reply() {
      var self = this
      self.voting = true
      //投票、评论、上传图片表单验证
      if (self.toVoteNow[0].length != 0 && (self.option1 == '' || self.option2 == '' || self.option3 == '' || self.option4 == '')) {
        var alertText = "您还未完成投票哦~~~"
        self.alerType(alertText)
        return false
      } else if ((self.content).trim().length <= 10) {
        var alertText = "描述太少啦～ 多说几句吧～ 至少10个字哦 ^-^"
        self.alerType(alertText)
        return false
      }
      //调查问卷数据获取、表单验证
      var answer = [];//存储调查问卷答案;
      for (var question in self.subData) {
        var id = self.subData[question]['id']
        var inputs = document.getElementsByName("tk" + id)
        var type = inputs[0].getAttribute("type")
        var bixuan = inputs[0].getAttribute("flag")
        var tmid = inputs[0].getAttribute("tmid")
        if (type == "radio") {//单选
          var count = 0
          for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].checked) {
              answer.push(['xz', inputs[i].value, tmid])
              count++
            }
          }
          if (bixuan == 1 && count == 0) {//必填-单选
            var alertText = "亲! 调查问卷第" + question + "题还没有填写哦~"
            self.alerType(alertText)
            return false
          }
        } else if (type == "checkbox") {//多选
          var check = []
          for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].checked) {
              check.push(['xz', inputs[i].value, tmid])
            }
          }
          if (bixuan == 1 && check.length == 0) {//必填-多选
            var alertText = "亲! 调查问卷第" + question + "题还没有填写哦~"
            self.alerType(alertText)
            return false
          }
          answer.push(check)
        } else {//填空
          if (bixuan == 1 && inputs[0].value == '') {
            var alertText = "亲! 调查问卷第" + question + "题还没有填写哦~"
            self.alerType(alertText)
            return false
          }
          answer.push(['tk', inputs[0].value, tmid])
        }
      }
      self.questionnaire = answer;
      self.$http.post('vote/vote', { //投票，评论，图片，问卷，order_id,project_id
        id: self.id,
        pid: self.pid,
        content: self.content.trim(),
        images: self.imgs,
        questionnaire: self.questionnaire,
        voteId: self.voteId,
        tid: self.tid,
        option: [self.option1, self.option2, self.option3, self.option4],
        zhankai: 1
      }).then(
        ({ data }) => {
          swal({
            type: "success",
            title: "您已成功投票！",
            text: "",
            timer: 3000
          }, function () {
            /*window.router.replace({
              path: '/vote/vote',
              query: {
                pid: self.$route.query.pid
              }
            })*/
            window.location.replace('/vote/vote?pid=' + self.$route.query.pid)
          })
        }, (response) => {
          self.voting = false
        })
    },

    typeEmoji (emoji) {
      var self = this
      self.content += emoji
      self.showEmojis = false
    },

    //alert弹窗样式
    alerType (alertText) {
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
      self.locals.splice(index)
      self.imgs.splice(index)
      self.$refs.uploader.value = ''
    },

    newFileName (filename) {
      var pos = filename.lastIndexOf('.')
      var suffix = ''
      if (pos != -1)
        suffix = filename.substring(pos)
      return randStr() + suffix
    },

    //file控件change后是上传图片
    upload (event) {
      var self = this
      var files = event.target.files
      var len = 3 - self.imgs.length
      if (len <= 0) {
        alert('最多可上传3张图片')
      } else {
        for (var i = 0; i < files.length; i++) {
          var file = files[i]
          self.$http.get('ossjs/index').then(
            ({data}) => {
              var filename = self.uploadToOss(data, file)
              self.imgs.push(filename)
              lrz(file, {quality: 0.5, width: 150})
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
        ({data}) => {
          console.log(data)
        },
        (response) => {
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
        })
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
          self.$http.post('wxtooss/index', {serverId: serverId}).then(
            ({data}) => {
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

    nowOrOld () {
      var self = this
      if (self.isNow) self.isNow = false
      else self.isNow = true
    },

    open () {
      var self = this
      self.zhankai = self.zhankai ? 0 : 1
    }
  },

  components: {
    Layout: loader.layout('app'),
    Foot: loader.component('foot'),
    RefreshLoading: loader.component('refreshLoading'),
    InfiniteLoading: loader.component('infiniteLoading'),
    Avatar: loader.component('avatar'),
    Bar
  }
}
