import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import "./HomePage.css";

export function HomePage() {
  return (
    <div className="page-container">
      <Header />
      <div className="content">
        <h1>Welcome to My E-commerce Site</h1>
        <p>Home page content goes here</p>
      </div>
      <Footer />
    </div>
  );
}
