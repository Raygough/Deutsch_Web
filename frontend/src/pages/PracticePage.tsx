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
    <div>
        <div className="bg-[#d6a022] font-[Optima] w-100% h-10 flex justify-between items-center text-white p-5">
          <button className="hover:bg-gray-600" onClick={() => "/"}>Back</button>
          <h3>Deutsch Learner</h3>
          <h3>Practice</h3>
        </div>
        <div className='mt-5 p-5'>
          <h1 className="font-mono text-3xl text-[#1A1A1A] mb-2">Hey Ray,</h1>
          <p className="text-gray-500 mb-8 text-sm">Let's start a new practice session</p>
          <select onChange={(e) => setCategory(e.target.value)}
          name="categories" id="categories" className="w-full border border-gray-200 rounded px-3 py-2 mb-4 text-sm focus:outline-none focus:border-[#3B5B8C]">
            <option value="nouns">Nouns</option>
            <option value="verbs">Verbs</option>
            <option value="adjectives">Adjectives</option>
          </select>
          <input onChange={(e) => setRounds(parseInt(e.target.value))}
          type="text" className="w-full border border-gray-200 rounded px-3 py-2 mb-6 text-sm focus:outline-none focus:border-[#3B5B8C]" placeholder='enter how many questions you want to answer'/>
          <button className="bg-[#f59342] hover:bg-[#db833b] text-white text-sm px-6 py-2 rounded" onClick={() => validate()}>Continue</button>
        </div>
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
        feedback = <h1 className='font-serif m-10 text-green-500'>Richtig! <span className='text-xl uppercase border-b border-black'>{word?.word}</span> means {input} </h1>
      } else {
        feedback = <h1 className='font-serif m-10 text-red-500'>Falsch! <span className='text-xl uppercase border-b border-black'>{word?.word}</span> does not mean <span className='text-xl uppercase border-b border-black'>{input}</span>, It means <span className='text-xl uppercase border-b border-black'>{word?.meaning}</span></h1>
      }

  return (
    <>
    <nav className='p-3'>
        <button className="bg-gray-500 hover:bg-gray-900">Exit Session</button>
    </nav>
    <div className="m-10 content-center">
      <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">What does this mean?</p>
      <h1 className="font-serif text-5xl text-[#1A1A1A] mb-10">{word?.word}</h1>
      <input className="w-full border-b border-gray-300 py-2 mb-6 text-sm focus:outline-none focus:border-[#3B5B8C]" onChange={(e) => setInput(e.target.value)} type="text" />
      <button className="bg-[#3B5B8C] hover:bg-[#2d4a73] text-white text-sm px-6 py-2 rounded" onClick={() => checkValid()}>Check</button>
    </div>
    <div>
      {feedback}
    </div>
    </>
  )
}


export default PracticePage
