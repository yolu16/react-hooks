// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonErrorBoundary, fetchPokemon, PokemonForm, PokemonDataView, PokemonInfoFallback} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  // const [pokemon, setPokemon] = React.useState(null)
  // const [status, setStatus] = React.useState('idle')
  const [{status, pokemon}, setState] = React.useState({status: 'idle'})
  const [error, setError] = React.useState(null)

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  React.useEffect(() => {
    console.log('effect run')
    if(!pokemonName){
      return
    }
    //setPokemon(null)
    setState({status:'pending', pokemon: null})
    setError(null)
    //setStatus('pending')
    // fetchPokemon(pokemonName).then(
    //   pokemonData => {
    //     console.log({...pokemonData})
    //     setPokemon(pokemonData)
    //   }
    // )
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({status:'resolved', pokemon})
        // setPokemon(pokemon)
        // setStatus('resolved')
      },
      error => {
        setError(error)
        setState({status:'rejected'})
        // setStatus('rejected')
      },
    )
  }, [pokemonName, setError])
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remove this

  if(status === 'idle'){
    return 'Submit a pokemon'
  }

  if (status === 'pending'){
    return <PokemonInfoFallback name={pokemonName} />
  }

  if (status === 'rejected'){
    // setPokemonName(null)
    throw error
    // return <div role="alert">
    //     There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    //   </div>
  }

  if (status === 'resolved'){
    return <PokemonDataView pokemon={pokemon} />
  }

  // return (!pokemonName ? 'Sumbit a pokemon' : (
  //   !pokemon ? <PokemonInfoFallback name={pokemonName} /> : 
  //   <PokemonDataView pokemon={pokemon} />
  // ))
}
// function App(){
//   return <PokemonErrorBoundary><PokemonApp /></PokemonErrorBoundary>
// }
function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function onReset(){
    setPokemonName('')
  }

  return ( 
      <div className="pokemon-info-app">
        <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
        <hr />

        <div className="pokemon-info">
        <PokemonErrorBoundary resetKeys={[pokemonName]} onReset={onReset}>
          <PokemonInfo pokemonName={pokemonName}/>
          </PokemonErrorBoundary>
        </div>

      </div>
  )
}

export default App
