# Creative Workshops Frontend

React, TypeScript, Vite, and React Router client for the Creative Workshops API.

1. Copy `.env.example` to `.env` if the API is not running at `http://localhost:4000/api`.
2. Run `npm install`.
3. Run `npm run dev` and open the local URL Vite prints.
4. Run `npm run build` for a production build and TypeScript check.

Instructor choices are always loaded from `GET /api/instructors`. Create and edit forms validate required fields and time ranges in the browser; the API validates them again.
