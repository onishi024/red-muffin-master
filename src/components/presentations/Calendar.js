import React, { Component } from 'react'
//Material UI関連
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
  FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { MuiThemeProvider as V1MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
//React Router関連
import { Link } from 'react-router-dom'
//React Big Calendar関連
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

export default class Calendar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      time_entries: [],
      checked: this.props.group_users.reduce(
        (accumulator, currentValue) => {
          const currentObj = {[currentValue.id] : true}
          return {...accumulator, ...currentObj}
        }, 0
      )
    }
  }

  componentDidMount() {
    //eventを設定
    this.props.getTimeEntries()
    //選択中のグループのメンバーの実績のみに抽出
    .then(time_entries => {
      const time_entries_processed = []
      time_entries.filter(time_entry =>
        this.props.group_users.find(group_user => time_entry.user.id === group_user.id)
      )
      //ユーサid, 作業日, 登録日時でsort
      .sort((a, b) => {
        a.user.id > b.user.id ? 1 : -1
        a.spent_on > b.spent_on ? 1 : -1
        a.created_on > b.created_on ? 1 : -1
      })
      //作業開始時間("start"), 作業終了時間("end")プロパティを追加、9時で初期化
      .map(time_entry => {
        const _start = new Date(new Date(time_entry.spent_on).setHours(9))
        const _end = new Date(new Date(time_entry.spent_on).setHours(9+time_entry.hours))
        return {...time_entry, "start": _start, "end": _end}
      })
      //前レコードと比較して同ユーザid, 同作業日なら作業開始時間を作業時間分後ろ倒し
      .reduce((pre, cur) => {
        if (pre.user.id === cur.user.id && pre.spent_on === cur.spent_on){
          cur.start = new Date(new Date(cur.spent_on).setHours(pre.start.getHours()+pre.hours))
          cur.end = new Date(new Date(cur.spent_on).setHours(cur.start.getHours()+cur.hours))
        }
        time_entries_processed.push(cur)
        return cur
      }, {user: {id: ""}, spent_on: ""})
      return time_entries_processed
    })
    //stateにsetする
    .then(time_entries => {
      this.setState({time_entries})
    })
  }

  handleChange = id => event => {
    const checked = this.state.checked
    checked[id] = event.target.checked
    this.setState({checked})
  }

  getEvents = () => {
    if (this.state.time_entries.length === 0){
      return []
    } else {
      return this.state.time_entries.filter(time_entry => {
        return this.state.checked[String(time_entry.user.id)]
      })
      .map(time_entry => {
        const _start = time_entry.start
        const _end = new Date(new Date(time_entry.spent_on).setHours(_start.getHours()+time_entry.hours))
        return {
          start: time_entry.start,
          end: time_entry.end,
          title: "#"+time_entry.issue.id+" "+time_entry.activity.name,
          user: time_entry.user.name
        }
      })
    }
  }

  render() {
    return(
      <div>
        <div style={this.styles.path} ><Link to={`/`}>Home</Link> > 実績カレンダー</div>
        <V1MuiThemeProvider theme={createMuiTheme()}>
          <div style={this.styles.block}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                表示するメンバー
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <FormGroup row>
                  {this.props.group_users.map(group_user => {
                    return (
                      <FormControlLabel
                        key={group_user.id}
                        control={
                          <Checkbox
                            checked={this.state.checked[group_user.id]}
                            onChange={this.handleChange(group_user.id)}
                            value={group_user.name}
                            />
                        }
                        label={group_user.name}
                        />
                    )})
                  }
                </FormGroup>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <BigCalendar
              defaultDate={new Date()}
              defaultView="month"
              events={this.getEvents()}
              style={this.styles.calendar}
              />
          </div>
        </V1MuiThemeProvider>
      </div>
    )
  }

  //styles
  styles = {
    toolbar: {
      position: "fixed",
    },
    path: {
      top: 60,
      left: 0,
      height: 30,
      width: '100%',
      padding: "20px 10px 10px 10px",
      backgroundColor: "#FFFFFF",
      zIndex: 999,
      position: "fixed",
      fontSize: 12,
      color: "#9E9E9E",
    },
    block: {
      padding: "120px 10px 10px 10px",
      fontSize: 12,
    },
    checkbox: {
      marginBottom: 12,
    },
    calendar: {
      padding: "10px 10px 10px 10px",
      height: "800px",
      width: "100%",
    },
  }
}
