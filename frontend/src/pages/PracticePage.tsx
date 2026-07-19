import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './PracticePage.css'

function PracticePage() {
  const [sessionActive, setSessionActive] = useState(false)
  const [category, setCategory] = useState("")
  const [rounds, setRounds] = useState(1)
  const [word, setWord] = useState(null)
  
  const startTime = new Date()

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
      {sessionActive ? <SessionScreen word={word}
      rounds={rounds}
      category={category}
      setWord={setWord}
      startTime={startTime}
      /> : 
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
        <div className="bg-white border-b border-gray-200 h-14 flex justify-between items-center px-8">
        <Link to="/" className="text-sm text-gray-500 hover:text-[#3B5B8C]">← Back</Link>
        <h3 className="font-serif text-sm text-[#1A1A1A]">Deutsch Learner</h3>
        <span className="text-sm text-gray-400">Practice</span>
      </div>
        <div className='mt-5 p-5'>
          <h1 className="font-serif text-3xl text-[#1A1A1A] mb-2">Hey Ray,</h1>
          <p className="text-gray-500 mb-8 text-sm">Let's start a new practice session</p>
          <select onChange={(e) => setCategory(e.target.value)}
          name="categories" id="categories" className="w-full border border-gray-200 rounded px-3 py-2 mb-4 text-sm focus:outline-none focus:border-[#3B5B8C]">
            <option value="nouns">Nouns</option>
            <option value="verbs">Verbs</option>
            <option value="adjectives">Adjectives</option>
          </select>
          <input onChange={(e) => setRounds(parseInt(e.target.value))}
          type="text" className="w-full border border-gray-200 rounded px-3 py-2 mb-6 text-sm focus:outline-none focus:border-[#3B5B8C]" placeholder='enter how many questions you want to answer'/>
          <button className="bg-[#3B5B8C] hover:bg-[#2d4a73] text-white text-sm px-6 py-2 rounded" onClick={() => validate()}>Continue</button>
        </div>
      </div>
    </>
  )
}

function SessionScreen ({word, setWord, rounds, category, startTime} : 
  {word: {word: string, meaning: string,
    gender: string | null,
    category: string} | null,
    rounds: number,
    category: string,
    startTime: Date,
    setWord: (val: {word: string, meaning: string, gender: string | null, category: string}) => void}) {
      const [input, setInput] = useState("")
      const [valid, setValid] = useState("idle")
      const [inputDisabled, setInputDisabled] = useState(false)
      const [remaningRounds, setRemaningRounds] = useState(rounds)
      const [numCorrect, setNumCorrect] = useState(0)
      const [sessionOver, setSessionOver] = useState(false)
      useEffect(() => {
      if (sessionOver) {
        store_session()
      }
    }, [sessionOver])

      function checkValid() {
        if(input.toLowerCase() == word?.meaning.toLowerCase()){
          setValid("correct")
          setNumCorrect(numCorrect + 1)
        } else {
          setValid("invalid")
        }
        setInputDisabled(true)
      }

      async function handleNext() {
        if(remaningRounds > 1){
          const response = await fetch(`http://localhost:8000/word?category=${category}`)
          const data = await response.json()
          setWord(data)
          setRemaningRounds(remaningRounds - 1)
          setValid("idle")
          setInput("")
          setInputDisabled(false)
        } else {
          setSessionOver(true)
        }
      }

      async function store_session(){
        const endTime = new Date()
        const session_length = Math.floor((endTime - startTime) / 1000)
        const accuracy = numCorrect / rounds

        const data = {num_questions: rounds,
        category:category,
        session_length: session_length,
        session_date_time: endTime, 
        num_correct: numCorrect, 
        session_accuracy: accuracy}
        const session_data = JSON.stringify(data)

      
      const request = await fetch("http://localhost:8000/session",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: session_data
        }
      )
    }

      let feedback = null
      if(valid == "idle"){
        feedback = null
      } else if(valid == "correct"){
        feedback = 
        <div>
          <h1 className='font-serif m-10 text-green-500'>Richtig! <span className='text-xl uppercase border-b border-black'>{word?.word}</span> means {input} </h1>
          <button className="p-5 m-5 border-gray-300 hover:bg-gray-500" onClick={() => handleNext()}>Next Question</button>
        </div>
      } else {
        feedback = 
        <div>
          <h1 className='font-serif m-10 text-red-500'>Falsch! <span className='text-xl uppercase border-b border-black'>{word?.word}</span> does not mean <span className='text-xl uppercase border-b border-black'>{input}</span>, It means <span className='text-xl uppercase border-b border-black'>{word?.meaning}</span></h1>
        <button className="bg-gray-300 p-5 m-5 border-gray-300 hover:bg-gray-500" onClick={() => handleNext()}>Next Question</button>
        </div>
      }

      let sessionSummary = null
      if(sessionOver == true){
        let endTime = new Date()
        sessionSummary =
        <div className="m-20 p-5 border-gray-500">
          <h1 className="font-serif text-xl text-black mb-3">Session Over!</h1>
          <p className='mb-2'>That was a great session, Ray!</p>
          <p className='mb-5'>It took you {Math.floor((endTime - startTime) / 1000)} seconds to answer {numCorrect} questions correctly out of {rounds} questions. You had an accuracy of {((numCorrect / rounds)* 100).toFixed(2) }%</p>
          <Link to="/" className="text-xl text-gray-500 hover:text-[#3B5B8C]">← Home</Link>
        </div>
      }
  if(sessionOver == false){
    return (
    <>
    <div className='m-5'>
      <Link to="/" className="text-sm text-gray-500 hover:text-[#3B5B8C]">← Back</Link>
    </div>
    <div className="m-10 content-center">
      <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">What does this mean?</p>
      <h1 className="font-serif text-5xl text-[#1A1A1A] mb-10">{word?.word}</h1>
      <input value={input} className="w-full border-b border-gray-300 py-2 mb-6 text-sm focus:outline-none focus:border-[#3B5B8C]" disabled={inputDisabled} onChange={(e) => setInput(e.target.value)} type="text" />
      <button className="bg-[#3B5B8C] hover:bg-[#2d4a73] text-white text-sm px-6 py-2 rounded" onClick={() => checkValid()}>Check</button>
    </div>
    <div>
      {feedback}
    </div>
    </>
    )
  } else {
    return (
    <div>
      {sessionSummary}
    </div>
    )
  }
}


export default PracticePage
