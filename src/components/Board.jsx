import { useContext, useEffect, useRef, useState } from 'react'
import o from '../assets/o.svg'
import reload from '../assets/reload.svg'
import x from '../assets/x.svg'
import { AppContext } from '../context'
import { handleWinner } from '../helpers'

export const Board = ({ handleClickReset }) => {
  const { state, setState } = useContext(AppContext)
  const [player, setPlayer] = useState(null)
  const [winner, setWinner] = useState(null)
  const [moves, setMoves] = useState(0)
  const ref = useRef(null)
  const refBoard = useRef(null)

  useEffect(() => {
    if (state.reset) {
      setState((prev) => ({
        ...prev,
        reset: false,
        turnCPU: false
      }))
      return
    }
    if (state.turnCPU && state.cpu) {
      setTimeout(() => {
        if (state.turnCPU && state.playing) cpuMove()
      }, 2000)
    }
    if (!player) setPlayer(state.icon)
  }, [state, player, winner])

  const cpuMove = () => {
    if (state.winner || !state.playing) return
    const random = Math.floor(Math.random() * 9)
    const board = refBoard.current
    const cell = board.children[random]

    if (moves >= 7) {
      const cell = document.querySelectorAll('[data-active="false"]')[0]
      cell.click()
      return
    }

    if (cell.dataset.active === 'false') {
      cell.click()
    } else {
      cpuMove()
    }
  }

  const handleClickPlay = (id, isSelected, player) => {
    setMoves(moves + 1)
    if (isSelected) return

    state.match = state.match.map((item) => {
      if (item.id === id) {
        item.selected = true
        item.player = player
      }
      return item
    })

    setState((prev) => ({
      ...prev,
      match: state.match,
      turnCPU: !state.turnCPU
    }))

    setPlayer(player === 'X' ? 'O' : 'X')
    const winner = handleWinner(state.match, player)
    if (setMoves === 9) {
      return setState((prev) => ({
        ...prev,
        winner: 'TIES',
        rounds: prev.rounds + 1
      }))
    }

    if (winner) {
      setState((prev) => ({ ...prev, winner: winner, rounds: prev.rounds + 1 }))
    }
  }

  return (
    <article className='grid grid-cols-3 gap-8' ref={refBoard}>
      <div className='flex items-center gap-2'>
        <img src={x} alt='x player' className='h-8 w-8' />
        <img src={o} alt='o player' className='h-8 w-8' />
      </div>
      <div className='flex items-center bg-ocean_dark justify-center shadow-solid-sm rounded-lg py-3 gap-2'>
        {player === 'X' ? (
          <svg viewBox='0 0 64 64' className='text-gray h-4'>
            <path
              fill='currentColor'
              d='M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z'
            ></path>
          </svg>
        ) : (
          <svg viewBox='0 0 64 64' className='text-gray h-4'>
            <path
              fill='currentColor'
              d='M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z'
            ></path>
          </svg>
        )}
        <h2 className='font-semibold text-xs md:text-md text-gray tracking-[2px]'>TURN</h2>
      </div>
      <button
        onClick={() => handleClickReset('restart')}
        className={` bg-gray place-items-center w-max ml-auto block px-4 py-2 rounded-md shadow-gray active:translate-y-[1px] transition-all ${
          state.turnCPU && 'cursor-not-allowed pointer-events-none'
        }`}
      >
        <img src={reload} alt='icon reload' className='h-5 w-max block' />
      </button>
      {state.match.map((box) => (
        <div
          ref={ref}
          className={`grid w-20 h-20 md:w-32 md:h-32 font-extrabold rounded-lg bg-ocean_dark place-items-center shadow-solid ${
            (state.turnCPU || box.selected) &&
            state.cpu &&
            'cursor-not-allowed pointer-events-none'
          }`}
          key={box.id}
          data-active={box.selected}
          data-id={box.id}
          onClick={() => handleClickPlay(box.id, box.selected, player)}
        >
          {box.player === 'X' && <img src={x} alt='x player' />}
          {box.player === 'O' && <img src={o} alt='o player' />}
        </div>
      ))}
      <div className='bg-yellow rounded-lg flex flex-col items-center py-2 shadow-md'>
        <p className='text-xs md:text-lg'>{state.icon} {!state.cpu ? 'Player 1' : '(YOU)'}</p>
        <h4 className='font-semibold text-xl'>{state.gamesWonPlayer}</h4>
      </div>
      <div className='bg-gray rounded-lg  flex flex-col items-center py-2 shadow-md'>
        <p className='text-xs md:text-lg'>TIES</p>
        <h4 className='font-semibold text-xl'>{state.ties}</h4>
      </div>
      <div className='bg-ocean rounded-lg  flex flex-col items-center py-2 shadow-md'>
        <p className='text-xs md:text-lg'>
          {state.icon === 'O' ? 'X' : 'O'} {!state.cpu ? 'Player 2' : '(CPU)'}
        </p>
        <h4 className='font-semibold text-xl'>{state.gamesWonCPU}</h4>
      </div>
    </article>
  )
}
