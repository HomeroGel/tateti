import './index.css'
import { Square } from './assets/components/Square'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import {turns, winnerCombos} from './constants'
import { WinnerModal } from './assets/components/WinnerModal'


function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(turns.X)
  const [winner, setWinner] = useState(null) // null no hay ganador, false empate.

  const checkWinner = (boardToCheck) =>{
    for ( const combo of winnerCombos){
      const [a,b,c] = combo
      if(boardToCheck[a] &&
         boardToCheck[a] === boardToCheck[b] &&
         boardToCheck[a] === boardToCheck[c]) {
        
            return boardToCheck[a]
      }

    }
    return null //si no hay ganador
  }

  const checkEndGame = (boardToCheck) =>{
    return boardToCheck.every((square) => square !== null)
  }

  function updateBoard(index){
    //no actualizo si tiene algo
    if(board[index] || winner) return

    //actualizo el tablero
    const newBoard = [...board]  // me creo una copia para trabajar con esta misma
    newBoard[index] = turn //puede ser x u o
    console.log([...board])
    setBoard(newBoard)

    //cambio de turno
    const newTurn = turn === turns.X ? turns.O : turns.X
    setTurn(newTurn)

    //reviso si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner) //la act del estado es asincrono.
    } else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(turns.X)
    setWinner(null)
  }
  
  return (
    <main className='board'>
      <h1>Ta te ti</h1>
      <button onClick={resetGame}>Reiniciar</button>
      
      <section className='game'>
        {
          board.map( (square , index) => {
            return(
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square} {/* board[index] */}
              </Square>  
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === turns.X}>{turns.X}</Square>
        <Square isSelected={turn === turns.O}>{turns.O}</Square>
      </section>

      <WinnerModal  resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
