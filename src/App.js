/**
 * Created by sunday on 03/11/2016.
 */
import Vue from 'vue'

// Vue Images Lazy Load
const Lazyimg = require('./components/lazyimg/lazyimg')
Vue.use(Lazyimg)

// SweetAlert
require('sweetalert')
require('sweetalert/dist/sweetalert.css')

// Styles
import 'ace-css/css/ace.min.css'
import './assets/styles/style.css'
// Fonts
import './assets/fonts/style.css'

export default {
  name: 'app',
}
