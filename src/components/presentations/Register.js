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
        ankenno: value
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
    const id = this.props.group_users[key].id
    this.setState({
      register_form: {
        ...this.state.register_form,
        assigned: id
      }
    })
  }

  //required check
  required = value => value === "" ? "This field is required." : ""
  allRequired = form => {
    return (
      form.ankenno      === "" ||
      form.naibukanrino === "" ||
      form.title        === "" ||
      form.assigned     === ""
    )
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
            errorText={this.required(this.state.register_form.ankenno)}
          /><br />
          <TextField
            floatingLabelText="内部管理番号"
            onChange={this.onChange2}
            errorText={this.required(this.state.register_form.naibukanrino)}
          /><br />
          <TextField
            floatingLabelText="案件名称"
            onChange={this.onChange3}
            errorText={this.required(this.state.register_form.title)}
          /><br />
          <SelectField
            floatingLabelText="主担当"
            value={this.state.register_form.assigned}
            onChange={this.onChange4}
            errorText={this.required(this.state.register_form.assigned)}
          >
            {this.props.group_users.map(group_user => <MenuItem value={group_user.id} primaryText={group_user.name} />)}
          </SelectField><br />
          <Link to='/issue'>
            <FlatButton
              label="Cancel"
              primary={false}
            />
          </Link>
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.onClick1}
              disabled={this.allRequired(this.state.register_form)}
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
