import React, { useState } from 'react'
import Logo from './Assets/code.svg'

import './App.css'
import MainComponent from './MainComponent'

const App: React.FC = () => {
  const [width] = useState(window.innerWidth)
  return (
    <>
      <div className="body1">
        <img
          alt={'Coding Logo'}
          style={{
            width: width * 0.25,
            height: 'auto',
            borderRadius: 20,
            justifyContent: 'flex-end'
          }}
          src={Logo}
        />
        <MainComponent />
      </div>
    </>
  )
}

export default App
