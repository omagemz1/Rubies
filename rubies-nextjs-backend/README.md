# Rubies Expense Tracker - Backend

Express.js backend API for the Rubies Expense Tracker application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your MongoDB connection string:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/Rubies?retryWrites=true&w=majority
API_SECRET=your-secret-key-here
PORT=5000
```

3. Run the server:
```bash
npm start
```

## API Endpoints

All endpoints require an `Authorization` header with your API secret.

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction

## Deploy to Render

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set environment variables in Render dashboard
5. Deploy!
