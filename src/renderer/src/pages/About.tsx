import { Link } from 'react-router-dom'

function About(): React.JSX.Element {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">About</h1>
      <Link to="/" className="text-primary underline">
        Homeへ戻る
      </Link>
    </div>
  )
}

export default About
