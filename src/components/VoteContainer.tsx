import classes from './vote-container.module.css'

export interface VoteContainerProps {
  children: React.ReactNode
  actionButton: React.ReactNode
}

export function VoteContainer({ children, actionButton }: VoteContainerProps) {
  return (
    <div className="flex-row">
      <div
        style={{ '--gap': '6px' }}
        className={classes.container + ' flex-row flex-wrap'}
      >
        {children}
      </div>
      {actionButton}
    </div>
  )
}
