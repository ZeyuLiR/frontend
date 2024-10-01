import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TableBooking = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    contactNumber: '',
    reservationDate: '',
    reservationData: '',
    guestNumber: 0,
    specialRequest: '',
  });
  const jwt = localStorage.getItem('jwt'); // 假设 JWT 存储在 localStorage
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm("Are you sure you want to submit the booking?");
    if (!isConfirmed) {
      return;
    }

    try {

      const response = await fetch("http://localhost:9000/api/tables/book", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Booking submitted successfully!");

        setFormData({
          customerName: '',
          contactNumber: '',
          reservationDate: '',
          reservationData: '',
          guestNumber: 0,
          specialRequest: '',
        });
      } else {
        alert("Failed to submit booking. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred while submitting the booking.");
    }
  };


  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Table Booking</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="customerName"
              id="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              name="contactNumber"
              id="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Your phone number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="bookingTime">
              Booking Time
            </label>
            <input
              type="datetime-local"
              name="reservationDate"
              id="reservationDate"
              value={formData.reservationDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="bookingContent">
              Booking Content
            </label>
            <input
              type="text"
              name="reservationData"
              id="reservationData"
              value={formData.reservationData}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="What are you booking for?"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="numberOfPeople">
              Number of People
            </label>
            <input
              type="number"
              name="guestNumber"
              id="guestNumber"
              value={formData.guestNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Number of people"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="specialNeeds">
              Special Needs
            </label>
            <textarea
              name="specialRequest"
              id="specialRequest"
              value={formData.specialRequest}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Any special requests or needs?"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TableBooking;
