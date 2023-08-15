## Project Documentation
### ENV EXAMPLE
- MONGODB_URI= XXX
- PORT= XXX
### API List

#### 1. Video Thumbnail List
- Endpoint: `GET /api/videos/thumbnail-list`
- Description: Retrieves a list of video thumbnails.
- Response: Array of video thumbnail objects, each containing `VideoID` and `Url Image` properties.

#### 2. Product List
- Endpoint: `GET /api/products/list`
- Description: Retrieves a list of products.
- Response: Array of product objects, each containing `ProductID`, `Link Product`, `Title`, and `Price` properties.

#### 3. Comment List
- Endpoint: `GET /api/comments/list/:videoID`
- Description: Retrieves a list of comments for a specific video.
- Parameters:
  - `videoID`: The ID of the video to fetch comments for.
- Response: Array of comment objects, each containing `Username`, `Comment`, and `Timestamp` properties.

#### 4. Submit Comment
- Endpoint: `POST /api/comments/submit`
- Description: Submits a new comment for a video.
- Request Body:
  - `Username`: The username of the commenter.
  - `Comment`: The comment text.
  - `VideoID`: The ID of the video the comment is for.
- Response: Success or failure message.

### Setup MongoDB

1. Install MongoDB:
   - Make sure you have MongoDB installed on your system. If not, download and install MongoDB from the official website: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).

2. Create Database and Collection:
   - After installing MongoDB, start the MongoDB server.
   - Open a terminal or command prompt and run the following commands to create a new database and collections:

   ```bash
   # Start MongoDB shell
   mongo

   # Create a new database
   use stream_db

   # Create collections for videos, products, and comments
   db.createCollection('videos')
   db.createCollection('products')
   db.createCollection('comments')
   ```

3. Insert Dummy Data (Optional):
   - If you want to insert dummy data for testing, you can do so by using the MongoDB shell or a GUI tool like MongoDB Compass.

### Run the Project

1. Install Dependencies:
   - Navigate to the project root directory (where `package.json` is located) using the terminal.
   - Run the following command to install the project dependencies:

   ```bash
   npm install
   ```

2. Start the Server:
   - Run the following command to start the server:

   ```bash
   npm start
   ```

3. Access the API:
   - The server will be running on `http://localhost:3000` by default.
   - You can access the API endpoints using tools like Postman or directly from your frontend application.

### WebSocket Support

The project has WebSocket support implemented for real-time comment updates. To utilize WebSocket functionality:

1. Connect to WebSocket Server:
   - In your frontend application, create a WebSocket connection to `ws://localhost:3000/api/comments/list/{{videoID}}`.
   - You can use the WebSocket connection to send and receive real-time updates from the server.

2. WebSocket Message Handling:
   - The server will send real-time comment updates to connected WebSocket clients when a new comment is submitted using the `submitComment` API.
   - Handle WebSocket messages on the client-side to update the UI with real-time comment data.

Please note that WebSocket connections are separate from regular HTTP requests, and they are not meant to replace traditional API endpoints. WebSocket is designed for real-time, bidirectional communication, making it suitable for scenarios where you need to push real-time updates to connected clients. Regular HTTP endpoints like the ones mentioned in the API list should still be used for initial data retrieval and non-real-time operations.
