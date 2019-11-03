import * as React from 'react'
import Web3Loader from './Web3Loader'
import { render } from '@testing-library/react'

describe('Web3Loader', () => {
  const props = {}
  describe('render', () => {
    it('renders', () => {
        const { queryByText } = render(<Web3Loader {...props} />)
    })
  })
})
