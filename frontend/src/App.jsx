import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { LoginPage } from "./Pages/LoginPage";
import { OrdersPage } from "./Pages/OrdersPage";
import { CartPage } from "./Pages/CartPage";
import { Header } from "./Components/Header";
import { ToastProvider } from "./context/ToastProvider";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./Components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Header />
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
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
