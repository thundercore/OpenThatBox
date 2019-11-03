import * as React from 'react'
import Game from './GameMap'
import { render } from '@testing-library/react'

describe('Game', () => {
  const props = {}
  describe('render', () => {
    it('renders', () => {
      const { queryByText } = render(<Game {...props} />)
    })
  })
})
