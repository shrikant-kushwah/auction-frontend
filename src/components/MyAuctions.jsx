import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../redux/slice/authSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const MyAuctions = () => {
  const token = useSelector(selectUserToken);
  const navigate = useNavigate();

  const [auctions, setAuctions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const limit = 15;

  const fetchMyAuctions = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_URL}/api/auctions?createdByMe=true&page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAuctions(res.data?.auctions || []);
      setTotal(res.data?.total || 0);
    } catch (err) {
      console.error(err);
      setError('Failed to load your auctions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAuctions();
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this auction?')) return;
    try {
      await axios.delete(`${API_URL}/api/auctions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMyAuctions();
    } catch (err) {
      alert('Delete failed',err);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Auctions</h2>
        <Link
          to="/create-auction"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow transition"
        >
          + Create Auction
        </Link>
      </div>

      {loading && <p className="text-gray-500 text-center">Loading your auctions...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {!loading && !error && auctions.length === 0 && (
        <p className="text-gray-500 text-center">No auctions found.</p>
      )}

      <ul className="space-y-4">
        {auctions.map((auction) => (
          <li
            key={auction._id}
            className="p-5 bg-white border border-gray-200 shadow-md rounded-xl flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-lg transition"
          >
            <div>
              <Link
                to={`/auction/${auction._id}`}
                className="text-xl font-semibold text-indigo-700 hover:underline"
              >
                {auction.title}
              </Link>
              <p className="text-gray-600 text-sm mt-1">
                Ends: {new Date(auction.endTime).toLocaleString()}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4 flex gap-2">
              <button
                onClick={() => navigate(`/edit-auction/${auction._id}`)}
                className="px-4 py-1.5 text-sm font-medium bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(auction._id)}
                className="px-4 py-1.5 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page <= 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700 text-sm">
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAuctions;
