import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import svg4everybody from 'svg4everybody'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

let domready = function () {//DOM дерево загрузилось
    ///////
    svg4everybody(); //запуск скрипта чтобы все внешние подключения svg были кроссбраузерными
    ///////
}


//////////domready/////////////
if (document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    domready();
} else {
    document.addEventListener("DOMContentLoaded", domready);
}
/////////////////////////////