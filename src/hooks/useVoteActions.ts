import { useState, useEffect, useCallback } from 'react'
import { Vote } from '../types'

const voteGroups = ['group1', 'group2', 'group3']

export const useVoteActions = () => {
  /**
   * Large object containing all vote groups and their
   * respective votes. This object is stored in local storage.
   */
  const [votesMap, setVotesMap] = useState<Record<string, Vote[]>>({})

  useEffect(() => {
    const loadedVotes: Record<string, Vote[]> = {}
    voteGroups.forEach((group) => {
      const votes = localStorage.getItem(group)
      if (votes) {
        loadedVotes[group] = JSON.parse(votes)
      } else {
        loadedVotes[group] = []
      }
    })
    setVotesMap(loadedVotes)
  }, [])

  const addVote = useCallback((group: string) => {
    const key = crypto.randomUUID()
    setVotesMap((prevVotesMap) => {
      const newVotes = [...(prevVotesMap[group] || []), { voteState: 0, key }]
      localStorage.setItem(group, JSON.stringify(newVotes))
      return { ...prevVotesMap, [group]: newVotes }
    })
  }, [])

  const toggleVote = useCallback((group: string, { key, voteState }: Vote) => {
    setVotesMap((prevVotesMap) => {
      const newVotesMap = { ...prevVotesMap }
      const groupVotes = newVotesMap[group] ? [...newVotesMap[group]] : []
      const voteIndex = groupVotes.findIndex((vote) => vote.key === key)

      if (voteIndex !== -1) {
        groupVotes[voteIndex] = {
          ...groupVotes[voteIndex],
          voteState: voteState === 0 ? 1 : 0,
        }
        localStorage.setItem(group, JSON.stringify(groupVotes))
        return { ...newVotesMap, [group]: groupVotes }
      }
      return prevVotesMap
    })
  }, [])

  const clearVotes = useCallback(() => {
    voteGroups.forEach((group) => localStorage.removeItem(group))
    setVotesMap({ group1: [], group2: [], group3: [] })
  }, [])

  return { votesMap, addVote, toggleVote, clearVotes }
}
