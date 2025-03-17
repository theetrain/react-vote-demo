import { scan } from 'react-scan'
import { VoteGroup } from './components/VoteGroup'
import { useVoteActions } from './hooks/useVoteActions'

scan({ enabled: import.meta.env.DEV })

function App() {
  const { votesMap, clearVotes } = useVoteActions()

  return (
    <div className="flex-col app">
      <h1>Vote app</h1>
      <p>
        Add votes to a vote group, and then click on a vote to toggle an upvote.
      </p>
      {Object.keys(votesMap).map((group) => (
        <>
          <h2>{group}</h2>
          <VoteGroup key={group} group={group} />
        </>
      ))}
      <button onClick={clearVotes}>Clear all votes</button>
    </div>
  )
}

export default App
