import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigating back

const Order = () => {
    const [menu, setMenu] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate(); // Back navigation

    const jwt = localStorage.getItem('jwt'); 


    useEffect(() => {
        fetch('http://localhost:9000/api/orders/menu', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`, 
            },
        })
            .then((response) => response.json())
            .then((data) => setMenu(data))
            .catch((error) => console.error('Error fetching menu:', error));
    }, [jwt]);


    const handleQuantityChange = (id, price, quantity) => {
        const updatedOrderItems = orderItems.filter(item => item.menuId !== id);
        if (quantity > 0) {
            updatedOrderItems.push({ menuId: id, quantity, singlePrice: price });
        }
        setOrderItems(updatedOrderItems);
        calculateTotal(updatedOrderItems);
    };


    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.quantity * item.singlePrice, 0);
        setTotalPrice(total);
    };


    const handleSubmit = () => {
        if (window.confirm('Are you sure you want to place this order?')) {
            const orderData = {
                totalPrice: totalPrice,
                menu: orderItems,
            };

            fetch('http://localhost:9000/api/orders/orderMenu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`, 
                },
                body: JSON.stringify(orderData),
            })
                .then((response) => {
                    if (response.ok) {
                        alert('Order placed successfully!');
                    } else {
                        alert('Failed to place the order.');
                    }
                })
                .catch((error) => console.error('Error placing order:', error));
        }
    };

    return (
        <div className="p-8">
            <button
                 className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {navigate('/services');}} 
            >
                Back
            </button>
            <br/>
            <br/>
            <br/>
            <h1 className="text-2xl font-bold mb-4">Order Menu</h1>

            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Name</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {menu.map((item) => (
                        <tr key={item.id}>
                            <td className="border px-4 py-2">{item.name}</td>
                            <td className="border px-4 py-2">${item.price}</td>
                            <td className="border px-4 py-2">
                                <input
                                    type="number"
                                    min="0"
                                    className="border p-1 w-16"
                                    onChange={(e) => handleQuantityChange(item.id, item.price, parseInt(e.target.value, 10))}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 text-right">
                <h2 className="text-xl">Total Price: ${totalPrice}</h2>
                <button
                    className="bg-blue-500 text-white px-4 py-2 mt-2"
                    onClick={handleSubmit}
                >
                    Submit Order
                </button>
            </div>
        </div>
    );
};

export default Order;
