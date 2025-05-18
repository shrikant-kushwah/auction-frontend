import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAuctions,
  selectAllAuctions,
  selectAuctionsStatus,
  selectAuctionsError,
} from '../redux/slice/auctionSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { selectCurrentUser, selectUserToken } from '../redux/slice/authSlice';
import { USER_API_END_POINT } from '../redux/constants/userConstants';

const Auctions = () => {
  const dispatch = useDispatch();
  const auctions = useSelector(selectAllAuctions);
  const status = useSelector(selectAuctionsStatus);
  const error = useSelector(selectAuctionsError);
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectUserToken);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAuctions());
    }
  }, [dispatch, status]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this auction?')) return;

    try {
      await axios.delete(`${USER_API_END_POINT}/auctions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(fetchAuctions());
    } catch (err) {
      alert('Failed to delete auction: ' + (err.response?.data?.message || err.message));
    }
  };

  if (status === 'loading') return <p className="text-center py-10 text-blue-500">Loading auctions...</p>;
  if (status === 'failed') return <p className="text-center py-10 text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Active Auctions</h1>
        {auctions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.map((auction) => (
              <div key={auction._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between">
                <div className='flex justify-between items-start'>
                  <div>
                    <div

                      className="text-xl font-semibold text-blue-600 hover:underline"
                    >
                      {auction.title}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {auction.description?.slice(0, 100)}...
                    </p>
                    <p className="text-sm text-green-600 mt-3 font-medium">
                      Current Bid: ${auction.currentBid ?? auction.startingBid}
                    </p>
                  </div>

                  {user && auction.createdBy && user._id === auction.createdBy._id && (
                    <div className="flex space-x-2">
                      <Link
                        to={`/edit-auction/${auction._id}`}
                        className="px-4 py-2 bg-yellow-400 text-black rounded-lg text-sm hover:bg-yellow-500 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(auction._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>



                <Link
                  to={`/auction/${auction._id}`}
                  className="px-4 w-fit py-2 mt-4 bg-green-400 text-white rounded-lg text-sm hover:bg-green-500 ml-auto transition"
                >
                  Place Bid
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">No active auctions found.</p>
        )}
      </div>
    </div>
  );
};

export default Auctions;
