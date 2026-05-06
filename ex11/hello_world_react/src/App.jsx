import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import MultiButton from './cgu_multibutton'
import HelloCGU from './cgu_hello'


function App() {
  return (
    <div className="App">
      <div>
        {HelloCGU()}
      </div>
      <div>
        {MultiButton(10)}
      </div>
    </div>
  )
}

export default App
