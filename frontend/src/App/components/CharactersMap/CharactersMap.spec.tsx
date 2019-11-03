import * as React from 'react'
import CharactersMap from './CharactersMap'
import { render } from '@testing-library/react'

describe('CharactersMap', () => {
  const props = {}
  describe('render', () => {
    it('renders', () => {
        const { queryByText } = render(<CharactersMap {...props} />)
    })
  })
})
