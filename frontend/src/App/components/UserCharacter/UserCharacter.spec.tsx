import * as React from 'react'
import UserCharacter from './UserCharacter'
import { render } from '@testing-library/react'

describe('UserCharacter', () => {
  const props = {}
  describe('render', () => {
    it('renders', () => {
        const { queryByText } = render(<UserCharacter {...props} />)
    })
  })
})
