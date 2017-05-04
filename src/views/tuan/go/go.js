/**
 * Created by sunday on 05/11/2016.
 */
import loader from './../../../router/loader'

export default {
  name: 'TuanGo',

  data () {
    return {
      opening: false,
      tuan: []
    }
  },

  created () {
    var self = this
    var goods_id = self.$route.query.goods_id
    var stage_id = self.$route.query.stage_id
    var project_id = self.$route.query.project_id
    if (goods_id > 0 && stage_id > 0 && project_id > 0 ) {
      var params = `?goods_id=${goods_id}&stage_id=${stage_id}&project_id=${project_id}`
      self.$http.get(`tuan/go` + params).then(
        ({ data }) => {
          self.tuan = data
        }, (response) => {
          window.router.replace('/')
        })
    } else {
      window.router.replace('/')
    }
    // Salog PageView Track
    self.$http.post('salog/track', { PageType: 'TuanGo', GoodsId: goods_id, StageId: stage_id, ProjectId: project_id })
  },

  methods: {
    open() {
      var self = this
      if (self.tuan.alert == '' || self.tuan.alert == undefined) {
        self.openTuan()
      } else {
        swal({
          title: '<b style="font-size: 1.5rem">您确认要开团吗？</b>',
          text: self.tuan.alert,
          type: 'warning',
          html: true,
          confirmButtonColor: '#f45e05',
          confirmButtonText: '我要开团',
          showCancelButton: true,
          cancelButtonText: '我再想想'
        }, function () {
          self.openTuan()
        })
      }
    },
    openTuan () {
      var self = this
      var goods_id = self.$route.query.goods_id
      var stage_id = self.$route.query.stage_id
      var project_id = self.$route.query.project_id
      self.opening = true
      if (self.opening) {
        if (goods_id > 0 && stage_id > 0 && project_id > 0 ) {
          var params = {
            goods_id: goods_id,
            stage_id: stage_id,
            project_id: project_id
          }
          self.$http.post(`tuan/open`, params).then(
            ({ data }) => {
              console.log(data)
              location.href = 'http://m.taover.com/Order/index'
                + '/goods_id/' + params.goods_id
                + '/stage_id/' + params.stage_id
                + '/project_id/' + params.project_id
                + '/tuan_id/' + data
            }, (response) => {
              console.log(response)
              swal({ title: '服务器现在有点累了，请稍后重试', text: '', type: 'danger' })
            })
        } else {
          window.router.replace('/')
        }
      }
    }
  },

  components: {
    Layout: loader.layout('app'),
    Foot: loader.component('foot')
  }
}
