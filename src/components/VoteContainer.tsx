import { useState } from 'react'
import { Button } from './Button'
import { UpVote } from './UpVote'
import classes from './vote-container.module.css'
import addIcon from '../assets/add.svg?inline'

const voteGroup = crypto.randomUUID()

type Vote = Array<{ voteState: number; key: string }>

export function VoteContainer() {
  const [votes, setVotes] = useState<Vote>([])

  const addVote = () => {
    const key = crypto.randomUUID()
    setVotes([...votes, { voteState: 0, key }])
  }
  console.log('hello')

  return (
    <div className="flex-row">
      <div
        style={{ '--gap': '6px' }}
        className={classes.container + ' flex-row'}
      >
        {votes.map(({ voteState, key }) => (
          <UpVote key={key} voteState={voteState} />
        ))}
      </div>
      <Button
        svg={addIcon}
        label="Add Vote"
        onClick={addVote}
        className="align-self-center"
      />
    </div>
  )
}
