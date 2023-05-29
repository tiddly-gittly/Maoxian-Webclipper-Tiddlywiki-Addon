(function(root, factory) {

  root.MxAPI = factory();

})(window, function() {

  const EV_PREFIX = 'mx-wc.';
  const MX_PROPERTY = '___mxwc_is_ready___';
  const eventsToSend = [];
  const state = {ready: false};

  function listenEvent(evName, listener) {
    document.addEventListener(
      addNamespace(evName),
      wrapListener(listener)
    );
  }

  function sendEvent(evName, msg) {
    if (state.ready) {
      // Stringify the message
      const detail = JSON.stringify(msg || {});
      const ev = new CustomEvent(
        addNamespace(evName),
        {detail: detail}
      );
      document.dispatchEvent(ev);
    } else {
      eventsToSend.push({evName, msg})
    }
  }


  function wrapListener(listener) {
    return function(e) {
      // handle event message (JSON string)
      const msg = JSON.parse(e.detail || '{}');
      listener(msg);
    }
  }


  function addNamespace(evName) {
    return evName.startsWith(EV_PREFIX) ? evName : EV_PREFIX + evName;
  }

  function init() {
    state.ready = window[MX_PROPERTY] || false;
    if (!state.ready) {
      const readyEventListener = function() {
        state.ready = true;
        document.removeEventListener('mx-wc.ready', readyEventListener);
        while(eventsToSend.length > 0) {
          const {evName, msg} = eventsToSend.shift();
          sendEvent(evName, msg);
        }
      }
      document.addEventListener('mx-wc.ready', readyEventListener);
    }
  }

  init();

  return {listenEvent, sendEvent}

});
