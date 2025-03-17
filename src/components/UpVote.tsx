import { Button } from './Button'
import { useVoteActions } from '../hooks/useVoteActions'

import arrowUp from '../assets/arrow-up.svg?raw'
import check from '../assets/check.svg?raw'
import classes from './upvote.module.css'

interface UpVoteProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 0: default, 1: upvoted */
  group: string
  voteKey: string
}

export function UpVote({ group, voteKey, ...rest }: UpVoteProps) {
  const { toggleVote, votesMap } = useVoteActions()
  const voteState =
    votesMap?.[group]?.find((vote) => vote.key === voteKey)?.voteState || 0
  const upvoted = voteState === 1
  const label = upvoted ? 'Upvoted' : 'Upvote'

  console.log('upvote', { group, key: voteKey, voteState })

  function handleClick() {
    toggleVote(group, { key: voteKey, voteState })
    console.log('toggle vote')
  }

  return (
    <Button
      className={upvoted ? classes.upvoted : classes.default}
      aria-pressed={upvoted}
      {...rest}
      svg={arrowUp}
      label={label}
      onClick={handleClick}
    >
      {upvoted && (
        <span
          className={classes.check}
          dangerouslySetInnerHTML={{ __html: check }}
        ></span>
      )}
    </Button>
  )
}
