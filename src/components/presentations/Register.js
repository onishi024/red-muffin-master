import React, { Component } from 'react'
import {TextField, FlatButton, SelectField, MenuItem, Dialog, CircularProgress} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Link } from 'react-router-dom'

export default class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      register_form: {
        ankenno: "",
        naibukanrino: "",
        title: "",
        assigned: "",
        register_processing: false
      }
    }
  }

  styles = {
    path: {
      margin: 12,
      fontSize: 12,
      color: "#9E9E9E",
    }
  }

  //Form入力
  onChange1 = (event, value) => {
    this.setState({
      register_form: {
        ...this.state.register_form,
        ankeno: value
      }
    })
  }
  onChange2 = (event, value) => {
    this.setState({
      register_form: {
        ...this.state.register_form,
        naibukanrino: value
      }
    })
  }
  onChange3 = (event, value) => {
    this.setState({
      register_form: {
        ...this.state.register_form,
        title: value
      }
    })
  }
  onChange4 = (event, key, payload) => {
    this.setState({
      register_form: {
        ...this.state.register_form,
        assigned: key
      }
    })
  }

  //SUBMIT
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
        <div style={this.styles.path} ><Link to={`/`}>Home</Link> > <Link to={`/issue`}>案件一覧</Link> > 案件情報登録</div>
        <MuiThemeProvider>
          <TextField
            floatingLabelText="管理番号"
            onChange={this.onChange1}
          /><br />
          <TextField
            floatingLabelText="内部管理番号"
            onChange={this.onChange2}
          /><br />
          <TextField
            floatingLabelText="案件名称"
            onChange={this.onChange3}
          /><br />
          <SelectField
            floatingLabelText="主担当"
            value={this.state.register_form.assigned}
            onChange={this.onChange4}
          >
            {this.props.group_users.map(group_user => <MenuItem value={group_user.id} primaryText={group_user.name} />)}
          </SelectField><br />
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
