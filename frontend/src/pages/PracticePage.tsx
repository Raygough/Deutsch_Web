import { useState } from 'react'
import './PracticePage.css'

function PracticePage() {
  const [sessionActive, setSessionActive] = useState(false)
  const [category, setCategory] = useState("")
  const [rounds, setRounds] = useState(1)
  const [word, setWord] = useState(null)

  async function validate() {
    if(category == '' || rounds < 1){
      return false
    }
    const response = await fetch(`http://localhost:8000/word?category=${category}`)
    const data = await response.json()
    setWord(data)
    setSessionActive(true)
  } 
  return (
    <>
    <div>
      {sessionActive ? <SessionScreen word={word}/> : 
      <StartScreen 
      setCategory={setCategory}
      setRounds={setRounds}
      validate={validate}
      />}
    </div>
    </>
  )
}

function StartScreen({validate, setCategory, setRounds}: {
  setCategory: (val: string) => void
  setRounds: (val: number) => void
  validate: () => void
}) {
  return (
    <>
    <div className='p-10 align-center'>
      <h1>Hey Ray, let's start a new session</h1>
      <p>I want to practice nouns for 10 rounds</p>
      <select onChange={(e) => setCategory(e.target.value)}
      name="categories" id="categories">
        <option value="nouns">Nouns</option>
        <option value="verbs">Verbs</option>
        <option value="adjectives">Adjectives</option>
      </select>
      <input onChange={(e) => setRounds(parseInt(e.target.value))}
      type="text" placeholder='enter how many questions you want to answer'/>
      <button onClick={() => validate()}>Continue</button>
    </div>
    </>
  )
}

function SessionScreen ({ word } : 
  {word: {word: string, meaning: string,
    gender: string | null,
    category: string} | null}) {
  return (
    <div className="bg-grey-500">
      <p>What does {word?.word} mean?</p>
      <input type="text" />
    </div>
  )
}

export default PracticePage
