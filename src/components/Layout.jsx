import { AnimatePresence } from 'framer-motion'
import React, { useContext } from 'react'
import { AppContext } from '../context'
import { Board } from './Board'
import { Start } from './Start'
import { StatusCPU } from './StatusCPU'
import { Winner } from './Winner'

export const Layout = () => {
  const { state, setState } = useContext(AppContext)
  const { companion, cpu } = state
  const handleClickReset = () => {
    setState((prev) => ({
      ...prev,
      playing: true,
      winner: null,
      match: prev.match.map((item) => ({
        ...item,
        selected: false,
        player: null
      })),
      icon: prev.icon,
      rounds: prev.rounds + 1,
      reset: true,
      turnCPU: false
    }))
  }
  return (
    <section>
      <AnimatePresence>
        {!state.playing && !state.reset ? (
          <Start />
        ) : (
          <Board handleClickReset={handleClickReset} />
        )}
      </AnimatePresence>
      {state.winner && (
        <Winner handleClickReset={handleClickReset} winner={state.winner} />
      )}
      <div className='h-32 w-full flex flex-col items-center'>
        {companion?.turn && cpu && <StatusCPU />}
      </div>
    </section>
  )
}
