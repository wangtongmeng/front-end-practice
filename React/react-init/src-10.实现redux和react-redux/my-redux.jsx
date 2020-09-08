export function createStore(reducer) {
  let state
  let listeners = []

  function getState() {
    return JSON.parse(JSON.stringify(state))
  }
  function dispatch(action) {
    state = reducer(state, action)
    listeners.forEach(item => {
      if (typeof item !== 'function') return
      item()
    })
  }
  function subscribe(func) {
    if (!listeners.includes(func)) {
      listeners.push(func)
    }
    return function subscribe() {
      listeners = listeners.filter(item => {
        return item !== func
      })
    }
  }

  // 初始派发一次，让state等于reducer中的默认状态
  dispatch({
    type: '@@redux/INIT'
  })

  return {
    getState,
    dispatch,
    subscribe
  }
}