import './index.css'
import { Square } from './assets/components/Square'
import { useState } from 'react'


const turns = {
  X: 'x',
  O: 'o'
}



function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(turns.X)

  function updateBoard(){
    const newTurn = turn === turns.X ? turns.O : turns.X
    setTurn(newTurn)
  }
  
  return (
    <main className='board'>
      <h1>Ta te ti</h1>
      
      <section className='game'>
        {
          board.map( (_ , index) => {
            return(
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {/* {index} */}
              </Square>  
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === turns.X}>{turns.X}</Square>
        <Square isSelected={turn === turns.O}>{turns.O}</Square>
      </section>
    </main>
  )
}

export default App
