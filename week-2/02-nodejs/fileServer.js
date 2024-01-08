/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`File server listening on port ${port}`)
})



// GET FILES
app.get('/files', async (req, res) => {
  try {
    const filesDirectory = path.join(__dirname, './files/')
    //console.log(filesDirectory);
    const files = await fs.readdir(filesDirectory);
    return res.status(200).json(files);
  } catch (error) {
    console.error('Error reading files directory:', error);
    return res.status(500).json({ error: 'Failed to retrieve files' });
  }
});

// GET FILES
app.get('/file/:filename', async (req, res) => {
  const filesDirectory = path.join(__dirname, './files/');
  const { filename } = req.params;
  const filePath = path.join(filesDirectory, filename);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return res.status(200).send(fileContent);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File not found
      return res.status(404).send('File not found');
    } else {
      // Other errors
      console.error('Error reading file:', error);
      return res.status(500).send('Internal Server Error');
    }
  }
});

app.all('*', (req, res) => {
  return res.status(404).send('Route not found');
});




module.exports = app;