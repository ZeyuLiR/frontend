import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const OrderRecord = () => {
  const [orders, setOrders] = useState({});
  const [message, setMessage] = useState("");
  const [stripe, setStripe] = useState(null); 
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('jwt'); 
    const userId = localStorage.getItem('userId'); 

  
    if (!window.Stripe) {
      console.error('Stripe.js is not loaded');
    } else {
      setStripe(window.Stripe('pk_test_51Q6XWQKD7xEKEswAieTpHB683siSWLdEycgHyZgKqVqHC7RYHUOmf39w1s0OqwHGOQS36GsytMGrllo1rDbZzRi500UorAz8ZZ')); // 使用你的 Stripe 公钥
    }
    fetchOrders(token, userId);
  }, []);


  const fetchOrders = async (token, userId) => {
    try {
      const response = await fetch('http://localhost:9000/api/orders/ordered', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'userId': userId
        }
      });
      const data = await response.json();
      groupOrdersByOrderId(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };


  const groupOrdersByOrderId = (data) => {
    const groupedOrders = data.reduce((acc, item) => {
      if (!acc[item.orderId]) {
        acc[item.orderId] = {
          totalPrice: item.totalPrice,
          isPaid: item.isPaid,
          items: []
        };
      }
      acc[item.orderId].items.push({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      });
      return acc;
    }, {});
    setOrders(groupedOrders);
  };


  const handlePayment = async (orderId) => {
    const token = localStorage.getItem('jwt'); 
    const orderDetails = orders[orderId]; 
    const paymentData = {
        amount: orderDetails.totalPrice * 100, 
        currency: 'aud', 
        orderId: orderId 
    };

    try {
        //  Checkout Session
        const response = await fetch('http://localhost:9000/api/orders/createCheckoutSession', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(paymentData)
        });

        if (response.ok) {
            const { sessionId } = await response.json(); //  sessionId

            if (!stripe) {
                console.error('Stripe.js is not initialized');
                return;
            }

            const result = await stripe.redirectToCheckout({
                sessionId: sessionId //  sessionId
            });

            if (result.error) {
                console.error(result.error.message);
            }
        } else {
            console.error('Payment Session creation failed');
        }
    } catch (error) {
        console.error('Error during payment:', error);
    }
};


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => {navigate('/services');}}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Back
      </button>

      <h1 className="text-2xl font-semibold mb-6">Order Records</h1>

      {Object.keys(orders).length > 0 ? (
        Object.keys(orders).map((orderId) => (
          <div key={orderId} className="mb-8 bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Order ID: {orderId}</h3>
            <p className="text-gray-600 mb-4">Total Price: <span className="text-lg font-medium">${orders[orderId].totalPrice}</span></p>
            
            <table className="min-w-full table-auto mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {orders[orderId].items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {orders[orderId].isPaid ? (
              <button className="bg-gray-300 text-gray-600 py-2 px-4 rounded cursor-not-allowed" disabled>
                Paid
              </button>
            ) : (
              <button
                onClick={() => handlePayment(orderId)}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Pay
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}

      <p className="mt-4 text-center text-green-600">Payment Status: {message}</p>
    </div>
  );
};

export default OrderRecord;
