import "./footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 My E-commerce Site. All Rights Reserved.</p>
        <p>
          Contact us:{" "}
          <a href="mailto:support@myecommerce.com">support@myecommerce.com</a>
        </p>
      </div>
    </footer>
  );
}
