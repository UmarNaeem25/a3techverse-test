<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <h1>A3TechVerse Test Project</h1>

  <p>This repository contains a full-stack project:</p>
  <ul>
    <li><strong>Backend:</strong> Laravel 12 API with Sanctum authentication</li>
    <li><strong>Frontend:</strong> React 19 with Vite and TailwindCSS</li>
  </ul>

  <h2>Project Structure</h2>
  <pre>
a3techverse-test/
├─ backend/   (Laravel API)
└─ frontend/  (React frontend)
  </pre>

  <h2>Prerequisites</h2>
  <ul>
    <li>PHP 8.1+</li>
    <li>Composer</li>
    <li>Node.js 20+ and npm 10+</li>
    <li>MySQL or any database supported by Laravel</li>
  </ul>

  <h2>Backend Setup (Laravel)</h2>
  <ol>
    <li>Open terminal in <code>backend</code> folder:
      <pre>cd backend</pre>
    </li>
    <li>Install PHP dependencies:
      <pre>composer install</pre>
    </li>
    <li>Copy <code>.env.example</code> to <code>.env</code> and configure database settings:
      <pre>cp .env.example .env</pre>
    </li>
    <li>Run migrations:
      <pre>php artisan migrate</pre>
    </li>
    <li>Serve the backend API:
      <pre>php artisan serve</pre>
      By default: <a href="http://127.0.0.1:8000">http://127.0.0.1:8000</a>
    </li>
  </ol>

  <h2>Frontend Setup (React + Vite)</h2>
  <ol>
    <li>Open terminal in <code>frontend</code> folder:
      <pre>cd frontend</pre>
    </li>
    <li>Install npm dependencies:
      <pre>npm install</pre>
    </li>
    <li>Start the development server:
      <pre>npm run dev</pre>
      By default: <a href="http://localhost:5173">http://localhost:5173</a>
    </li>
  </ol>

  <h2>Usage</h2>
  <ol>
    <li>Open the frontend URL in your browser.</li>
    <li>Register a new user, login, and perform CRUD operations on products.</li>
    <li>API calls are authenticated using Laravel Sanctum with Bearer tokens.</li>
  </ol>

  <h2>Notes</h2>
  <ul>
    <li>Ensure the backend is running before starting the frontend.</li>
    <li>Update the API base URL in <code>frontend/src/api.js</code> if your backend runs on a different host/port.</li>
    <li>TailwindCSS is included for styling.</li>
  </ul>

  <h2>Git</h2>
  <p>Clone the repository:</p>
  <pre>git clone &lt;your-repo-url&gt;</pre>
  <p>Then follow the backend and frontend setup steps above.</p>

</body>
</html>
