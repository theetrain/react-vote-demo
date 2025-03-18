import '@testing-library/jest-dom/vitest'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UpVote } from './UpVote'
import { useVoteActions } from '../hooks/useVoteActions'

describe('UpVote', () => {
  it('toggles vote state on click', async () => {
    const user = userEvent.setup()

    const toggleVote: ReturnType<typeof useVoteActions>['toggleVote'] = (
      groupId,
      { id, voteState }
    ) => {
      return voteState === 0 ? 1 : 0
    }
    const { getByRole } = render(
      <UpVote
        groupId="abc123"
        toggleVote={toggleVote}
        voteId="zxy321"
        voteState={0}
      />
    )
    const button = getByRole('button')
    await user.tab()
    expect(button).toHaveFocus()

    // Initial state should be unvoted
    expect(button.getAttribute('aria-pressed')).toBe('false')
    expect(button).toHaveTextContent('Upvote')

    // Click the button
    await user.keyboard('[Space]')
    expect(button.getAttribute('aria-pressed')).toBe('true')
    expect(button).toHaveTextContent('Upvoted')

    // Click again to unvote
    await user.keyboard('[Enter]')
    expect(button.getAttribute('aria-pressed')).toBe('false')
    expect(button).toHaveTextContent('Upvote')
  })
})
