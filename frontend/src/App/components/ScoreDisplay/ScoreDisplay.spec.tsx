import * as React from 'react'
import ScoreDisplay from './ScoreDisplay'
import { render } from '@testing-library/react'

describe('ScoreDisplay', () => {
  const props = {}
  describe('render', () => {
    it('renders', () => {
        const { queryByText } = render(<ScoreDisplay {...props} />)
    })
  })
})
