
function EventEmitter()
{
  this.queue = {};

}

EventEmitter.prototype.listen = function addEventListener(event, fn)
{
  (this.queue[event] || (this.queue[event] = [])).push(fn);
};

EventEmitter.prototype.emit = function emitEvent(event, data)
{
  (this.queue[event] || []).forEach(callHandler);

  function callHandler(fn) {
    fn.call(undefined, data);
  }

};

export default EventEmitter;