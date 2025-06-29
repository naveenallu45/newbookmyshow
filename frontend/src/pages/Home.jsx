import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to BookMyShow</h1>
      <p className="text-lg text-gray-600">
        Book tickets for your favorite movies and shows in your city!
      </p>
    </div>
  );
}

export default Home;