import { VoteGroup } from './components/VoteGroup'
import { useVoteActions } from './hooks/useVoteActions'

function App() {
  if (import.meta.env.DEV) {
    import('react-scan').then((mod) => {
      mod.scan({ enabled: true })
    })
  }
  const { votesMap, clearVotes, addVote, toggleVote } = useVoteActions()

  return (
    <div className="flex-col app">
      <h1>Vote app</h1>
      <p>
        Add votes to a vote group, and then click on a vote to toggle an upvote.
      </p>
      {votesMap.map((group) => (
        <div key={group.id}>
          <h2>{group.label}</h2>
          <VoteGroup group={group} actions={{ addVote, toggleVote }} />
        </div>
      ))}
      <button onClick={clearVotes}>Clear all votes</button>
    </div>
  )
}

export default App
