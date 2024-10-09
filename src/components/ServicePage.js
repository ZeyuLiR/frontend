import React from 'react';
import { useNavigate } from 'react-router-dom';

function ServicePage() {
  const navigate = useNavigate();


  const handleLogout = () => {
  
    localStorage.removeItem('jwt'); 
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Logout  */}
      <div className="w-full flex justify-end p-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col space-y-4 mt-10">
        <button
          onClick={() => navigate('/tour-booking')}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
        >
          Tour Booking
        </button>

        <button
          onClick={() => navigate('/tour-booking-record')}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
        >
          Tour Booking Record
        </button>

        <button
          onClick={() => navigate('/table-booking')}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
        >
          Table Booking
        </button>

        <button
          onClick={() => navigate('/table-booking-record')}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
        >
          Table Booking Record
        </button>

        <button
          onClick={() => navigate('/order-food')}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
        >
          Order Food
        </button>

        <button
          onClick={() => navigate('/order-record')}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
        >
          Order Record
        </button>
      </div>
    </div>
  );
}

export default ServicePage;
