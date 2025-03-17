export type Vote = { voteState: number; id: string }

export type VoteGroup = {
  label: string
  id: string
  votes: Vote[]
}
