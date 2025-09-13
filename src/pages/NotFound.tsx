import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="card py-10">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-2xl" aria-hidden>🚧</span>
          </div>
          <h1 className="mb-2">404 • Page not found</h1>
          <p className="text-gray-600 mb-6">The page you’re looking for doesn’t exist or was moved.</p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
            <Link to="/" className="btn btn-secondary">Home</Link>
            <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
          </div>

          <p className="text-xs text-gray-500 mt-6">If you believe this is an error, please double‑check the URL.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
