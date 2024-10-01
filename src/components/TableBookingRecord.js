import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper function to format timestamp to readable date
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();  // Adjust this format as needed
};

const jwt = localStorage.getItem('jwt'); // 假设 JWT 存储在 localStorage
const TableBookingRecord = () => {
  const [bookingRecords, setBookingRecords] = useState([]);
  const navigate = useNavigate();

  // Fetch booking records from backend when component mounts
  useEffect(() => {
    const fetchBookingRecords = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/tables/booked", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`, 
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBookingRecords(data);
        } else {
          console.error("Failed to fetch booking records.");
        }
      } catch (error) {
        console.error("Error fetching booking records:", error);
      }
    };

    fetchBookingRecords();
  }, []);

  // Back button handler
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Table Booking Records</h2>

        {/* Booking Records Table */}
        {bookingRecords.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Customer Name</th>
                <th className="px-4 py-2">Contact Number</th>
                <th className="px-4 py-2">Reservation Date</th>
                <th className="px-4 py-2">Booking Content</th>
                <th className="px-4 py-2">Guest Number</th>
                <th className="px-4 py-2">Special Request</th>
              </tr>
            </thead>
            <tbody>
              {bookingRecords.map((record) => (
                <tr key={record.id} className="border-t">
                  <td className="px-4 py-2">{record.customerName}</td>
                  <td className="px-4 py-2">{record.contactNumber}</td>
                  <td className="px-4 py-2">{formatDate(record.reservationDate)}</td>
                  <td className="px-4 py-2">{record.reservationData}</td>
                  <td className="px-4 py-2">{record.guestNumber}</td>
                  <td className="px-4 py-2">{record.specialRequest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">No booking records found.</p>
        )}
      </div>
    </div>
  );
};

export default TableBookingRecord;
