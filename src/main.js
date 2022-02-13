import Vue from "vue"
import router from "./router/index"; //关键代码
import App from "./App.vue";
import store from "./store"; //关键代码
import './style/global.less'

const aaa = () => {
    console.log('111', Proxy, Promise, Map, Symbol)
}
aaa()

new Vue({
    store, //关键代码
    router, //关键代码
    render: (h) => h(App)
}).$mount("#app")