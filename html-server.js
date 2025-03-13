import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5051;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`HTML server is running on port ${PORT}`);
});
