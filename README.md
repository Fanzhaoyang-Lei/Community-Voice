 🌍Project Architecture (MERN Stack)
 
🖥️ Frontend (React)
Directory: /client
Tech: React.js, Socket.io-client, React Scripts
Functionality:
Displays a button to change the color.
Listens for real-time color updates via socket.io.
Communicates with the backend to send color changes.

⚙️ Backend (Node.js + Express)
Directory: /server
Tech: Node.js, Express.js, Socket.io, CORS
Functionality:
Manages WebSocket connections (socket.io).
Listens for user actions (button clicks) and broadcasts updates to all connected clients.
Handles HTTP requests (if needed in the future).
Can be expanded to include authentication or other APIs.

💾 Database (MongoDB)
Service: MongoDB Atlas (Cloud) or Local MongoDB
Tech: Mongoose (MongoDB ODM for Node.js)
Functionality:
Stores the last selected color.
Ensures that users joining later see the most recent color instead of the default.
Can be expanded to save user-specific color preferences.
📡 Communication Flow
1️⃣ User clicks the button in React (client)
   ⬇️
2️⃣ React emits a "changeColor" event via `socket.io`
   ⬇️
3️⃣ Express.js (server) listens for the event and updates the database
   ⬇️
4️⃣ Server broadcasts the updated color to all connected clients
   ⬇️
5️⃣ React (clients) receive the new color and update the UI

🛠️ Deployment Options
| Component            | Local Development    | Cloud Deployment                 |
|----------------------|---------------------|----------------------------------|
| **Frontend (React)** | `localhost:3000`    | AWS S3 / CloudFront / Vercel    |
| **Backend (Node.js)**| `localhost:5001`    | AWS EC2 / AWS Lambda / Heroku   |
| **Database (MongoDB)** | Local MongoDB    | MongoDB Atlas                   |


Community decision-making tool

Play with the P5.js here: https://fanzhaoyang-lei.github.io/Community-Voice/
