# PSK Job Portal - Optimized React Version

## Run
1. Copy `.env.example` to `.env`.
2. Put your existing RapidAPI JSearch key in `.env` as `REACT_APP_RAPIDAPI_KEY=...`.
3. Run `npm install`.
4. Run `npm start`.

## Features
- Optimized JSearch request (one API page at a time)
- Search by job title/skills and location
- Full-time filter
- Client-side pagination
- Lazy-loaded company logos
- Login/register/profile module using browser localStorage for demo purposes
- Save/unsave jobs
- Protected profile page
- Lazy-loaded routes for faster initial JS loading

## Important
This version is frontend-only. A `REACT_APP_` variable is bundled into browser code, so it is not a true secret. For production, move the JSearch API call to a backend and keep the RapidAPI key on the server.
