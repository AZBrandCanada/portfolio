export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} HandyHeroYYC. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
          Serving Calgary & surrounding areas.
        </p>
      </div>
    </footer>
  );
}