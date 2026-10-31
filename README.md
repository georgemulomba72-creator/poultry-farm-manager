# Poultry Farm Manager

Professional broiler production management system for Zambian poultry farms.

Converted from the Excel **Poultry Batch Manager** workbook into a modern web application.

## Current Status (v0.1)

- ✅ Full Analytics Dashboard with real KPIs from your Excel data
- ✅ Profit Health Monitor (flags + root-cause actions) matching CONTROL panel logic
- ✅ Batch Performance Scorecard
- ✅ Batches list view
- ✅ Responsive mobile-first layout with sidebar navigation
- ✅ Zambian Kwacha (ZMW) formatting
- ✅ Seeded with your 4 real batches (Batch 01–04) and exact Register numbers

## Next Steps (to make it fully live)

1. Create a free Supabase project → add the schema (will be provided)
2. Add environment variables
3. Replace the static seed with live database queries
4. Enable authentication
5. Deploy to Netlify / Vercel

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Data Source

All figures currently shown match the `📋 Batch Register` and individual batch sheets from your uploaded Excel file (as of the Nov 2026 snapshot).

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Recharts (charts to be expanded)
- Lucide icons

## License

Private – for George Mulomba farm operations.
