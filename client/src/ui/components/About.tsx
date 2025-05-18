import { Link } from 'react-router';

export default function About() {
  return (
    <div>
      Hello from About
      <Link to="/" className="bg-blue-500">
        Move to home
      </Link>
    </div>
  );
}
