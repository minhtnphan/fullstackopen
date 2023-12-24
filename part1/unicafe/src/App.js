import { useState } from 'react'

const Title = ({title}) => <h1>{title}</h1>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ( {text, value}) => {
    return (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr> )
}

const Statistics = ( {good, neutral, bad} ) => {
    const average = (good - bad)/(good + neutral + bad)
    const positive = (good)/(good + neutral + bad) * 100 + '%'
    if (good + neutral + bad === 0) {
        return (<p>No feedback given</p>)
    }
    return (
        <div>
            <table>
                <tbody>
                    <StatisticLine text='good' value={good}></StatisticLine>
                    <StatisticLine text='neutral' value={neutral}></StatisticLine>
                    <StatisticLine text='bad' value={bad}></StatisticLine>
                    <StatisticLine text='average' value={average}></StatisticLine>
                    <StatisticLine text='positive' value={positive}></StatisticLine>
                </tbody>
            </table>
        </div>
    )
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
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}


export default App;
