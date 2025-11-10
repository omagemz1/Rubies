# ⚡ Quick Start - 3 Simple Steps

## Step 1: Install Everything (One Command)

Open CMD in `d:\rubies nextjs\` and run:

```cmd
INSTALL_ALL.bat
```

This will:
- ✅ Install all backend dependencies
- ✅ Install all frontend dependencies  
- ✅ Create .env files with MongoDB connection
- ✅ Set collection name to "data"

**MongoDB is already configured:**
- Connection: `mongodb+srv://admin:admin123@cluster0.q6532uz.mongodb.net/Rubies`
- Database: `Rubies`
- Collection: `data`

## Step 2: Start Backend

Open CMD Terminal 1:

```cmd
cd "d:\rubies nextjs"
START_BACKEND.bat
```

Wait for: `✅ MongoDB connected` and `🚀 Server running on port 5000`

## Step 3: Start Frontend

Open CMD Terminal 2:

```cmd
cd "d:\rubies nextjs"
START_FRONTEND.bat
```

Wait for: `Local: http://localhost:5173/`

## Step 4: Open Browser

Go to: **http://localhost:5173/**

---

## 🎯 That's It!

You should now see the Rubies Expense Tracker running with:
- Beautiful gradient UI
- Add/Edit/Delete transactions
- Real-time balance calculation
- MongoDB "data" collection storing your transactions

---

## 📝 Manual Commands (Alternative)

If you prefer manual setup:

### Install
```cmd
cd "d:\rubies nextjs\rubies-nextjs-backend"
npm install

cd "d:\rubies nextjs\rubies-vite-frontend"
npm install
```

### Run Backend
```cmd
cd "d:\rubies nextjs\rubies-nextjs-backend"
npm run dev
```

### Run Frontend
```cmd
cd "d:\rubies nextjs\rubies-vite-frontend"
npm run dev
```

---

## ✅ Verification

1. Backend: http://localhost:5000/ should show `{"message":"Rubies API is running"}`
2. Frontend: http://localhost:5173/ should show the dashboard
3. MongoDB: Check your MongoDB Atlas - database "Rubies", collection "data"

---

## 🐛 Issues?

See `SETUP_GUIDE.md` for detailed troubleshooting.
