import React, { useState } from 'react'

import { connect } from 'react-redux'

import { Input, Form } from 'antd'
import * as actionTypes from '../Redux/actions'

const personnummer = require('personnummer')

const SsnInput = (props: any) => {
  const [value, setValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const { ssn, setSsn } = props

  isValid ? setSsn(value) : setSsn('')
  console.log('reduxx', ssn)

  const validateSSN = (ssn: number) => {
    if (personnummer.valid(ssn)) {
      //   setSSN(ssn); this is going to redux
      setIsValid(true)
      console.log(`${ssn} is valid`)
    } else {
      //   setSSN('') redux
      setIsValid(false)
      console.log(`${ssn} is NOT valid`)
    }
  }
  const handleInput = (e: any) => {
    e.preventDefault()
    let input = e.target.value
    setValue(input)
    validateSSN(input)
  }
  const warning = (
    <Form>
      <Form.Item validateStatus={'error'} help={'Use this format: ÅÅÅÅMMDDNNNN'}>
        <Input onChange={e => handleInput(e)} placeholder="ÅÅÅMMDDNNNN" value={value} />
      </Form.Item>
    </Form>
  )

  const success = (
    <Form>
      <Form.Item validateStatus={'success'} hasFeedback help={''}>
        <Input onChange={e => handleInput(e)} placeholder="ÅÅÅÅMMDDNNNN" value={value} />
      </Form.Item>
    </Form>
  )

  const emptyInput = (
    <Form>
      <Form.Item validateStatus={'success'} help={''}>
        <Input onChange={e => handleInput(e)} placeholder="ÅÅÅÅMMDDNNNN" value={value} />
      </Form.Item>
    </Form>
  )
  return <Form>{value.length === 0 ? emptyInput : isValid ? success : warning}</Form>
}

const mapStateToProps = (state: any) => {
  return {
    ...state,
    ssn: state.ssn
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSsn: (value: any) => dispatch({ type: actionTypes.SET_SSN, ssn: value })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SsnInput)
