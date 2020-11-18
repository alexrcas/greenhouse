'use strict';

/*
    TODO:
    Utilizar Axios para enviar una request al microcontrolador de la válvula
*/

const io = require('socket.io-client')('http://localhost:4000');

io.on('openValve', () => {
    console.log(`ON - openvalve`)

});

io.on('closeValve', () => {
    console.log(`ON - closevalve`)
});