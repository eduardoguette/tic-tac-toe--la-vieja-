import { useState } from 'react'
import { Layout } from './components/Layout'
import { AppContext } from './context'
import { match } from './helpers'

function App() {
  const [state, setState] = useState({
    winner: null,
    rounds: 0,
    playing: false,
    match: match
  })
  return (
    <AppContext.Provider value={{ state, setState }}>
      <Layout />
    </AppContext.Provider>
  )
}

export default App
