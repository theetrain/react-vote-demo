import { useEffect, useState } from 'react'
import { VoteContainer } from './components/VoteContainer'

type Vote = Array<{ voteState: number; key: string }>
const voteGroups = ['group1', 'group2', 'group3']

function App() {
  const [votesMap, setVotesMap] = useState<Record<string, Vote>>({})

  useEffect(() => {
    const loadedVotes: Record<string, Vote> = {}
    voteGroups.forEach((group) => {
      const votes = localStorage.getItem(group)
      if (votes) {
        loadedVotes[group] = JSON.parse(votes)
      }
    })
    setVotesMap(loadedVotes)
  }, [])

  function addVote(group: string) {
    const key = crypto.randomUUID()
    const newVotes = [...(votesMap[group] || []), { voteState: 0, key }]
    localStorage.setItem(group, JSON.stringify(newVotes))
    setVotesMap({ ...votesMap, [group]: newVotes })
  }

  function vote() {
    // TODO
  }

  function clearVotes() {
    voteGroups.forEach((group) => localStorage.removeItem(group))
    setVotesMap({})
  }

  return (
    <div className="flex-col app">
      <h1>Vote app</h1>
      <p>Click </p>
      {voteGroups.map((group) => (
        <VoteContainer
          key={group}
          votes={votesMap[group] || []}
          onAddVote={() => addVote(group)}
          onVote={vote}
        />
      ))}
      <button onClick={clearVotes}>Clear all votes</button>
    </div>
  )
}

export default App
