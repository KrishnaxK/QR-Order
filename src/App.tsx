import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from './pages/Auth';
import { DashboardPage } from './pages/Dashboard';
import { ProductsPage } from './pages/Products';
import { OrdersPage } from './pages/Orders';
import { QRCodesPage } from './pages/QRCodes';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { useAuthStore } from './store/authStore';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />}
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/dashboard/products"
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <ProductsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <OrdersPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/dashboard/qr-codes"
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <QRCodesPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="*"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />}
        />
      </Routes>
    </Router>
  );
}

export default App;