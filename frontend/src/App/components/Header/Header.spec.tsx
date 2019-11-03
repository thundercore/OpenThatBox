import * as React from 'react'
import Header from './Header'
import { render } from '@testing-library/react'

describe('Header', () => {
  const props = {}
  describe('render', () => {
    it('renders', () => {
        const { queryByText } = render(<Header {...props} />)
    })
  })
})
