import { VoteContainer } from './VoteContainer'
import { UpVote } from './UpVote'
import { Button } from './Button'
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
    <div className="flex-row">
      <VoteContainer key={group.id}>
        {group.votes.map(({ id: voteId, voteState }) => (
          <UpVote
            voteId={voteId}
            voteState={voteState}
            groupId={group.id}
            onClick={() =>
              actions.toggleVote(group.id, { id: voteId, voteState })
            }
          />
        ))}
      </VoteContainer>
      <Button
        svg={addIcon}
        label="Add Vote"
        onClick={() => actions.addVote(group.id)}
        className="align-self-center"
      />
    </div>
  )
}
