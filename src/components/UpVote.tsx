import { Button } from './Button'

import arrowUp from '../assets/arrow-up.svg?raw'
import check from '../assets/check.svg?raw'
import classes from './upvote.module.css'
import { useState } from 'react'
import { useVoteActions } from '../hooks/useVoteActions'

interface UpVoteProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Parent group ID */
  groupId: string
  /** 0: default, 1: upvoted */
  voteState: number
  /** Unique vote ID */
  voteId: string
  toggleVote: ReturnType<typeof useVoteActions>['toggleVote']
}

export function UpVote({
  groupId,
  voteId,
  voteState,
  toggleVote,
  ...rest
}: UpVoteProps) {
  const [vote, setVote] = useState(voteState)
  const upvoted = vote === 1
  const label = upvoted ? 'Upvoted' : 'Upvote'

  return (
    <Button
      className={upvoted ? classes.upvoted : classes.default}
      aria-pressed={upvoted}
      {...rest}
      svg={arrowUp}
      label={label}
      onClick={() => {
        const newVote = toggleVote(groupId, { id: voteId, voteState: vote })
        setVote(newVote)
      }}
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
