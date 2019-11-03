import * as React from 'react'
import App from './App'
import { render } from '@testing-library/react'

describe('App', () => {
  const props = {}
  describe('render', () => {
    it('renders', () => {
        const { queryByText } = render(<App {...props} />)
    })
  })
})
