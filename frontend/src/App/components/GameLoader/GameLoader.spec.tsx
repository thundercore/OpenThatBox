import * as React from 'react'
import GameLoader from './GameLoader'
import { render } from '@testing-library/react'

describe('GameLoader', () => {
  const props = {}
  describe('render', () => {
    it('renders', () => {
        const { queryByText } = render(<GameLoader {...props} />)
    })
  })
})
