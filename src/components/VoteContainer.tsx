import classes from './vote-container.module.css'

export interface VoteContainerProps {
  children: React.ReactNode
}

export function VoteContainer({ children }: VoteContainerProps) {
  return (
    <div className="flex-row">
      <div
        style={{ '--gap': '6px' }}
        className={classes.container + ' flex-row flex-wrap'}
      >
        {children}
      </div>
    </div>
  )
}
