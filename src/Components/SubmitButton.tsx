import React from 'react'
import { Button } from 'antd'

import { connect } from 'react-redux'

const SubmitButton = (props: any, onClick: any) => {
  //   const { onClose, openNotification } = props
  const { name } = props
  console.log(props)
  console.log(onClick)
  //   console.log(name)
  return (
    <Button
      onClick={() => {
        // onClose()
        // openNotification()
        // console.log('onsubmit ', name)
      }}
      type="primary"
    >
      Submit
    </Button>
  )
}

const mapStateToProps = (state: any) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(SubmitButton)
// export default SubmitButton
