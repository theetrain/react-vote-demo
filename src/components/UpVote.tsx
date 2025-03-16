import { Button } from './Button'
import arrowUp from '../assets/arrow-up.svg?inline'
import classes from './upvote.module.css'
interface UpVoteProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 0: default, 1: upvoted */
  voteState: number
}

export function UpVote({ voteState, ...rest }: UpVoteProps) {
  const label = voteState === 1 ? 'Upvoted' : 'Upvote'

  return (
    <Button
      className={voteState === 1 ? classes.upvoted : classes.default}
      {...rest}
      svg={arrowUp}
      label={label}
    ></Button>
  )
}
