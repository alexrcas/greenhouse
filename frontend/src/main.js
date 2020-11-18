import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const io = require('socket.io-client');
const socket = io('http://192.168.0.104:443');

socket.on('watering', data => {
  $('#exampleModal').modal('show');
  $('#litros').text(data);
})

socket.on('wateringFinish', () => {
  $('#terminado').show();
})

new Vue({
  render: h => h(App),
}).$mount('#app')
