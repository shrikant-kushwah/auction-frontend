import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logoutUser } from '../redux/slice/authSlice';

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg px-6 py-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-white tracking-wide"
          onClick={handleLinkClick}
        >
          Auctionary
        </Link>

        {/* Hamburger Toggle */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Menu Items */}
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } md:block absolute md:static top-16 left-0 w-full md:w-auto backdrop-blur-lg md:bg-transparent transition-all duration-300 ease-in-out shadow-md md:shadow-none`}
        >
          <div className="flex flex-col md:flex-row items-center gap-5 px-6 py-4 md:py-0">
            <Link
              to="/auctions"
              onClick={handleLinkClick}
              className="text-black font-medium hover:text-white transition"
            >
              Auctions
            </Link>

            {user ? (
              <>
                <Link
                  to="/create-auction"
                  onClick={handleLinkClick}
                  className="text-black font-medium hover:text-white transition"
                >
                  Create
                </Link>
                <Link
                  to="/auctionlist"
                  onClick={handleLinkClick}
                  className="text-black font-medium hover:text-white transition"
                >
                  List
                </Link>
                <Link
                  to="/my-auctions"
                  onClick={handleLinkClick}
                  className="text-black font-medium hover:text-white transition"
                >
                  My Auctions
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-1.5 rounded-md hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  className="bg-white text-indigo-600 px-4 py-1.5 rounded-md font-semibold hover:bg-indigo-100 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={handleLinkClick}
                  className="border border-white text-white px-4 py-1.5 rounded-md hover:bg-white hover:text-indigo-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
