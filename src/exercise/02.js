// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(initialValue, propName){

  const [name, setName] = React.useState(() => {
    console.log('init name')
    let deserialized
    if(typeof initialValue === 'object'){
      deserialized = JSON.parse(window.localStorage.getItem(propName))
    } else{
      deserialized = window.localStorage.getItem(propName)
    }
    return deserialized ?? initialValue
  })

  React.useEffect(()=>{
    let json
    if(typeof name === 'object'){
      json = JSON.stringify(name)
    } else{
      json = name
    }
    window.localStorage.setItem(propName, json)
  },[name, propName])

  return [name, setName]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  // const [name, setName] = React.useState(() => {
  //   console.log('init name')
  //   return window.localStorage.getItem('name') ?? initialName
  // })
  const [name, setName] = useLocalStorageState(initialName, 'name')
  const [test, setTest] = useLocalStorageState({o: '', p: ' ye'}, 'test')

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  // React.useEffect(()=>{
  //   window.localStorage.setItem('name', name)
  // },[name])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
