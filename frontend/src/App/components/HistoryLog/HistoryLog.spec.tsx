import * as React from 'react'
import HistoryLog from './HistoryLog'
import { render } from '@testing-library/react'

describe('HistoryLog', () => {
  const props = {}
  describe('render', () => {
    it('renders', () => {
        const { queryByText } = render(<HistoryLog {...props} />)
    })
  })
})
