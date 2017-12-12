import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles/styles.scss'

import store from './store'
import router from './router'

import App from './App'

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App },
})
