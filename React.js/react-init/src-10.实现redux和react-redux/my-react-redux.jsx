import React from 'react'
import PropTypes from 'prop-types'

const ThemeContext = React.createContext()
export class Provider extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }
  render() {
    return <ThemeContext.Provider value={{
      store: this.props.store
    }}>
      {this.props.children}
    </ThemeContext.Provider>
  }
}

export function connect(mapStateToProps, mapDispatchToProps) {
  if (typeof mapStateToProps !== 'function') {
    mapStateToProps = function () {
      return {}
    }
  }
  if (typeof mapDispatchToProps !== 'function') {
    if (mapDispatchToProps !== null && typeof mapDispatchToProps === 'object') {
      const actions = mapDispatchToProps
      mapDispatchToProps = function (dispatch) {
        const obj = {}
        for (let key in actions) {
          if (!actions.hasOwnProperty(key)) break
          obj[key] = function (...args) {
            dispatch(actions[key](...args))
          }
        }
        return obj
      }
    } else {
      mapDispatchToProps = function () {
        return {}
      }
    }
  }

  return function connectHOC(Component) {
    return class Proxy extends React.Component {
      static contextType = ThemeContext
      render() {
        return <Component {...this.queryProps()} />
      }
      queryProps = () => {
        const store = this.context.store
        const state = mapStateToProps(store.getState())
        const action = mapDispatchToProps(store.dispatch)
        return {
          ...state,
          ...action
        }
      }
      componentDidMount() {
        this.context.store.subscribe(() => {
          this.forceUpdate()
        })
      }
    }
  }

}

// export default connect(state=>state.vote, mapDispatchToProps)(VoteMain)




















/**
 * Provider
 * connect
 */