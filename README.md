# Jiela's Gown Rental

A modern, elegant gown rental showcase website built with Next.js, TypeScript, and Tailwind CSS. Features a Google Sheets-powered CMS for easy inventory management.

## Features

- 🎨 Elegant, minimalist design
- 📱 Fully responsive (mobile & desktop)
- 🔍 Advanced search and filtering
- 📊 Google Sheets integration for inventory management
- ⚡ Fast, optimized performance with Next.js 15
- 🎯 TypeScript for type safety

## Environment Variables

Copy `.env.example` to `.env.local` and configure the following:

```bash
GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key_here
GOOGLE_SHEET_ID=your_google_sheet_id_here
```

See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) for detailed setup instructions.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables (see above)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment on Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your repository on [Vercel](https://vercel.com)

3. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `GOOGLE_SHEETS_API_KEY` and `GOOGLE_SHEET_ID`

4. Deploy! Vercel will automatically build and deploy your site

## Google Sheets Structure

Your Google Sheets should have a tab named "Gowns" with the following columns (A-L):
- A: ID
- B: Name
- C: Category
- D: Description
- E: Waist
- F: Bust
- G: Length
- H: Color
- I: Size
- J: Price
- K: Available (Yes/No)
- L: Image URL

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **CMS:** Google Sheets API
- **Deployment:** Vercel

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
