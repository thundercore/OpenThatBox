import React from 'react'
import ReactDOM from 'react-dom'
import App from './App/components/App/App'
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline'
import { unregister } from './serviceWorker'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'

ReactDOM.render(
  <MuiThemeProvider
    theme={createMuiTheme({
      palette: {
        background: {
          default: '#edeceb',
        },
        primary: {
          main: '#ffe81c',
        },
      },
    })}
  >
    <CssBaseline>
      <App />
    </CssBaseline>
  </MuiThemeProvider>,
  document.getElementById('root')
)

unregister()
