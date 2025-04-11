import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4">404. That’s an error.</h1>
        <p className="text-gray-700 text-lg mb-2">
          The requested page was not found on this server.
        </p>
        <p className="text-sm text-gray-500 mb-6">That’s all we know.</p>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-700 text-white rounded shadow hover:opacity-90 transition"
        >
          Go back to homepage
        </Link>
      </div>

      <img
        src="https://i.imgur.com/qIufhof.png"
        alt="Broken robot"
        className="w-64 mt-8 opacity-90"
      />
    </div>
  );
}
