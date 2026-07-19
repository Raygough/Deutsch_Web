import './LearnPage.css'
import { Link } from 'react-router-dom'

function Learn(){
    return (
        <>
        <div className='m-5'>
            <Link to="/" className="text-xl text-gray-500 hover:text-[#3B5B8C] m-5">← Home</Link>
        </div>
        <div className="h-screen flex items-center justify-center">
            <h1 className="text-6xl text-[#3B5B8C] font-serif">Under Construction! 🏗️</h1>
        </div>
        </>
    )
}

export default Learn
