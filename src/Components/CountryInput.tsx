import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import * as actionTypes from '../Redux/actions'

import { Form, Select } from 'antd'

const { Option } = Select

const CountryInput = (props: any) => {
  const [value, setValue] = useState([])

  const { country, setCountry } = props

  const request = async () => {
    const response = await fetch('https://restcountries.eu/rest/v2/all')
    const json = await response.json()
    let countryList = json.map((c: any) => c.name)
    setValue(countryList)
  }

  useEffect(() => {
    request()
  }, [])

  const handleChange = (e: any) => {
    setCountry(e)
  }

  const emptyInput = (
    <Form>
      <Form.Item validateStatus={''} help={''}>
        <Select defaultValue="" onChange={handleChange} placeholder="Select a Country">
          {value.map((country: any) => {
            return (
              <Option key={country} value={country}>
                {country}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
    </Form>
  )

  const success = (
    <Form>
      <Form.Item validateStatus={'success'} hasFeedback help={''}>
        <Select defaultValue="" onChange={handleChange} placeholder="Select a Country">
          {value.map((country: any) => {
            return <Option value={country}>{country}</Option>
          })}
        </Select>
      </Form.Item>
    </Form>
  )

  return value.length === 0 ? emptyInput : success
  // return success
}

const mapStateToProps = (state: any) => {
  return {
    ...state,
    country: state.country
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCountry: (value: any) => dispatch({ type: actionTypes.SET_COUNTRY, country: value })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryInput)
