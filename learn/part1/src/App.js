// const Hello = ({ name, age }) => {
//   const bornYear = () => new Date().getFullYear() - age
//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter'
//   const age = 10

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </div>
//   )
// }

import { useState } from 'react'

// const Display = ({ counter }) => <div>{counter}</div>

// const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

// const App = () => {
//   const [ counter, setCounter ] = useState(0)

//   const increaseOne = () => setCounter(counter + 1)
//   const setToZero = () => setCounter(0)

//   return (
//     <div>
//       <Display counter={counter}></Display>
//       <Button handleClick={increaseOne} text = 'plus'/>
//       <Button handleClick={setToZero} text = 'zero'/>
//     </div>
//   )
// }

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks, setAll] = useState([])


  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }


  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}

      <p>{allClicks.join(' ')}</p>
    </div>
  )
}

export default App;
