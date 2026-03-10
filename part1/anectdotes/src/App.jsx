import { useState } from 'react'

//Create a button to randomly load next anectdotes 

const Button = ({onClick, children}) => {

  return (
    
    <button onClick={onClick}>
      {children}
    </button>
  )

}

 const App = () => {

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(8).fill(0))
  const maxVotes = Math.max(...votes)
  const mostVotesIndex =  votes.indexOf(maxVotes)

  const handleClick = () => {
    //alert('Button clicked!');
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  };

  const handleVote = () => {
  const copy = [...votes]
  copy[selected] += 1
  setVotes(copy)

 }


  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  

  return (
    <div>      
      <h2> Anectdote from the world of computing </h2>
      {anecdotes[selected]}<br />
      <p>has {votes[selected]} votes</p>
       <Button onClick={handleVote}>Vote</Button> <Button onClick={handleClick}> Next Anectdote</Button>
       <h2> Anectdote with most votes </h2>
       {anecdotes[mostVotesIndex]}
       <p>has {maxVotes} votes</p>
    </div>
  )
}

export default App