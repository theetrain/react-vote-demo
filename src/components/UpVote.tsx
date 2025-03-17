import { Button } from './Button'

import arrowUp from '../assets/arrow-up.svg?raw'
import check from '../assets/check.svg?raw'
import classes from './upvote.module.css'

interface UpVoteProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Parent group ID */
  groupId: string
  /** 0: default, 1: upvoted */
  voteState: number
  /** Unique vote ID */
  voteId: string
}

export function UpVote({ groupId, voteId, voteState, ...rest }: UpVoteProps) {
  const upvoted = voteState === 1
  const label = upvoted ? 'Upvoted' : 'Upvote'

  return (
    <Button
      className={upvoted ? classes.upvoted : classes.default}
      aria-pressed={upvoted}
      {...rest}
      svg={arrowUp}
      label={label}
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
