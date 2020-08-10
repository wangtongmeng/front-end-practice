function createStore(reducer) {
  let state
  let listeners = []

  function getState() {
    return JSON.parse(JSON.stringify(state))
  }
  function dispatch() {
    
  }
  function subscribe() {
    
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}