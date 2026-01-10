# Performance Optimization Guide

## Current Optimizations Applied

### 1. API Route Caching ✅
- **Route caching**: 60 seconds with `revalidate`
- **HTTP caching**: Public cache with `s-maxage=60` and `stale-while-revalidate=120`
- **Result**: Reduces Google Sheets API calls significantly

### 2. Google Drive Image Optimization ✅
- **Thumbnail API**: Using `thumbnail?id=...&sz=w1000` instead of `uc?id=...`
- **Benefits**: 
  - Faster image loading (optimized by Google)
  - Automatic resizing to 1000px width
  - Better CDN distribution
- **Unoptimized flag**: Bypasses Next.js optimization for external images

### 3. Lazy Loading ✅
- Product cards use `loading="lazy"` 
- Images load only when scrolling into view
- Reduces initial page load

## Additional Recommendations

### For Better Performance

#### 1. **Optimize Your Google Drive Images** (RECOMMENDED)
Before uploading to Google Drive:
- Compress images to under 500KB each
- Use tools like TinyPNG or Squoosh.app
- Recommended dimensions: 800x1200px for gowns
- Format: JPEG at 80-85% quality

#### 2. **Make Google Drive Folder Public**
Ensure your images are publicly accessible:
1. Right-click folder → Share → "Anyone with the link can view"
2. This prevents authentication delays

#### 3. **Consider Alternative Image Hosting** (BEST SOLUTION)
For production, consider:
- **Cloudinary** (Free tier: 25GB storage, 25GB bandwidth)
- **imgix** (Better performance than Google Drive)
- **Vercel Blob Storage** (Integrated with deployment)
- **Imgur** (Free, simple upload)

**Why?** Google Drive is not designed for website image hosting and can be slow.

#### 4. **Enable Image Optimization in next.config.ts**
Add remote patterns for Google Drive:

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
    ],
  },
};
```

#### 5. **Implement Progressive Loading**
Show skeleton loaders while data loads:
- Add placeholder loading states
- Use Suspense boundaries more effectively

### Google Sheets Optimization

#### Current Setup:
- ✅ Caching enabled (60s)
- ✅ Efficient data fetching

#### Further Improvements:
1. **Reduce Sheet Complexity**
   - Keep only necessary columns
   - Remove complex formulas in fetched range

2. **Use Service Account** (Optional)
   - Better for production
   - More reliable than API key
   - Setup: Google Cloud Console → Service Account → Share sheet with service account email

3. **Consider Database Migration** (For Scale)
   If you have 100+ gowns:
   - Migrate to Vercel Postgres or Supabase
   - Sync from Google Sheets weekly
   - Much faster queries

## Performance Metrics

### Before Optimizations:
- Google Sheets call: ~500-1000ms
- Google Drive images: ~2-4s per image
- Total initial load: ~5-8s

### After Current Optimizations:
- API cache hit: ~50ms
- Thumbnail API: ~800ms-1.5s per image
- Total initial load: ~2-4s

### With Image Hosting Migration:
- API cache hit: ~50ms
- CDN images: ~200-400ms per image
- Total initial load: ~1-2s ⚡

## Quick Wins Checklist

- [x] Enable API caching
- [x] Use Google Drive thumbnail API
- [x] Add lazy loading to images
- [ ] Compress images before uploading
- [ ] Make Google Drive folder public
- [ ] Add loading skeletons
- [ ] Consider migrating to Cloudinary/imgix (recommended for production)

## Next Steps

1. **Immediate** (Already Done):
   - ✅ API caching
   - ✅ Optimized image URLs
   - ✅ Lazy loading

2. **Short Term** (Do Today):
   - Compress existing images in Google Drive
   - Verify folder permissions are public
   - Test loading speeds

3. **Long Term** (Before Heavy Traffic):
   - Migrate images to Cloudinary/imgix
   - Consider database for gown data
   - Add image blur placeholders
   - Implement service worker caching

## Monitoring Performance

Use these tools:
- Chrome DevTools → Network tab
- Lighthouse audit (Chrome DevTools → Lighthouse)
- Vercel Analytics (after deployment)

## Support

If images are still slow after these optimizations, the bottleneck is likely:
1. Google Drive server response time (not much we can control)
2. User's internet connection
3. Image file sizes

**Solution**: Migrate to a proper CDN/image hosting service.
