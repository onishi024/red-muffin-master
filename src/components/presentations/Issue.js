import React, { Component } from 'react'
import {FlatButton, Dialog, CircularProgress} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Link } from 'react-router-dom'

export default class Issue extends Component {

  constructor(props) {
    super(props)
    this.state = {
      register_form: {
        kind: 0,
        ankenname: "",
        estimate: 0,
        register_processing: false
      }
    }
  }

  onChange1 = (event, key, payload) => {
    this.setState({
      register_form: {
        ...this.state.register_form,
        kind: key
      }
    })
  }

  onChange2 = (event, value) => {
    this.setState({
      register_form: {
        ...this.state.register_form,
        ankenname: value
      }
    })
  }

  onChange3 = (event, value) => {
    this.setState({
      register_form: {
        ...this.state.register_form,
        estimate: value
      }
    })
  }

  onClick1 = event => {
    this.setState({register_processing: true})
  }

  onClick2 = event => {
    this.setState({register_processing: false})
    this.props.onClickRegisterSubmit(this.state.register_form)
  }

  render() {
    const actions = [
      <Link to='/issue'>
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.onClick2}
        />
      </Link>,
    ]

    return (
      <div>
        <p>案件情報編集</p>
        <MuiThemeProvider>
          <Link to='/issue'>
            <FlatButton
              label="Cancel"
              primary={true}
            />
          </Link>
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.onClick1}
            />
            <Dialog
              title="Loading..."
              actions={actions}
              modal={true}
              open={this.state.register_processing}
            >
              <p>This is a mock indicator. Please push SUBMIT to close windows.</p>
              <CircularProgress size={80} thickness={7} />
            </Dialog>
        </MuiThemeProvider>
      </div>
    )
  }

}
