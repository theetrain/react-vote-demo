import { VoteContainer } from './VoteContainer'
import { UpVote } from './UpVote'
import { Button } from './Button'
import addIcon from '../assets/add.svg?raw'
import { useVoteActions } from '../hooks/useVoteActions'

interface VoteGroupProps {
  group: string
}

export function VoteGroup({ group }: VoteGroupProps) {
  const { addVote, votesMap } = useVoteActions()

  if (!votesMap[group]) {
    return <div>No votes available for this group.</div>
  }

  return (
    <>
      <VoteContainer key={group}>
        {votesMap[group].map(({ key, voteState }) => (
          <UpVote
            key={key}
            voteState={voteState}
            group={group} // Pass the group prop
          />
        ))}
      </VoteContainer>
      <Button
        svg={addIcon}
        label="Add Vote"
        onClick={() => addVote(group)}
        className="align-self-center"
      />
    </>
  )
}
