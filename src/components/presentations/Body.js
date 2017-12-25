import React from 'react'
import Body1 from './Body1'

const Body = ({selected_function, show_hided_issue, issue_rows, onCheck, onToggleHide}) => {

  const _issue_rows = show_hided_issue ? issue_rows : issue_rows.filter(issue_row => issue_row.hide === false)

  switch (selected_function) {
    case '0': {return <div></div>}
    case '1': {return <Body1 issue_rows={_issue_rows} onToggleHide={onToggleHide} onCheck={id => onCheck(id)} />}
    case '2': {return <div>要員別山積表</div>}
    case '3': {return <div>要員別集計情報</div>}
    default: {return <div></div>}
  }

}

export default Body
