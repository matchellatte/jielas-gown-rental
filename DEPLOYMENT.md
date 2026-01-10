# Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### Code Quality
- [x] No TypeScript compilation errors
- [x] Build completes successfully (`npm run build`)
- [x] All components properly typed
- [x] Suspense boundaries added for useSearchParams

### Environment Variables
- [x] `.env.example` file created with all required variables
- [x] `.env.local` added to `.gitignore`
- [ ] Environment variables documented in README.md

### Configuration Files
- [x] `package.json` has correct build scripts
- [x] `.gitignore` properly excludes sensitive files
- [x] Next.js config is production-ready

### Documentation
- [x] README.md updated with deployment instructions
- [x] Google Sheets setup documentation included
- [x] Environment variables documented

## 🚀 Deployment Steps

### 1. Prepare Your Repository
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add Environment Variables:
   - `GOOGLE_SHEETS_API_KEY`
   - `GOOGLE_SHEET_ID`
6. Click "Deploy"

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add GOOGLE_SHEETS_API_KEY
vercel env add GOOGLE_SHEET_ID

# Deploy to production
vercel --prod
```

### 3. Post-Deployment

1. **Verify Environment Variables**
   - Go to Project Settings → Environment Variables
   - Ensure both variables are set for Production, Preview, and Development

2. **Test the Deployment**
   - Visit your deployed URL
   - Test search functionality
   - Test filtering on category pages
   - Verify Google Sheets data is loading
   - Test mobile responsiveness

3. **Set Up Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## 🔧 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Run `npm run build` locally to replicate the error

### Environment Variables Not Working
- Verify variable names match exactly (case-sensitive)
- Redeploy after adding/updating variables
- Check variables are set for the correct environment (Production/Preview)

### Google Sheets Not Loading
- Verify API key has correct permissions
- Check Sheet ID is correct
- Ensure sheet is publicly accessible or API key has proper access
- Check Vercel function logs for errors

### Images Not Loading
- Verify Google Drive URLs are in correct format
- Check if placeholder image exists in `/public` folder
- Review Next.js Image optimization settings

## 📊 Performance Optimization

Already implemented:
- ✅ Static page generation where possible
- ✅ Image optimization with Next.js Image
- ✅ Revalidation configured (1 minute)
- ✅ Responsive images with proper sizing

## 🔒 Security

- ✅ Environment variables not committed to Git
- ✅ API routes properly configured
- ✅ No sensitive data in client-side code

## 📝 Next Steps After Deployment

1. Monitor application performance in Vercel Analytics
2. Set up error tracking (optional: Sentry integration)
3. Configure custom domain if needed
4. Set up preview deployments for branches
5. Monitor Google Sheets API usage

## 🎯 Current Build Status

- **Build Status:** ✅ Passing
- **TypeScript:** ✅ No errors
- **Framework:** Next.js 16.1.1
- **Node Version:** Automatic (Vercel default)
- **Package Manager:** npm

## 📞 Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
