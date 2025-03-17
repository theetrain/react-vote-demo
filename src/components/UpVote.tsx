import { Button } from './Button'
import arrowUp from '../assets/arrow-up.svg?raw'
import classes from './upvote.module.css'
import { useVoteActions } from '../hooks/useVoteActions'

interface UpVoteProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 0: default, 1: upvoted */
  voteState: number
  group: string
  key: string
}

export function UpVote({ voteState, group, key, ...rest }: UpVoteProps) {
  const { toggleVote } = useVoteActions()
  const label = voteState === 1 ? 'Upvoted' : 'Upvote'

  const handleClick = () => {
    toggleVote(group, { key, voteState })
  }

  return (
    <Button
      className={voteState === 1 ? classes.upvoted : classes.default}
      {...rest}
      svg={arrowUp}
      label={label}
      onClick={handleClick}
    />
  )
}
