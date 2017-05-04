/**
 * Created by sunday on 03/11/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/recharge'

export default {
  name: 'Recharge',

  data () {
    return {
      tab: 1,
      cardPwd: '',
      showModal: false,
      showTip: false,
      loading: false,
      submitting: false
    }
  },

  computed: {
    lists () { return this.$store.state.recharge.lists },
    amount () { return this.$store.state.recharge.amount },
    avatar () { return this.$store.state.recharge.avatar }
  },

  created () {
    service.amounts()
  },

  methods: {
    onInfinite () {
      var self = this
      self.getList()
      self.$emit('$InfiniteLoading:loaded')
    },

    getList () {
      var self = this
      if (self.lists.more)
        service.lists(self.tab, self.lists.skip, self.lists.take)
    },

    changeTab (tab) {
      var self = this
      self.tab = tab
      service.change(tab)
      self.getList()
    },

    hideModal () {
      var self = this
      var e = e || window.event // 浏览器兼容性
      var elem = e.target || e.srcElement
      while (elem) {
        if (elem.rel && elem.rel == 'modal-btn') return
        // 循环判断至跟节点，防止点击的是子元素
        if (elem.className && elem.className == 'modal-wrapper') return
        elem = elem.parentNode
      }
      self.showModal = false
    },

    useCard() {
      var self = this
      self.submitting = true
      self.$http.post('recharges/useCard', { card_pwd: self.cardPwd }).then(
        ({ data }) => {
          var body = service.useCard(data)
          self.cardPwd = ''
          self.submitting = false
          self.showModal = false
          swal({
            type: "success",
            title: "",
            text: "成功充值￥" + body + "\r\n3秒后自动关闭",
            timer: 3000,
            confirmButtonText: "好的",
            confirmButtonColor: "#ff8a00"
          })
        },
        (response) => {
          self.cardPwd = ''
          self.submitting = false
          swal({
            type: "warning",
            title: "",
            text: "密码验证失败或已被使用\r\n请重新输入",
            confirmButtonText: "我知道了",
            confirmButtonColor: "#b0afaf"
          })
        }
      )
    }
  },

  components: {
    Layout: loader.layout('app'),
    InfiniteLoading: loader.component('infiniteLoading')
  }
}

