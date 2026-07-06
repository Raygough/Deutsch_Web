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
    <div className="bg-gray-500 w-100% h-10">
      <nav>
        <div>
          <button className="hover:bg-gray-500" onClick={() => "/"}>Back</button>
          <h3>Practice</h3>
        </div>
      </nav>
    </div>
    <div className='text-6xl p-10 align-center'>
      <h1>Hey Ray, let's start a new session: </h1>
      <select onChange={(e) => setCategory(e.target.value)}
      name="categories" id="categories">
        <option value="nouns">Nouns</option>
        <option value="verbs">Verbs</option>
        <option value="adjectives">Adjectives</option>
      </select>
      <input onChange={(e) => setRounds(parseInt(e.target.value))}
      type="text" placeholder='enter how many questions you want to answer'/>
      <button className="p-10" onClick={() => validate()}>Continue</button>
    </div>
    </>
  )
}

function SessionScreen ({ word } : 
  {word: {word: string, meaning: string,
    gender: string | null,
    category: string} | null}) {
      const [input, setInput] = useState("")
      const [valid, setValid] = useState("idle")

      function checkValid() {
        if(input.toLowerCase() == word?.meaning.toLowerCase()){
          setValid("correct")
        } else {
          setValid("invalid")
        }
      }

      let feedback = null
      if(valid == "idle"){
        feedback = null
      } else if(valid == "correct"){
        feedback = <h1>Richtig! {word?.word} means {input} </h1>
      } else {
        feedback = <h1>Falsch! {word?.word} does not mean {input}. It means
         {word?.meaning}</h1>
      }

  return (
    <>
    <div className="bg-grey-500">
      <p>What does {word?.word} mean?</p>
      <input onChange={(e) => setInput(e.target.value)} type="text" />
      <button onClick={() => checkValid()}>Check</button>
    </div>
    <div>
      {feedback}
    </div>
    </>
  )
}


export default PracticePage
