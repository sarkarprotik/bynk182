import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Input, Form } from 'antd'

import * as actionTypes from '../Redux/actions'

const EmailInput = (props: any) => {
  const [value, setValue] = useState('')
  const [isValid, setIsValid] = useState(false)

  const { email, setEmail } = props

  isValid ? setEmail(value) : setEmail('')
  console.log('reduxx', email)

  const validateEmail = (email: string) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let valid = regEx.test(String(email).toLowerCase())
    console.log(valid)
    if (valid) {
      setIsValid(true)
      // setEmail(value);
    } else {
      setIsValid(false)
      // setEmail('');
    }
  }

  const handleInput = (e: any) => {
    e.preventDefault()
    let input = e.target.value
    setValue(input)
    validateEmail(input)
  }
  const warning = (
    <Form>
      <Form.Item validateStatus={'warning'} help={'Use a valid Email'}>
        <Input onChange={e => handleInput(e)} placeholder="ÅÅÅMMDDNNNN" value={value} />
      </Form.Item>
    </Form>
  )

  const success = (
    <Form>
      <Form.Item validateStatus={'success'} hasFeedback help={''}>
        <Input
          onChange={e => handleInput(e)}
          placeholder="sarkar.protik1@gmail.com"
          value={value}
        />
      </Form.Item>
    </Form>
  )

  const emptyInput = (
    <Form>
      <Form.Item validateStatus={'success'} help={''}>
        <Input
          onChange={e => handleInput(e)}
          placeholder="sarkar.protik1@gmail.com"
          value={value}
        />
      </Form.Item>
    </Form>
  )
  return <Form>{value.length === 0 ? emptyInput : isValid ? success : warning}</Form>
}

const mapStateToProps = (state: any) => {
  return {
    ...state,
    email: state.email
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setEmail: (value: any) => dispatch({ type: actionTypes.SET_EMAIL, email: value })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailInput)
