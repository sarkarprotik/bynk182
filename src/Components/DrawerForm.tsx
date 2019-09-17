import React, { useState } from 'react'
import { notification, message, Drawer, Form, Button, Col, Row, Icon } from 'antd'
import NameInput from './NameInput'
import SsnInput from './SsnInput'
import EmailInput from './EmailInput'
import MobileInput from './MobileInput'
import CountryInput from './CountryInput'
import AvatarInput from './AvatarInput'

import { connect } from 'react-redux'

import * as actionTypes from '../Redux/actions'

const openNotification = () => {
  notification.open({
    message: 'Sucess!',
    description: 'A New User has been Created',
    icon: <Icon type="smile" style={{ color: '#9B7DDC' }} />
  })
}

const DrawerForm = (props: any) => {
  const {
    image,
    name,
    setName,
    ssn,
    setSsn,
    mobile,
    setMobile,
    email,
    setEmail,
    country,
    setCountry,
    addUser
  } = props

  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }
  const uniqueID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const handleSubmit = () => {
    const errorMsg = {
      image: 'If you want you can upload a picture!',
      name: 'You must have a Name Right?',
      ssn: 'Did you forget your number?',
      mobile: 'I know you have a Phone',
      email: 'E-Mail cannot be empty',
      country: 'You forgot to select a country'
    }

    const error = (value: string) => {
      message.error(value, 5)
    }

    if (name && ssn && mobile && email && country) {
      let newUser = {
        action: 'Delete',
        id: uniqueID(),
        key: uniqueID(),
        avatar: image,
        name: name,
        ssn: ssn,
        mobile: mobile,
        email: email,
        country: country
      }

      //only use this if there is a storeObj
      if (localStorage.getItem('storeObj') === null) {
        let cleanData = [newUser]
        localStorage.setItem('storeObj', JSON.stringify(cleanData))
      } else {
        let lsData = JSON.parse(localStorage.getItem('storeObj') || '')
        let cleanData = [...lsData, newUser]
        localStorage.setItem('storeObj', JSON.stringify(cleanData))
      }

      onClose()
      openNotification()
      addUser(newUser)

      setName('')
      // setSsn('')
      // setMobile('')
      // setEmail('')
      // setCountry('')
    }
    if (!name) {
      error(`${errorMsg.name}`)
    }
    if (!ssn) {
      error(`${errorMsg.ssn}`)
    }
    if (!mobile) {
      error(`${errorMsg.mobile}`)
    }
    if (!email) {
      error(`${errorMsg.email}`)
    }
    if (!country) {
      error(`${errorMsg.country}`)
    }
  }

  return (
    <div>
      <Button type="primary" onClick={() => showDrawer()}>
        <Icon type="robot" /> Create New User
      </Button>
      <Drawer
        title="Create a new User"
        width={window.innerWidth * 0.4}
        onClose={() => onClose()}
        visible={visible}
      >
        <Form
          onSubmit={() => {
            console.log('Submitted')
          }}
          layout="vertical"
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={24}>
              <AvatarInput />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Name">
                <NameInput />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Social Security No.">
                <SsnInput />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Mobile">
                <MobileInput />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="E-Mail">
                <EmailInput />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Country">
                <CountryInput />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right'
          }}
        >
          <Button
            onClick={() => {
              onClose()
            }}
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSubmit()
            }}
            type="primary"
          >
            Submit
          </Button>
        </div>
      </Drawer>
    </div>
  )
}

const mapStateToProps = (state: any, action: any) => {
  return {
    ...state,
    data: [...state.data, action.addUser]
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    addUser: (object: any) => dispatch({ type: actionTypes.ADD_USER, addUser: object }),
    setName: (value: any) => dispatch({ type: actionTypes.SET_NAME, name: value })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerForm)
