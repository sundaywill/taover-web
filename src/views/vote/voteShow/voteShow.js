/**
 * Created by sunday on 08/11/2016.
 */
import loader from './../../../router/loader'
import wxService from './../../../services/wechat'
import Bar from './../../../components/charts/bar.vue'
import service from './../../../services/vote'
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
    }
  },

  computed: {
    authenticated () { return this.$store.state.auth.authenticated },
    //comments () { return this.$store.state.vote }
  },

  created () {
    var self = this
    /*if (self.comments.more) {
      service.list(this.$route.query.pid, self.comments.skip, self.comments.take)
    }*/

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
    console.log(2);
    self.$http.get(`vote/voteShow?&pid=${pid}`).then(
      ({data}) => {
        self.project = data.project;
        self.toVoteNow = data.toVoteNow;
        self.subData = data.sub_data;
        self.shoming = data.shoming;
        self.id = data.order_id;
        self.pid = data.project.project_id;
        self.voteId = data.vote_id ? data.vote_id : 0;
        self.tid = data.tid;
        self.voteNow = data.voteNow;
        self.voteOld = data.voteOld;
        self.projectType = data.project_type;
        self.zhankai = data.zhankai;
        self.countlist = data.countlist;
        self.tuijian = data.tuijian;
        self.baifen = data.baifen;
        self.count = data.count;
        self.isVoted = data.isVoted;
        self.votego = data.votego != 'undefined' ? data.votego : self.votego;

        if (data.listtmids != undefined) {
          var ar = [];
          self.datasets = data.listtmids;
        }
      })
    var skip = self.skip
    var take = self.take
    self.getList(pid, skip, take)
  },

  methods: {
    zan (index, id, cid) {//index,project_id,comment_id
      var self = this
      if (self.authenticated) {
        self.$http.post('vote/zan', { id: id, cid: cid }).then(
          ({ data }) => {
            console.log(data);
            self.comments[index].iszan = data;
            if(data == 1) {
              self.comments[index].zans++;
            }else {
              self.comments[index].zans--;
            }
            console.log(self.comments[index].iszan);
            /*service.zan(data, index)*/
          },
          (response) => { console.log(respons) })
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
        self.$refs.top.onLoaded(id)
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
      if(self.more == 0)
        return false;
      self.$http.get(`vote/comments?id=${pid}&skip=${skip}&take=${take}`).then(
        ({ data }) => {
          var count = 0;
          for(var item in data.comments) {
            self.comments.push(data.comments[item]);
            count++;
          }
          if(count >= 10) {
            self.skip += 10
            self.take = 10
          }else {
            self.more = 0;
          }
        },
        (response) => {
          // window.router.replace('/')
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
