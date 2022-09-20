import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context'

export const Reset = ({ handleClickReset }) => {
  const { state, setState } = useContext(AppContext)

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      gamesWonCPU:
        state.icon === state.winner ? state.gamesWonCPU : state.gamesWonCPU + 1,
      gamesWonPlayer:
        state.icon !== state.winner
          ? state.gamesWonPlayer
          : state.gamesWonPlayer + 1,
      ties: state.winner === 'TIES' ? state.ties + 1 : state.ties
    }))
  }, [])

  const handleClickQuit = () => {
    setState((prev) => ({
      ...prev,
      playing: false,
      winner: null,
      match: prev.match.map((item) => ({
        ...item,
        selected: false,
        player: null
      })),
      rounds: 0,
      gamesWonCPU: 0,
      gamesWonPlayer: 0,
      ties: 0,
      reset: false,
      turnCPU: false
    }))
  }

  return (
    <footer className='flex gap-4'>
      <button
        onClick={handleClickQuit}
        className='px-4 py-2 bg-gray rounded-md text-dark font-semibold shadow-solid'
      >
        QUIT
      </button>
      <button
        className='px-4 py-2 bg-yellow text-dark rounded-md shadow-solid'
        onClick={handleClickReset}
      >
        NEXT ROUND
      </button>
    </footer>
  )
}
