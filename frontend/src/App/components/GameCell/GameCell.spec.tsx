import * as React from 'react'
import GameCell from './GameCell'
import { render } from '@testing-library/react'

describe('GameCell', () => {
  const props = {}
  describe('render', () => {
    it('renders', () => {
        const { queryByText } = render(<GameCell {...props} />)
    })
  })
})
