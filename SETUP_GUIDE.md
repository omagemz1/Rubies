# 🚀 Complete Setup Guide - Rubies Expense Tracker

## Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account (already configured)

## 📦 Quick Setup (Windows CMD)

### Option 1: Automated Setup (Recommended)

#### Backend Setup
```cmd
cd "d:\rubies nextjs\rubies-nextjs-backend"
setup.bat
```

#### Frontend Setup
```cmd
cd "d:\rubies nextjs\rubies-vite-frontend"
setup.bat
```

### Option 2: Manual Setup

#### Backend Setup
```cmd
cd "d:\rubies nextjs\rubies-nextjs-backend"
npm install
copy .env.example .env
```

Edit `.env` file (already pre-configured):
```
MONGO_URI=mongodb+srv://admin:admin123@cluster0.q6532uz.mongodb.net/Rubies?appName=Cluster0
API_SECRET=dev-secret-key
PORT=5000
```

#### Frontend Setup
```cmd
cd "d:\rubies nextjs\rubies-vite-frontend"
npm install
copy .env.example .env
```

The `.env` file will contain:
```
VITE_API_URL=http://localhost:5000/api/transactions
VITE_API_SECRET=dev-secret-key
```

## ▶️ Running the Application

### Start Backend (Terminal 1)
```cmd
cd "d:\rubies nextjs\rubies-nextjs-backend"
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Server running on port 5000
```

### Start Frontend (Terminal 2)
```cmd
cd "d:\rubies nextjs\rubies-vite-frontend"
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Open Application
Open your browser and go to: **http://localhost:5173/**

## 🗄️ MongoDB Configuration

**Already configured for you:**
- **Connection String**: `mongodb+srv://admin:admin123@cluster0.q6532uz.mongodb.net/Rubies?appName=Cluster0`
- **Database**: `Rubies`
- **Collection**: `data` (automatically created)
- **Credentials**: admin / admin123

## ✅ Verification Checklist

### Backend Health Check
1. Backend running on port 5000
2. MongoDB connected successfully
3. Test endpoint: http://localhost:5000/
   - Should return: `{"message":"Rubies API is running"}`

### Frontend Health Check
1. Frontend running on port 5173
2. Can see the Rubies dashboard
3. Can add/edit/delete transactions
4. Balance updates correctly

## 🐛 Troubleshooting

### Backend Issues

**Error: "Cannot find module"**
```cmd
cd "d:\rubies nextjs\rubies-nextjs-backend"
npm install
```

**Error: "MongoDB connection error"**
- Check internet connection
- Verify MongoDB Atlas is accessible
- Connection string is already correct

**Error: "Port 5000 already in use"**
```cmd
# Change PORT in .env to 5001
PORT=5001
```

### Frontend Issues

**Error: "Cannot find module"**
```cmd
cd "d:\rubies nextjs\rubies-vite-frontend"
npm install
```

**Error: "Failed to fetch transactions"**
- Make sure backend is running
- Check VITE_API_URL in .env
- Verify API_SECRET matches backend

**Error: "Port 5173 already in use"**
- Vite will automatically use next available port

## 📁 Project Structure

```
rubies-nextjs-backend/
├── src/
│   ├── models/
│   │   └── Transaction.ts (Collection: "data")
│   ├── routes/
│   │   └── transactionRoutes.ts
│   └── server.ts
├── .env (MongoDB connection)
├── package.json
└── setup.bat

rubies-vite-frontend/
├── src/
│   ├── components/
│   ├── features/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── main.tsx
├── .env (API configuration)
├── package.json
└── setup.bat
```

## 🔑 Important Notes

1. **MongoDB Collection**: The collection name is set to `data` in the backend code
2. **API Secret**: Both frontend and backend use `dev-secret-key` for local development
3. **TypeScript**: All errors will disappear after running `npm install`
4. **Hot Reload**: Both backend and frontend support hot reload during development

## 🎯 Testing the Application

1. **Add Transaction**: Click "Add Transaction" button
2. **Income**: Select "Income" radio button, enter amount
3. **Expense**: Select "Expense" radio button, enter amount
4. **Edit**: Click edit button on any transaction
5. **Delete**: Click delete button and confirm
6. **Balance**: Check that balance updates correctly

## 📊 MongoDB Data Structure

Transactions are stored in the `data` collection with this structure:
```json
{
  "_id": "ObjectId",
  "amount": -10.50,
  "description": "Groceries",
  "date": "2025-11-10T13:00:00.000Z"
}
```

- Negative amount = Expense
- Positive amount = Income

## 🚀 Ready to Deploy?

See the main README.md for deployment instructions to Render.com

---

**Need Help?** Check the troubleshooting section or review the error messages in the terminal.
