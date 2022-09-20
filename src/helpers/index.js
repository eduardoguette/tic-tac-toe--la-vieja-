export function handleWinner(moves, player) {
 
  let result = []
  const movesWiners = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ]
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
