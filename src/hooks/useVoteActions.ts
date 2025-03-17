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
      return
    } else {
      setVotesMap(initialVoteGroups)
    }
  }, [])

  const addVote = useCallback((groupId: string) => {
    setVotesMap((prevVotesMap) => {
      const id = crypto.randomUUID()
      const groupIndex = prevVotesMap.findIndex((group) => group.id === groupId)

      const newVotes: VoteGroup['votes'] = [
        ...prevVotesMap[groupIndex].votes,
        { voteState: 0, id },
      ]
      const newMap: VoteGroup[] = [...prevVotesMap]
      newMap[groupIndex] = { ...prevVotesMap[groupIndex], votes: newVotes }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMap))
      return newMap
    })
  }, [])

  const toggleVote = useCallback(
    (
      groupId: VoteGroup['id'],
      { id, voteState }: VoteGroup['votes'][number]
    ) => {
      setVotesMap((prevVotesMap) => {
        const newVotesMap = structuredClone(prevVotesMap)

        const groupIndex = newVotesMap.findIndex(
          (group) => group.id === groupId
        )
        const voteIndex = newVotesMap[groupIndex].votes.findIndex(
          (vote) => vote.id === id
        )
        newVotesMap[groupIndex].votes[voteIndex].voteState =
          voteState === 0 ? 1 : 0

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newVotesMap))
        return newVotesMap
      })
    },
    []
  )

  const clearVotes = useCallback(() => {
    setVotesMap(initialVoteGroups)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialVoteGroups))
  }, [])

  return { votesMap, addVote, toggleVote, clearVotes }
}
