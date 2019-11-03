import * as React from 'react'
import GameMap from './GameMap'
import { render } from '@testing-library/react'

describe('GameMap', () => {
  const props = {}
  describe('render', () => {
    it('renders', () => {
        const { queryByText } = render(<GameMap {...props} />)
    })
  })
})
