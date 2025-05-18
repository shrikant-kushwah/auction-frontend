import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAuction, updateAuction } from '../redux/slice/auctionSlice';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { selectUserToken } from '../redux/slice/authSlice';

const CreateAuction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useSelector(selectUserToken);
  const loading = useSelector((state) => state.auctions.loading);
  const error = useSelector((state) => state.auctions.error);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingBid: '',
    currentBid: '',
    endTime: ''
  });
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const { title, description, startingBid, currentBid, endTime } = formData;

    if (!title.trim() || !description.trim() || !startingBid || !currentBid || !endTime) {
      return 'Please fill in all fields.';
    }

    const starting = parseFloat(startingBid);
    const current = parseFloat(currentBid);

    if (isNaN(starting) || starting < 0) {
      return 'Starting bid must be a positive number or zero.';
    }

    if (isNaN(current) || current < starting) {
      return 'Current bid must be greater than or equal to the starting bid.';
    }

    const end = new Date(endTime);
    if (end <= new Date()) {
      return 'End time must be in the future.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm();

    if (errorMsg) {
      setFormError(errorMsg);
      return;
    }

    setFormError(null);

    const { title, description, startingBid, currentBid, endTime } = formData;

    const auctionData = {
      title: title.trim(),
      description: description.trim(),
      startingBid: parseFloat(startingBid),
      currentBid: parseFloat(currentBid),
      endTime: new Date(endTime).toISOString(),
    };

    try {
      if (id) {
        await dispatch(updateAuction({ ...auctionData, id })).unwrap();
        navigate('/my-auctions');
      } else {
        await dispatch(createAuction(auctionData)).unwrap();
        navigate('/auctions');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAuction = async (auctionId) => {
    try {
      const res = await axios.get(`${API_URL}/api/auctions/${auctionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res?.data) {
        const { title, description, startingBid, currentBid, endTime } = res.data;
        setFormData({
          title,
          description,
          startingBid,
          currentBid,
          endTime: new Date(endTime).toISOString().slice(0, 16), // Format for datetime-local
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) fetchAuction(id);
  }, [id]);

  return (
  <div className="max-w-2xl mx-auto mt-24 p-8 bg-slate-50 rounded-2xl shadow-xl border border-slate-200">
    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
      {id ? 'Edit Auction' : 'Create New Auction'}
    </h2>

    <form onSubmit={handleSubmit} className="space-y-6">
      {['title', 'description', 'startingBid', 'currentBid', 'endTime'].map((field) => (
        <div key={field}>
          <label
            htmlFor={field}
            className="block mb-2 text-sm font-medium text-gray-700 capitalize"
          >
            {field === 'endTime' ? 'End Time' : field.replace(/([A-Z])/g, ' $1')}
          </label>
          {field === 'description' ? (
            <textarea
              id="description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              value={formData.description}
              onChange={handleChange}
              maxLength={500}
            />
          ) : (
            <input
              id={field}
              type={field.includes('Bid') ? 'number' : field === 'endTime' ? 'datetime-local' : 'text'}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              value={formData[field]}
              onChange={handleChange}
              min={field.includes('Bid') ? '0' : undefined}
              step={field.includes('Bid') ? '0.01' : undefined}
            />
          )}
        </div>
      ))}

      {formError && <p className="text-red-500 text-sm font-medium">{formError}</p>}
      {error && <p className="text-red-600 text-sm font-medium">Server Error: {error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {loading ? 'Submitting...' : id ? 'Update Auction' : 'Create Auction'}
      </button>
    </form>
  </div>
);

};

export default CreateAuction;
