export const movesWiners = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 5, 7],
  [3, 6, 9],
  [4, 5, 6],
  [7, 8, 9]
]
export function handleWinner(moves, player) {
  let result = []
  for (let i in movesWiners) {
    result = []
    moves.forEach((item) => {
      if (
        item.selected &&
        item.player === player &&
        movesWiners[i].includes(item.id)
      )
        result.push(item.id)
    })

    if (result.length > 2) return player
  }
}
export let match = [
  {
    id: 1,
    selected: false,
    player: null
  },
  {
    id: 2,
    selected: false,
    player: null
  },
  {
    id: 3,
    selected: false,
    player: null
  },
  {
    id: 4,
    selected: false,
    player: null
  },
  {
    id: 5,
    selected: false,
    player: null
  },
  {
    id: 6,
    selected: false,
    player: null
  },
  {
    id: 7,
    selected: false,
    player: null
  },
  {
    id: 8,
    selected: false,
    player: null
  },
  {
    id: 9,
    selected: false,
    player: null
  }
]

export function handleMoveCPU(moves, player1Icon) {
  let result = []
  let playerMoves = []
  moves.forEach((item) => {
    if (item.selected && player1Icon === item.player) {
      playerMoves = [...playerMoves, item.id]
    }
  })
  let cpuMoves = []
  moves.forEach((item) => {
    if (item.selected && player1Icon !== item.player) {
      cpuMoves = [...cpuMoves, item.id]
    }
  }) /* 
  console.log(cpuMoves, playerMoves) */

  movesWiners.forEach((itemWinner) => {
    playerMoves.forEach((movePlayer) => {
      if (String(itemWinner).includes(String(movePlayer))) {
        result.push(itemWinner)
        result = [...new Set(result)]
      }
    })
  })
 
  let resultadoFinal = []
  result.forEach((item) => {
    cpuMoves.forEach((moveCpu) => {
      if (!item.some((item) => item === moveCpu)) {
        resultadoFinal.push(item)
        resultadoFinal = [...new Set(resultadoFinal)]
      }
    })
  })
  
  cpuMoves.forEach((move) => {
    resultadoFinal.forEach((item) => {
      if (item.includes(move)) {
        resultadoFinal = resultadoFinal.filter((elem) => {
          return !elem.includes(move)
        })
      }
    })
  })
  let final = null
  if (resultadoFinal.length > 1) {
    resultadoFinal.forEach((item) => {
      if (String(item).includes(String(playerMoves))) {
        final = String(item).replace(String(playerMoves), '').replace(',', '')
      }
    })
  } 
  if (!final) { 
    result = result.flat().filter((item) => item !== playerMoves[0])
    const ramdon = Math.ceil(Math.random() * 9) 
    final = ramdon
  }

  

  return Number(final)
}
