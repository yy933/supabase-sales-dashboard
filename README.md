# Sales Dashboard

A React + Vite dashboard for tracking sales performance in real time. The app lets users sign in, view quarterly sales totals, and add new deals through a simple form. When a deal is submitted, the dashboard updates instantly through Supabase Realtime.

## Features

- User authentication with Supabase
- Protected routes for signed-in users
- Role-based account handling for admins and sales reps
- Add new sales deals from the dashboard
- Visualize total sales with a responsive bar chart
- Live updates when sales data changes

## Tech Stack

- React 19
- React Router 7
- Vite 8
- Supabase
- Recharts
- ESLint

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and add your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_KEY=your_supabase_publishable_key
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local Vite URL shown in the terminal.

## Available Scripts

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run preview` – preview the production build locally
- `npm run lint` – run ESLint checks

## Project Structure

- `src/components` – reusable UI components such as the header, chart, form, and auth screens
- `src/routes` – main route views including the dashboard and redirect logic
- `src/context` – authentication context provider
- `src/Hooks` – custom auth hook
- `src/supabase` – Supabase client and SQL assets
- `src/utils` – helper functions for fetching sales metrics

## Supabase Setup Notes

This project expects Supabase to be configured with:

- Authentication enabled
- A `user_profiles` table containing at least:
  - `id`
  - `name`
  - `account_type`
- A `sales_deals` table containing at least:
  - `user_id`
  - `value`

Realtime should also be enabled for the `sales_deals` table if you want live dashboard updates.

## Notes

- Authenticated users are redirected to the dashboard.
- Unauthenticated users are redirected to the sign-in page.
- The dashboard form automatically uses the current rep’s name for sales reps, while admins can choose from the list of reps.
