import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { LoginPage } from "./Pages/LoginPage";
import { OrdersPage } from "./Pages/OrdersPage";
import { CartPage } from "./Pages/CartPage";
import { CheckoutPage } from "./Pages/CheckoutPage";
import { SuccessPage } from "./Pages/SuccessPage";
import { FailurePage } from "./Pages/FailurePage";
import { Header } from "./Components/Header";
import { ToastProvider } from "./context/ToastProvider";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./Components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          {/* Header will now always have access to AuthContext */}
          <Header searchTerm="" setSearchTerm={() => {}} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            {/* Payment status pages */}
            <Route
              path="/payment-success"
              element={
                <ProtectedRoute>
                  <SuccessPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment-failed"
              element={
                <ProtectedRoute>
                  <FailurePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
