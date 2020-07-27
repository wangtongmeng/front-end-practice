import React from 'react'
import VoteHead from './VoteHead'
import VoteMain from './VoteMain'
import VoteFooter from './VoteFooter'

const ThemeContext = React.createContext()
window.ThemeContext = ThemeContext

export default class Vote extends React.Component {

  render() {
    return <ThemeContext.Provider value={{
      store: this.props.store
    }}>
      <VoteHead />
      <VoteMain />
      <VoteFooter />
    </ThemeContext.Provider>
  }
}