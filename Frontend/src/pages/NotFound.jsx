import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
            <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">
                Ups! Nie znaleziono strony, której szukasz.
            </p>
            {/* <img
                src="https://via.placeholder.com/300x200?text=404+Image"
                alt="404 illustration"
                className="w-64 h-auto mb-8"
            /> */}
            <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
                Wróć na stronę główną
            </Link>
        </div>
    );
};

export default NotFound;
