import { google } from 'googleapis';

export interface Gown {
  id: string;
  name: string;
  category: string;
  description: string;
  waist?: string;
  bust?: string;
  length?: string;
  color?: string;
  size?: string;
  price: string;
  available: boolean;
  imageUrl: string;
}

// Helper function to convert Google Drive links to direct image URLs
function formatGoogleDriveUrl(url: string): string {
  if (!url || url === '/placeholder-gown.jpg') return '/placeholder-gown.jpg';
  
  // If already in uc?id= format, convert to thumbnail for faster loading
  if (url.includes('drive.google.com/uc?id=')) {
    const idMatch = url.match(/id=([^&]+)/);
    if (idMatch) {
      // Use Google Drive's thumbnail/export API for faster loading
      return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
    }
    return url;
  }
  
  // Extract file ID from various Google Drive URL formats
  let fileId = '';
  
  // Format: https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/\/file\/d\/([^\/]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  }
  
  // Format: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/[?&]id=([^&]+)/);
  if (openMatch) {
    fileId = openMatch[1];
  }
  
  // If we found a file ID, use thumbnail API for faster loading
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }
  
  // If no pattern matched, return original URL
  return url;
}

export async function getGownsFromSheet(): Promise<Gown[]> {
  try {
    // Check if API key is configured
    const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!apiKey || !spreadsheetId) {
      console.warn('Google Sheets not configured. Please add credentials to .env.local');
      return [];
    }

    const sheets = google.sheets({ version: 'v4', auth: apiKey });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Gowns!A2:L', // Columns A-L (ID to Image URL with Color column)
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      console.warn('No data found in Google Sheets');
      return [];
    }

    console.log(`Fetched ${rows.length} gowns from Google Sheets`);

    return rows
      .filter(row => row[0]) // Only process rows with an ID
      .map((row, index) => {
        const gown: Gown = {
          id: row[0] || `gown-${index + 1}`,
          name: row[1] || 'Untitled Gown',
          category: row[2] || 'Uncategorized',
          description: row[3] || '',
          price: row[9] || 'Contact for pricing',
          available: row[10]?.toLowerCase() === 'yes' || row[10]?.toLowerCase() === 'true' || row[10]?.toLowerCase() === 'available',
          imageUrl: formatGoogleDriveUrl(row[11] || '/placeholder-gown.jpg'),
        };
        
        // Only include measurements if they have values
        if (row[4] && row[4].trim()) gown.waist = row[4].trim();
        if (row[5] && row[5].trim()) gown.bust = row[5].trim();
        if (row[6] && row[6].trim()) gown.length = row[6].trim();
        if (row[7] && row[7].trim()) gown.color = row[7].trim();
        if (row[8] && row[8].trim()) gown.size = row[8].trim();
        
        return gown;
      });
  } catch (error) {
    console.error('Error fetching gowns from Google Sheets:', error);
    return [];
  }
}
