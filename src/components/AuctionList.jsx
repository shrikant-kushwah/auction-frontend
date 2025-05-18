import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAuctions,
  selectAllAuctions,
  selectAuctionsStatus,
  selectAuctionsError,
  selectAuctionsTotal,
} from '../redux/slice/auctionSlice';

const AuctionList = () => {
  const dispatch = useDispatch();
  const auctions = useSelector(selectAllAuctions);
  const status = useSelector(selectAuctionsStatus);
  const error = useSelector(selectAuctionsError);
  const total = useSelector(selectAuctionsTotal);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('endTime');
  const [order, setOrder] = useState('asc');
  const limit = 10;

  useEffect(() => {
    dispatch(fetchAuctions({ page, limit, search, sortBy, order }));
  }, [page, search, sortBy, order, dispatch]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-7xl mx-auto px-8 mt-24">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Live Auctions</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search auctions..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="endTime">End Time</option>
          <option value="currentBid">Current Bid</option>
          <option value="title">Title</option>
        </select>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Status Messages */}
      {status === 'loading' && (
        <p className="text-blue-500 text-center text-lg">Loading auctions...</p>
      )}
      {status === 'failed' && (
        <p className="text-red-500 text-center text-lg">Error: {error}</p>
      )}
      {status === 'succeeded' && auctions.length === 0 && (
        <p className="text-gray-500 text-center text-lg">No auctions found.</p>
      )}

      {/* Auction Cards */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {auctions.map((auction) => (
          <li
            key={auction._id}
            className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{auction.title}</h3>
            <p className="text-blue-600 font-medium mb-1">
              💰 Current Bid: ${auction.currentBid}
            </p>
            <p className="text-sm text-gray-500">
              ⏰ Ends: {new Date(auction.endTime).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              disabled={page === i + 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                page === i + 1
                  ? 'bg-blue-600 text-white cursor-default'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuctionList;
