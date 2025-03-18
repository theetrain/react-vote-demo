import { useState, useEffect, useCallback } from 'react'
import { VoteGroup } from '../types'

const initialVoteGroups: VoteGroup[] = [
  { label: 'Group 1', id: crypto.randomUUID(), votes: [] },
  { label: 'Group 2', id: crypto.randomUUID(), votes: [] },
  { label: 'Group 3', id: crypto.randomUUID(), votes: [] },
]

const STORAGE_KEY = 'votesMap'

export const useVoteActions = () => {
  /**
   * Large object containing all vote groups and their
   * respective votes. This object is stored in local storage.
   */
  const [votesMap, setVotesMap] = useState<VoteGroup[]>([])

  useEffect(() => {
    const votes = localStorage.getItem(STORAGE_KEY)
    if (votes) {
      setVotesMap(JSON.parse(votes))
    } else {
      setVotesMap(initialVoteGroups)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialVoteGroups))
    }
  }, [])

  const addVote = useCallback((groupId: string) => {
    const id = crypto.randomUUID()

    const newVotesMap: VoteGroup[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? '[]'
    )
    const groupIndex = newVotesMap.findIndex((group) => group.id === groupId)

    const newVotes: VoteGroup['votes'] = [
      ...newVotesMap[groupIndex].votes,
      { voteState: 0, id },
    ]
    newVotesMap[groupIndex] = { ...newVotesMap[groupIndex], votes: newVotes }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVotesMap))
    setVotesMap(newVotesMap)
  }, [])

  const toggleVote = useCallback(
    (
      groupId: VoteGroup['id'],
      { id, voteState }: VoteGroup['votes'][number]
    ) => {
      const newVotesMap: VoteGroup[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? '[]'
      )

      const groupIndex = newVotesMap.findIndex((group) => group.id === groupId)
      const voteIndex = newVotesMap[groupIndex].votes.findIndex(
        (vote) => vote.id === id
      )

      const newVote = voteState === 0 ? 1 : 0
      newVotesMap[groupIndex].votes[voteIndex].voteState = newVote

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVotesMap))
      return newVote
    },
    []
  )

  const clearVotes = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialVoteGroups))
    setVotesMap(initialVoteGroups)
  }, [])

  return { votesMap, addVote, toggleVote, clearVotes }
}
