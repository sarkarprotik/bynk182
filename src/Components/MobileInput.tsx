import React, { useState } from 'react'
import { connect } from 'react-redux'

import * as actionTypes from '../Redux/actions'

import { Input, Form } from 'antd'

const MobileInput = (props: any) => {
  const [value, setValue] = useState('')
  const [isValid, setIsValid] = useState(false)

  const { mobile, setMobile } = props

  isValid ? setMobile(value) : setMobile('')
  console.log('redux', mobile)

  const validatePhoneNr = (number: any) => {
    if (number.length === 10) {
      console.log(`${number} is Valid`)
      setIsValid(true)
      //   setPhoneNr(number);
    } else {
      //   setPhoneNr("");
      setIsValid(false)
      console.log(`${number} is NOT Valid`)
    }
  }

  const handleInput = (e: any) => {
    e.preventDefault()
    let input = e.target.value
    setValue(input)
    validatePhoneNr(input)
  }
  const warning = (
    <Form>
      <Form.Item validateStatus={'warning'} help={'Use a valid Phone Number'}>
        <Input onChange={e => handleInput(e)} placeholder="0700510492" value={value} />
      </Form.Item>
    </Form>
  )

  const success = (
    <Form>
      <Form.Item validateStatus={'success'} hasFeedback help={''}>
        <Input onChange={e => handleInput(e)} placeholder="0700510492" value={value} />
      </Form.Item>
    </Form>
  )

  const emptyInput = (
    <Form>
      <Form.Item validateStatus={'success'} help={''}>
        <Input onChange={e => handleInput(e)} placeholder="0700510492" value={value} />
      </Form.Item>
    </Form>
  )
  return <Form>{value.length === 0 ? emptyInput : isValid ? success : warning}</Form>
}

const mapStateToProps = (state: any) => {
  return {
    ...state,
    mobile: state.mobile
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMobile: (value: any) => dispatch({ type: actionTypes.SET_MOBILE, mobile: value })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileInput)
