import './App.css'
import {useState} from 'react'
import confetti from 'canvas-confetti'
import { TURNS } from './constants'
import { checkWinner } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { Board } from './components/Board'
import { Turn } from './components/Turn'
import { resetGameStorage, saveGametoStorage } from './logic/storage'



function App() {
  const [board, setBoard] = useState(() => {
    const BoardFromStorage = window.localStorage.getItem('board')
    return BoardFromStorage ? JSON.parse(BoardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const TurnFromStorage = window.localStorage.getItem('turn')
    return TurnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const handleButton = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  
  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGametoStorage({ board: newBoard, turn: newTurn })

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
      resetGameStorage()
    } else if (newBoard.every((square) => square !== null)) {
      setWinner(false)
      resetGameStorage()
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  return (
    <main className="board">
      <h1>Ta Te Ti</h1>
      <button id="reset" onClick={resetGame}>Volver a empezar</button>
      <Board board={board} updateBoard={updateBoard} />
      <Turn turn={turn} />
      <WinnerModal winner={winner} handleButton={handleButton} />
    </main>
  )
}

export default App
