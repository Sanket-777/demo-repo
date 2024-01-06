const EventEmitter = require('events');
const uuid = require('uuid');

class logger extends EventEmitter{
    log(msg)
    {
        this.emit('message',{id:uuid.v4(),msg});
    }
}

module.exports = logger;