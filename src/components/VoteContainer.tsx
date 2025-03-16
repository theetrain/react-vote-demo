import { Button } from './Button'
import { UpVote } from './UpVote'
import classes from './vote-container.module.css'
import addIcon from '../assets/add.svg?inline'
import { Vote } from '../types'

export interface VoteContainerProps {
  votes: Vote[]
  onAddVote: () => void
  onVote: (vote: Vote) => void
}

export function VoteContainer({
  votes,
  onAddVote,
  onVote,
}: VoteContainerProps) {
  return (
    <div className="flex-row">
      <div
        style={{ '--gap': '6px' }}
        className={classes.container + ' flex-row flex-wrap'}
      >
        {votes.map(({ key, voteState }) => (
          <UpVote
            key={key}
            voteState={voteState}
            onClick={() => onVote({ key, voteState })}
          />
        ))}
      </div>
      <Button
        svg={addIcon}
        label="Add Vote"
        onClick={onAddVote}
        className="align-self-center"
      />
    </div>
  )
}
