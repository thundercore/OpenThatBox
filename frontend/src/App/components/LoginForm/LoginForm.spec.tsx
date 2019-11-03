import * as React from 'react'
import LoginForm from './LoginForm'
import { render } from '@testing-library/react'

describe('LoginForm', () => {
  const props = {}
  describe('render', () => {
    it('renders', () => {
        const { queryByText } = render(<LoginForm {...props} />)
    })
  })
})
