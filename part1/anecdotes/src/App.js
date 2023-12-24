import { useState } from 'react'

const Title = ({title}) => <h1>{title}</h1>

const Button = ({text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Anecdote = ({anecdote}) => <p>{anecdote}</p>

const VoteCount = ({voteCount}) => <p>has {voteCount} votes</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

   
  const [selected, setSelected] = useState(0)
  const randomAnecdote = () => {
    let random = Math.floor(Math.random() * Math.floor(anecdotes.length));
    setSelected(random)
  }

  const [votes, setVote] = useState(new Array(anecdotes.length).fill(0))
  const recordVote = () => {
    const voteCopies = [...votes]
    voteCopies[selected] += 1;
    setVote(voteCopies)
  }

  const max = Math.max(...votes)
  const maxVoteCount = votes[votes.indexOf(max)]
  const maxVoteAnecdote = anecdotes[votes.indexOf(max)]

  return (
    <div>
      <Title title={"Anecdote of the day"}></Title>
      <Anecdote anecdote={anecdotes[selected]}></Anecdote>
      <Button handleClick={recordVote} text="vote"></Button>
      <Button handleClick={randomAnecdote} text="next anecdote"></Button>
      <VoteCount voteCount={votes[selected]}></VoteCount>
      <Title title={"Anecdote with most votes"}></Title>
      <Anecdote anecdote={maxVoteAnecdote}></Anecdote>
      <VoteCount voteCount={maxVoteCount}></VoteCount>
    </div>
  )
}

export default App