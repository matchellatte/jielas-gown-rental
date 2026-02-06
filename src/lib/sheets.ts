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
  
  // Extract file ID from various Google Drive URL formats
  let fileId = '';
  
  // Format: https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/\/file\/d\/([^\/]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  }
  
  // Format: https://drive.google.com/open?id=FILE_ID
  if (!fileId) {
    const openMatch = url.match(/[?&]id=([^&]+)/);
    if (openMatch) {
      fileId = openMatch[1];
    }
  }
  
  // Format: https://drive.google.com/uc?id=FILE_ID or uc?export=
  if (!fileId && url.includes('drive.google.com/uc')) {
    const ucMatch = url.match(/[?&]id=([^&]+)/);
    if (ucMatch) {
      fileId = ucMatch[1];
    }
  }
  
  // If we found a file ID, use Google's direct content serving domain
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
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
    
    // Filter out rows that have an ID but no meaningful details
    const validRows = rows.filter((row) => {
      const id = row[0]?.toString().trim();
      if (!id) return false;

      // Check if any of the main fields (name, category, description, price, image, measurements)
      // actually contain data. This prevents mostly-empty template rows from showing up.
      const detailColumns = [
        row[1], // name
        row[2], // category
        row[3], // description
        row[4], // waist
        row[5], // bust
        row[6], // length
        row[7], // color
        row[8], // size
        row[9], // price
        row[11], // image URL
      ];

      const hasDetails = detailColumns.some((value) => {
        return typeof value === 'string' && value.trim() !== '';
      });

      return hasDetails;
    });

    console.log(`Fetched ${rows.length} rows, using ${validRows.length} valid gowns from Google Sheets`);

    return validRows
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
