import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import { ProductList } from "../Components/ProductList";
import "./HomePage.css";

export function HomePage() {
  return (
    <div className="page-container">
      <Header />
      <ProductList />
      <Footer />
    </div>
  );
}
