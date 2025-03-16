import { useEffect, useState } from 'react'
import { VoteContainer } from './components/VoteContainer'
import { Vote } from './types'

const voteGroups = ['group1', 'group2', 'group3']

function App() {
  const [votesMap, setVotesMap] = useState<Record<string, Vote[]>>({})

  useEffect(() => {
    const loadedVotes: Record<string, Vote[]> = {}
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

  function toggleVote(group: string, { key, voteState }: Vote) {
    console.log('toggling vote')
    const newVotes = structuredClone(votesMap)

    const voteIndex = newVotes[group].findIndex((vote) => vote.key === key)
    newVotes[group][voteIndex].voteState = voteState === 0 ? 1 : 0

    Object.entries(newVotes).forEach(([group, votes]) => {
      localStorage.setItem(group, JSON.stringify(votes))
    })
    setVotesMap(newVotes)
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
          onVote={(vote) => toggleVote(group, vote)}
        />
      ))}
      <button onClick={clearVotes}>Clear all votes</button>
    </div>
  )
}

export default App
