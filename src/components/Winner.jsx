import { motion } from 'framer-motion'
import { useContext } from 'react'
import o from '../assets/o.svg'
import x from '../assets/x.svg'
import { AppContext } from '../context'
import { Reset } from './Reset'
export const Winner = ({ winner, handleClickReset }) => {
  const { state } = useContext(AppContext)
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -100
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        y: -100
      }}
      className='flex justify-center z-10 items-center fixed inset-0 bg-black bg-opacity-70 w-full'
    >
      <section className='text-gray flex flex-col items-center gap-5 bg-dark w-full py-10 bg-opacity-90'>
        {state.winner === 'TIES' ? (
          <h1 className='text-2xl font-semibold'>TIE</h1>
        ) : (
          <h1 className='text-2xl font-semibold'>
            {state.winner === state.icon ? 'YOU WON' : 'YOU LOSE'}
          </h1>
        )}
        <div className='text-2xl flex items-center gap-4'>
          <span>
            {winner === 'X' ? (
              <img src={x} alt='x winner' className='h-18 w-18' />
            ) : (
              winner === 'O' && (
                <img src={o} alt='o winner' className='h-18 w-18' />
              )
            )}
          </span>
          <h1>TAKES THE ROUND</h1>
        </div>
        <Reset handleClickReset={handleClickReset} />
      </section>
    </motion.div>
  )
}
