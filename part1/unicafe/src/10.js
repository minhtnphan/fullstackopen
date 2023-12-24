import { useState } from 'react'

const Title = ({title}) => <h1>{title}</h1>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Counter = ({ text, count }) => <p>{text} {count}</p>

const Average = ({ good, neutral, bad }) => <p>average {(good - bad)/(good + neutral + bad)}</p>

const Positive = ({ good, neutral, bad }) => <p>positive {(good)/(good + neutral + bad) *100}%</p> 

const Statistics = (props) => {
  
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Title title="give feedback"/>
      <Button handleClick={increaseGood} text='good'></Button>
      <Button handleClick= {increaseNeutral} text='neutral'></Button>
      <Button handleClick= {increaseBad} text='bad'></Button>
      <Title title="statistics"/>
      <Counter text='good' count={good}></Counter>
      <Counter text='neutral' count={neutral}></Counter>
      <Counter text='bad' count={bad}></Counter>
      <Counter text='all' count={good + neutral + bad}></Counter>
      <Average good={good} neutral={neutral} bad={bad}></Average>
      <Positive good={good} neutral={neutral} bad={bad}></Positive>

    </div>
  )
}


export default App;
