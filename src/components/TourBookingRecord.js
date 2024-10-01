import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TourBookingRecord() {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();


  const jwt = localStorage.getItem('jwt'); 

  useEffect(() => {
    const fetchTours = async () => {
      const response = await fetch(`http://localhost:9000/api/tours/booked`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwt}`, 
          'Content-Type': 'application/json',
        },

      });

      if (response.ok) {
        const data = await response.json();
        setTours(data);
      } else {
        console.error('Failed to fetch tour booking records');
      }
    };

    fetchTours();
  }, [jwt]); 

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

      {/* Tours  */}
      <div>
        {tours.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          tours.map((tour) => (
            <div
              key={tour.tourId}
              className="bg-white p-4 mb-4 rounded shadow-md"
            >
              <h2 className="text-xl font-bold">{tour.tourName}</h2>
              <p>Date: {formatDate(tour.tourDate)}</p>
              <p>Description: {tour.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TourBookingRecord;
