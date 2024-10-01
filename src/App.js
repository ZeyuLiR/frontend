import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Services from './components/ServicePage';
import TourBooking from './components/TourBooking';
import TourBookingRecord from './components/TourBookingRecord';
import TableBooking from './components/TableBooking';
import TableBookingRecord from './components/TableBookingRecord';
import PrivateRoute from './components/PrivateRoute'; // 引入 PrivateRoute 组件

function App() {
  return (
    <Router>
      <Routes>
        {/* 未登录用户可以访问的页面 */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 需要登录才能访问的页面 */}
        <Route
          path="/services"
          element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          }
        />
        <Route
          path="/tour-booking"
          element={
            <PrivateRoute>
              <TourBooking />
            </PrivateRoute>
          }
        />
        <Route
          path="/tour-booking-record"
          element={
            <PrivateRoute>
              <TourBookingRecord />
            </PrivateRoute>
          }
        />
        <Route
          path="/table-booking"
          element={
            <PrivateRoute>
              <TableBooking />
            </PrivateRoute>
          }
        />
        <Route
          path="/table-booking-record"
          element={
            <PrivateRoute>
              <TableBookingRecord />
            </PrivateRoute>
          }
        />

        {/* 重定向到登录页面 */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
