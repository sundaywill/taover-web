/**
 * Created by sunday on 05/11/2016.
 */
import loader from './../../../router/loader'
import service from './../../../services/redeem'

export default {
  name: 'Redeem',

  data () {
    return {
      voucher: null,
      message: null,
      tip: null
    }
  },

  computed: {
    redeem () { return this.$store.state.redeem },
  },

  created () {
    var self = this
    self.voucher = self.redeem.code
    self.message = self.redeem.memo
  },

  methods: {
    verify () {
      var self = this
      if (self.voucher != null && self.voucher != '') {
        self.$http.post('redeem/verify', { voucher: self.voucher }).then(
          ({ data }) => {
            service.redeem(data, self.voucher, self.message)
          }, (response) => {
            console.log(response.data)
            switch (response.data.message) {
              case '40001': self.tip = '兑换码错误'; break;
              case '40002': self.tip = '兑换码已经使用了'; break;
              case '40003': self.tip = '兑换码已过期'; break;
              case '40004': self.tip = '商品库存不足'; break;
              default: self.tip = '兑换码验证失败'; break;
            }
            self.tip += '，请检查是否输入正确'
          }
        )
      }
    },
    submit () {
      var self = this
      if (self.redeem.verified) {
        var params = {
          goods_id: self.redeem.goods.goods_id,
          stage_id: self.redeem.goods.stage_id,
          project_id: self.redeem.goods.project_id,
          address_id: self.redeem.address.address_id,
          voucher: self.redeem.code,
          message: self.redeem.memo
        };
        self.$http.post('redeem/submit', params).then(
          ({ data }) => {
            console.log(data)
            swal({ type: "success", title: "", text: "恭喜，已兑换成功！" }, function () {
              history.go(-1)
            })
          }, (response) => {
            console.log(response.data)
            swal({ type: "warning", title: "", text: "兑换失败，请稍后重试" })
          }
        )
      }
    }
  },

  components: {
    Layout: loader.layout('app')
  }
}
