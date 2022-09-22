import { motion } from 'framer-motion'
import { useContext, useState } from 'react'
import o from '../assets/o.svg'
import x from '../assets/x.svg'
import { AppContext } from '../context'

export const Start = () => {
  const { state, setState } = useContext(AppContext)
  const [toggleOn, setToggleOn] = useState(false)

  const toggle = () => setToggleOn((prev) => !prev)

  const handleStartGameCPU = () => {
    setState((prev) => ({
      ...prev,
      playing: true,
      cpu: true,
      icon: !toggleOn ? 'X' : 'O',
      companion: {
        name: 'CPU',
        icon: toggleOn ? 'X' : 'O',
        turn: false
      },
      gamesWonCPU: 0,
      gamesWonPlayer: 0,
      ties: 0
    }))
  }

  const handleStartGamePlayer = () => {
    console.log('handleStartGamePlayer')
    setState((prev) => ({
      ...prev,
      playing: true,
      cpu: false,
      icon: !toggleOn ? 'X' : 'O',
      companion: {
        name: 'Player 2',
        icon: toggleOn ? 'X' : 'O',
        turn: false
      },
      gamesWonCPU: 0,
      gamesWonPlayer: 0,
      ties: 0
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='absolute my-auto bg-very_dark inset-0 flex flex-col items-center justify-center gap-4'
    >
      <div className='flex gap-2 items-center mb-4'>
        <img src={x} alt='x player' className='h-10 w-10' />
        <img src={o} alt='o player' className='h-10 w-10' />
      </div>
      <section className='bg-ocean_dark p-5 rounded-xl text-gray flex flex-col items-center w-[300px] sm:w-auto shadow-solid'>
        <div>
          <h2 className='font-semibold text-center'>PICK PLAYER 1’S MARK</h2>
          <div className=' px-2 bg-dark rounded-xl'>
            <article className='flex mt-4 w-[260px] md:w-96 justify-between relative items-center h-20 '>
              <div
                className={`absolute h-16 w-full z-10 flex my-auto top-0 bottom-0 ${
                  toggleOn && 'justify-end'
                }`}
                onClick={toggle}
              >
                <motion.div
                  layout
                  transition={spring}
                  className='bg-gray h-16 w-1/2 rounded-xl'
                ></motion.div>
              </div>
              <div className='h-7 w-1/2 flex justify-center relative z-20 pointer-events-none'>
                <svg
                  viewBox='0 0 64 64'
                  className={`h-7 w-7 ${
                    !toggleOn ? 'text-dark' : 'text-gray '
                  }`}
                >
                  <path
                    fill='currentColor'
                    d='M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z'
                  ></path>
                </svg>
              </div>
              <div className='h-7 w-1/2 flex justify-center z-20 relative pointer-events-none'>
                <svg
                  viewBox='0 0 64 64'
                  className={`h-7 w-7 ${toggleOn ? 'text-dark' : 'text-gray '}`}
                >
                  <path
                    fill='currentColor'
                    d='M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z'
                  ></path>
                </svg>
              </div>
            </article>
          </div>
          <p className='text-center mt-4'>REMEMBER : X GOES FIRST</p>
        </div>
        <footer className='flex flex-col gap-8 text-lg mt-4 w-full'>
          <button
            className='bg-yellow px-4 font-semibold py-4 text-dark rounded-xl -tracking-2 shadow-yellow'
            onClick={handleStartGameCPU}
          >
            NEW GAME (VS CPU)
          </button>
          <button
            className='bg-ocean px-4 font-semibold text-dark rounded-xl py-4 shadow-ocean'
            onClick={handleStartGamePlayer}
          >
            NEW GAME (VS PLAYER)
          </button>
        </footer>
      </section>
    </motion.div>
  )
}

const spring = {
  opacity: { ease: 'linear' },
  type: 'spring',
  stiffness: 700,
  damping: 60
}
