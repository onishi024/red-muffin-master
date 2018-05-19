import React, { Component } from 'react'
import {TextField, FlatButton, SelectField, MenuItem, Dialog, CircularProgress, List, ListItem} from 'material-ui';
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
        assigned_name: "",
      },
      status: "inputing"
    }
  }

  styles = {
    path: {
      margin: 12,
      fontSize: 12,
      color: "#9E9E9E",
    },
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
    const name = this.props.group_users[key].name
    this.setState({
      register_form: {
        ...this.state.register_form,
        assigned: id,
        assigned_name: name,
      }
    })
  }

  //required check
  required = value => value === "" ? "この項目は必須入力項目です。" : ""
  allRequired = form => {
    return (
      form.ankenno      === "" ||
      form.naibukanrino === "" ||
      form.title        === "" ||
      form.assigned     === ""
    )
  }

  //BOTTUN
  onClickSubmit = event => {
    this.setState({status: "confirming"})
  }
  onClickCancel = event => {
    this.setState({status: "inputting"})
  }
  onClickConfirm = event => {
    this.setState({status: "processing"})
    this.props.onClickRegisterConfirm(this.state.register_form)
  }
  onClickOK = event => {
    this.setState({status: "inputting"})
  }

  render() {
    const actionConfirm = [
      <FlatButton
        label="Cancel"
        primary={false}
        keyboardFocused={true}
        onClick={this.onClickCancel}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        keyboardFocused={true}
        onClick={this.onClickConfirm}
      />,
    ]
    const actionOK = [
      <Link to='/issue'>
        <FlatButton
          label="OK"
          primary={true}
          keyboardFocused={true}
          onClick={this.onClickOK}
        />
      </Link>,
    ]

    return (
      <MuiThemeProvider>
        <div>
          <div style={this.styles.path} ><Link to={`/`}>Home</Link> > <Link to={`/issue`}>案件一覧</Link> > 案件情報登録</div>
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
            {this.props.group_users.map(group_user => <MenuItem key={group_user.id} value={group_user.id} primaryText={group_user.name} />)}
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
            onClick={this.onClickSubmit}
            disabled={this.allRequired(this.state.register_form)}
          />
          <Dialog
            title="以下の内容で登録して良いですか?"
            actions={actionConfirm}
            modal={true}
            open={this.state.status==="confirming"}
          >
            <List>
              <ListItem style={this.styles.listItem} disabled={true} primaryText='管理番号'
                secondaryText={this.state.register_form.ankenno} />
              <ListItem style={this.styles.listItem} disabled={true} primaryText='内部管理番号'
                secondaryText={this.state.register_form.naibukanrino} />
              <ListItem style={this.styles.listItem} disabled={true} primaryText='案件名称'
                secondaryText={this.state.register_form.title} />
              <ListItem style={this.styles.listItem} disabled={true} primaryText='主担当'
                secondaryText={this.state.register_form.assigned_name} />
            </List>
          </Dialog>
          <Dialog
            title="更新処理実行中..."
            modal={true}
            open={this.state.status==="processing" && this.props.isLoading}
          >
            <CircularProgress size={80} thickness={7} />
          </Dialog>
          <Dialog
            title="更新処理が完了しました。"
            actions={actionOK}
            modal={true}
            open={this.state.status==="processing" && !this.props.isLoading}
            >
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}
