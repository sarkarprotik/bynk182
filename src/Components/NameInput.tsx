import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Input, Form } from 'antd'
import * as actionTypes from '../Redux/actions'

const NameInput = (props: any) => {
  const [value, setValue] = useState('')
  const [isValid, setIsValid] = useState(false)

  const { name, setName } = props

  isValid ? setName(value) : setName('')

  console.log('reduxx', name)

  const validateName = (name: string) => {
    if (!/[^a-zA-ZöäåÖÄÅ\s]/.test(name)) {
      console.log(`${name} is Valid`)
      setIsValid(true)
    } else {
      console.log(`${name} is NOT Valid`)
      setIsValid(false)
    }
  }

  const handleInput = (e: any) => {
    e.preventDefault()
    let input = e.target.value
    setValue(input)
    validateName(input)
  }

  const warning = (
    <Form>
      <Form.Item validateStatus={'warning'} help={'Name has invalid Characters'}>
        <Input
          onChange={e => handleInput(e)}
          placeholder="please enter url description"
          value={value}
        />
      </Form.Item>
    </Form>
  )

  const success = (
    <Form>
      <Form.Item validateStatus={'success'} hasFeedback help={''}>
        <Input
          onChange={e => handleInput(e)}
          placeholder="please enter url description"
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
          placeholder="please enter url description"
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
    name: state.name
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setName: (value: any) => dispatch({ type: actionTypes.SET_NAME, name: value })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameInput)
