import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gradient-to-tr from-indigo-400 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center px-6 sm:px-12">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl max-w-4xl w-full p-10 sm:p-16 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 tracking-wide drop-shadow-lg">
          Start Bidding with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Auctionary</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-xl mx-auto">
          Real-time auction platform with secure login, live bidding, countdown timers, user auction management, admin controls, and advanced search features.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            to="/auctions"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            View Auctions
          </Link>
          <Link
            to="/login"
            className="inline-block border-2 border-purple-600 text-purple-700 font-semibold px-6 py-2 rounded-lg hover:bg-purple-600 hover:text-white hover:scale-105 transition-all duration-300"
          >
            Login / Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
