import * as React from 'react'
import CanvasGame from './CanvasGame'
import { render } from '@testing-library/react'

describe('CanvasGame', () => {
  const props = {}
  describe('render', () => {
    it('renders', () => {
        const { queryByText } = render(<CanvasGame {...props} />)
    })
  })
})
