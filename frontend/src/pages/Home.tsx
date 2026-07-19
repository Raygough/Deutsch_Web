import { Link } from 'react-router-dom'

const tiles = [
  { title: 'Practice', description: 'Quiz yourself on vocab', to: '/practice' },
  { title: 'Learn', description: 'Structured lessons', to: '/learn' },
  { title: 'Journal', description: 'AI-guided writing prompts', to: '/journal' },
  { title: 'Resources', description: 'Grammar & reference', to: '/resources' },
]

function Home() {
  return (
    <div className="notebook-bg">
      <nav className="bg-white border-b border-gray-200 h-14 flex items-center px-8">
        <h3 className="font-serif text-lg text-[#1A1A1A]">Deutsch Learner</h3>
      </nav>
      <div className="max-w-2xl mx-auto pt-20 px-8">
        <h1 className="font-serif text-3xl text-[#1A1A1A] mb-2">Willkommen, Ray</h1>
        <p className="text-gray-500 text-sm mb-12">Where would you like to go?</p>
        <div className="grid grid-cols-2 gap-4">
          {tiles.map((tile) => (
            <Link
              key={tile.title}
              to={tile.to}
              className="border border-gray-200 rounded-lg p-6 hover:border-[#3B5B8C] transition-colors"
            >
              <h2 className="font-serif text-xl text-[#1A1A1A] mb-1">{tile.title}</h2>
              <p className="text-gray-500 text-xs">{tile.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home