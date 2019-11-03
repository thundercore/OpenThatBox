import * as React from 'react'
import Blockie from './Blockie'
import { render } from '@testing-library/react'

describe('Blockie', () => {
  const props = {}
  describe('render', () => {
    it('renders', () => {
        const { queryByText } = render(<Blockie {...props} />)
    })
  })
})
