import React from 'react'
import { Link } from 'react-router-dom'

const MemberList = () => {
  const styles = {
    path: {
      margin: 12,
      fontSize: 12,
      color: "#9E9E9E",
    }
  }
  return(<div style={styles.path} ><Link to={`/`}>Home</Link> > 要員別山積表</div>)
}

export default MemberList
