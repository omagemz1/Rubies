# 🚀 Deployment Guide - Rubies Expense Tracker

## Step 1: Push to GitHub

### Option A: Using the batch file (Recommended)
1. Double-click `PUSH_TO_GITHUB.bat`
2. Wait for it to complete
3. Verify at: https://github.com/omagemz/rubies-expense-tracker

### Option B: Manual commands
Open Git Bash or PowerShell and run:
```bash
cd "d:\rubies nextjs"
git init
git add .
git commit -m "Initial commit: Rubies Expense Tracker with TypeScript and Calendar"
git branch -M main
git remote add origin https://github.com/omagemz/rubies-expense-tracker.git
git push -u origin main
```

### For omagemz1 account:
If you want to use your omagemz1 account instead:
1. Go to https://github.com/omagemz1
2. Click "New repository"
3. Name it: `rubies-expense-tracker`
4. Don't initialize with README
5. Then run:
```bash
git remote remove origin
git remote add origin https://github.com/omagemz1/rubies-expense-tracker.git
git push -u origin main
```

---

## Step 2: Deploy Backend to Render

### Using Render Dashboard:
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `rubies-backend`
   - **Root Directory**: `rubies-nextjs-backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   ```
   MONGO_URI = mongodb+srv://admin:admin123@cluster0.q6532uz.mongodb.net/Rubies?appName=Cluster0
   API_SECRET = dev-secret-key
   PORT = 10000
   ```

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., `https://rubies-backend-xxxx.onrender.com`)

---

## Step 3: Deploy Frontend to Render

### Using Render Dashboard:
1. Click "New +" → "Static Site"
2. Connect the same GitHub repository
3. Configure:
   - **Name**: `rubies-frontend`
   - **Root Directory**: `rubies-vite-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variables:
   ```
   VITE_API_URL = https://rubies-backend-xxxx.onrender.com/api/transactions
   ```
   (Replace with your actual backend URL from Step 2)

5. Click "Create Static Site"
6. Wait for deployment (3-5 minutes)

---

## Step 4: Verify Deployment

1. Open your frontend URL (e.g., `https://rubies-frontend.onrender.com`)
2. Try adding a transaction
3. Check if the calendar view works
4. Verify balance updates correctly

---

## 🔧 Troubleshooting

### Backend Issues:
- Check logs in Render dashboard
- Verify MongoDB connection string
- Ensure PORT is set to 10000

### Frontend Issues:
- Verify VITE_API_URL points to correct backend
- Check browser console for errors
- Ensure backend is running first

### CORS Issues:
- Backend already has CORS enabled for all origins
- If issues persist, check backend logs

---

## 📝 Post-Deployment

### Update Frontend URL:
After both are deployed, you may want to update the backend CORS to only allow your frontend:

In `rubies-nextjs-backend/src/server.ts`, change:
```typescript
app.use(cors({ origin: '*' }))
```
to:
```typescript
app.use(cors({ origin: 'https://your-frontend-url.onrender.com' }))
```

Then push the change and Render will auto-deploy.

---

## 🎉 You're Done!

Your Rubies Expense Tracker is now live!

- Frontend: https://rubies-frontend.onrender.com
- Backend: https://rubies-backend-xxxx.onrender.com
- GitHub: https://github.com/omagemz/rubies-expense-tracker

---

## 📱 Features Deployed:
✅ TypeScript frontend and backend
✅ Calendar view with transaction filtering
✅ Income/Expense tracking
✅ Real-time balance updates
✅ Modern responsive UI
✅ MongoDB persistence
✅ Secure API with authentication
