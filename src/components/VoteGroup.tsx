import { VoteContainer } from './VoteContainer'
import { UpVote } from './UpVote'
import { Button } from './Button'

import buttonClasses from './button.module.css'
import addIcon from '../assets/add.svg?raw'
import { useVoteActions } from '../hooks/useVoteActions'

import type { VoteGroup } from '../types'

type Actions = {
  addVote: ReturnType<typeof useVoteActions>['addVote']
  toggleVote: ReturnType<typeof useVoteActions>['toggleVote']
}

interface VoteGroupProps {
  group: VoteGroup
  actions: Actions
}

export function VoteGroup({ group, actions }: VoteGroupProps) {
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
            onClick={() => actions.addVote(group.id)}
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
            onClick={() =>
              actions.toggleVote(group.id, { id: voteId, voteState })
            }
          />
        ))}
      </VoteContainer>
    </>
  )
}
