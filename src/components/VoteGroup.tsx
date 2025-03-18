import { VoteContainer } from './VoteContainer'
import { UpVote } from './UpVote'
import { Button } from './Button'

import buttonClasses from './button.module.css'
import addIcon from '../assets/add.svg?raw'
import { useVoteActions } from '../hooks/useVoteActions'

import type { VoteGroup } from '../types'
import { useState } from 'react'

type Actions = {
  addVote: ReturnType<typeof useVoteActions>['addVote']
  toggleVote: ReturnType<typeof useVoteActions>['toggleVote']
}

interface VoteGroupProps {
  group: VoteGroup
  actions: Actions
}

export function VoteGroup({ group, actions }: VoteGroupProps) {
  function addVote() {
    actions.addVote(group.id)
  }

  if (!group.votes) {
    return <div>No votes available for this group.</div>
  }

  return (
    <>
      <VoteContainer
        key={group.id}
        actionButton={
          <Button
            svg={addIcon}
            label="Add Vote"
            onClick={addVote}
            className={`align-self-start ${buttonClasses.addButton}`}
          />
        }
      >
        {group.votes.map(({ id: voteId, voteState }) => (
          <UpVote
            key={voteId}
            voteId={voteId}
            voteState={voteState}
            groupId={group.id}
            toggleVote={actions.toggleVote}
          />
        ))}
      </VoteContainer>
    </>
  )
}
