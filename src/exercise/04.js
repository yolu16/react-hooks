// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils.js'
function Board({squares, selectSquare}) {
  // // 🐨 squares is the state for this component. Add useState for squares
  // // const [squares, setSquares] = React.useState(() => {
  // //   const storedSquare = window.localStorage.getItem('squares')
  // //   if(!!storedSquare){
  // //     return JSON.parse(storedSquare)
  // //   }
  // //   return Array(9).fill(null)
  // // })

  // // React.useEffect(()=>{
  // //   window.localStorage.setItem('squares', JSON.stringify(squares))
  // // }, [squares])
  // const [squares, setSquares] = useLocalStorageState('squares', Array(9).fill(null))

  // // 🐨 We'll need the following bits of derived state:
  // // - nextValue ('X' or 'O')
  // // - winner ('X', 'O', or null)
  // // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  // // 💰 I've written the calculations for you! So you can use my utilities
  // // below to create these variables
  // const nextValue = calculateNextValue(squares)
  // const winner = calculateWinner(squares)
  // const status = calculateStatus(winner,squares,nextValue)

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {

  const [history, setHistory] = useLocalStorageState('history', [Array(9).fill(null)])
  const [currentStep, setCurrentStep] = useLocalStorageState('step', 0)
  const squares = history[currentStep]
  console.log('render game', squares, currentStep)
  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner,squares,nextValue)
  const moves = calculateMoves(history, currentStep, (step)=>{
    console.log('move clicked', step)
    setCurrentStep(step)})

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
    console.log('selected ', square)
    // 🐨 first, if there's already winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    //
    // 🦉 It's typically a bad idea to mutate or directly change state in React.
    // Doing so can lead to subtle bugs that can easily slip into production.
    //
    // 🐨 make a copy of the squares array
    // 💰 `[...squares]` will do it!)
    //
    // 🐨 set the value of the square that was selected
    // 💰 `squaresCopy[square] = nextValue`
    //
    // 🐨 set the squares to your copy
    if(!!winner || !!squares[square]){
      console.log('select square failed', squares[square], winner)
      return
    }
    const newStepNumber = currentStep + 1 
    const currentSquares = [...squares]
    currentSquares[square] = nextValue
    const copyHistory = JSON.parse(JSON.stringify(history)).slice(0, newStepNumber)
    copyHistory.push(currentSquares)
    console.log('copyhistory', copyHistory)
    //copyHistory.push(currentSquares)
    setHistory(copyHistory)
    setCurrentStep(newStepNumber)
  }

  function restart() {
    // 🐨 reset the squares
    // 💰 `Array(9).fill(null)` will do it!
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board selectSquare={selectSquare} squares={squares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
  // return (
  //   <div className="game">
  //     <div className="game-board">
  //       <Board />
  //     </div>
  //   </div>
  // )
}

function calculateMoves(history, currentStep, onStepSelected){
  function moveText(i){
    if (i === 0){
      return 'Go to game start'
    }
    else if(i === currentStep){
      return `Go to move ${i} (current)`
    }
    else{
      return  `Go to move ${i}`
    }
  }
  //console.log('move history', history)
  //const indexes = Array(history.length).fill().map((_, index) => index)
  const c = history.map((sq, element) =>{
    return (<li key={element}><button disabled={element===currentStep} onClick={()=>onStepSelected(element)}>{moveText(element)}</button></li>)
  })
  //console.log('moves', c)
  return (<>
  {c}</>)
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
