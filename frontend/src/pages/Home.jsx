import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
        Welcome to A3TechVerse
      </h1>
      <p className="text-lg md:text-2xl text-gray-200 max-w-xl">
        Explore the latest in technology, innovation, and digital creativity.
      </p>
    </div>
  );
}

