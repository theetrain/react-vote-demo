import { Button } from './Button'
import arrowUp from '../assets/arrow-up.svg?inline'

interface UpVoteProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 0: default, 1: upvoted */
  voteState: number
}

export function UpVote({ voteState, ...rest }: UpVoteProps) {
  const label = voteState === 1 ? 'Upvoted' : 'Upvote'

  return <Button {...rest} svg={arrowUp} label={label}></Button>
}
