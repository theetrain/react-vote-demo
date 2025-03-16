import { useState, createContext, useContext } from 'react'
import { Button } from './Button'
import { UpVote } from './UpVote'
import classes from './vote-container.module.css'
import addIcon from '../assets/add.svg?inline'

interface VoteContainerProps {
  children?: React.ReactNode
}

const VoteContext = createContext<any>(null)

export function VoteContainer({ children }: VoteContainerProps) {
  const [votes, setVotes] = useState<React.ReactNode[]>([])

  const addVote = () => {
    setVotes([...votes, <UpVote key={votes.length} />])
  }

  return (
    <VoteContext.Provider value={{ addVote }}>
      <div className="flex-row">
        <div className={classes.container}>
          {children}
          {votes}
        </div>
        <Button
          svg={addIcon}
          label="Add Vote"
          onClick={addVote}
          className="align-self-center"
        />
      </div>
    </VoteContext.Provider>
  )
}

export function useVoteContext() {
  return useContext(VoteContext)
}
