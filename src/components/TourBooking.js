import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TourBooking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  const jwt = localStorage.getItem('jwt'); 

  const fetchTours = async (term) => {
    const response = await fetch(`http://localhost:9000/api/tours/search?keyword=${encodeURIComponent(term)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}` 
        },
      });
    const data = await response.json();
    setTours(data);
  };

  const handleSearch = () => {
    fetchTours(searchTerm);
  };

  const handleBook = async (tourId) => {
    const confirmed = window.confirm('Are you sure you want to book this tour?');
    
    if (confirmed) {

      const response = await fetch(`http://localhost:9000/api/tours/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}` 
        },
        body: JSON.stringify({ tourId }), 
      });

      if (response.ok) {
        fetchTours(searchTerm);
      } else {
        alert('Booking failed. Please try again.');
      }
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Back  */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/services')}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Back
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tours"
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Tours  */}
      <div>
        {tours.length === 0 ? (
          <p>No tours found</p>
        ) : (
          tours.map((tour) => (
            <div
              key={tour.tourId}
              className="bg-white p-4 mb-4 rounded shadow-md"
            >
              <h2 className="text-xl font-bold">{tour.tourName}</h2>
              <p>Date: {formatDate(tour.tourDate)}</p>
              <p>Description: {tour.description}</p>

              {/* Book  */}
              <div className="mt-4">
                {tour.userBookTourId ? (
                  <button
                    className="bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed"
                    disabled
                  >
                    Booked
                  </button>
                ) : (
                  <button
                    onClick={() => handleBook(tour.tourId)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Book
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TourBooking;
