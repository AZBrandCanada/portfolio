import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { folder } = req.query;

  // Restrict scanning to only allowed portfolio asset folders
  if (!folder || (folder !== 'landgraf' && folder !== 'ecobelle' && folder !== 'anxietyguy')) {
    return res.status(400).json({ error: 'Invalid folder query parameter' });
  }

  try {
    const directoryPath = path.join(process.cwd(), 'public', folder);
    
    // Fall back to an empty array if the directory hasn't been created yet
    if (!fs.existsSync(directoryPath)) {
      return res.status(200).json([]);
    }

    const files = fs.readdirSync(directoryPath);
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'];

    // Convert file names to public URL paths (e.g., /anxietyguy/filename.png)
    const images = files
      .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
      .map(file => `/${folder}/${file}`);

    res.status(200).json(images);
  } catch (err) {
    console.error('Error scanning public asset directory:', err);
    res.status(500).json({ error: 'Unable to scan directory assets' });
  }
}