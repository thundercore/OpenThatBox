import * as React from 'react'
import GameContainer from './GameContainer'
import { render } from '@testing-library/react'

describe('GameContainer', () => {
  const props = {}
  describe('render', () => {
    it('renders', () => {
      const { queryByText } = render(<GameContainer {...props} />)
    })
  })
})
