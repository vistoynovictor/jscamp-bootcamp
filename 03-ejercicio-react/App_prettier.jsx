import { useState } from "react";

function App() {
  return (
    <>
      <header className="site-header">
        <a href="index.html">
          <h2>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </h2>
        </a>
      </header>
    </>
  );
}
