# 💎 Rubies Expense Tracker - TypeScript Edition

Modern full-stack expense tracker built with TypeScript, Express.js, React, Vite, and Tailwind CSS.

## 📁 Project Structure

```
rubies-nextjs-backend/     # TypeScript Express.js API
├── src/
│   ├── models/
│   │   └── Transaction.ts
│   ├── routes/
│   │   └── transactionRoutes.ts
│   └── server.ts
├── package.json
└── tsconfig.json

rubies-vite-frontend/      # TypeScript React + Vite + Tailwind
├── src/
│   ├── components/
│   │   ├── AddTransactionModal.tsx
│   │   ├── TransactionTable.tsx
│   │   └── ConfirmModal.tsx
│   ├── features/
│   │   └── transactionsSlice.ts
│   ├── pages/
│   │   └── Dashboard.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── store.ts
├── package.json
└── tsconfig.json
```

## 🚀 Quick Start

### One-Click Installation (Windows)

```cmd
INSTALL_ALL.bat
```

This installs everything and configures MongoDB automatically!

### Backend Setup

```bash
cd rubies-nextjs-backend
npm install

# .env file is auto-created with:
# MONGO_URI=mongodb+
# API_SECRET=dev-secret-key
# PORT=5000

# Development
npm run dev

# Production build
npm run build
npm start
```

### Frontend Setup

```bash
cd rubies-vite-frontend
npm install

# Create .env file
echo VITE_API_URL=http://localhost:5000/api/transactions > .env
echo VITE_API_SECRET=your_secret_key >> .env

# Development
npm run dev

# Production build
npm run build
```

## 🔧 Environment Variables

### Backend (.env) - Pre-configured
```
MONGO_URI=mongodb+srv://admin:admin123@cluster0.q6532uz.mongodb.net/Rubies?appName=Cluster0
API_SECRET=dev-secret-key
PORT=5000
```
- Database: `Rubies`
- Collection: `data` (set in code)

### Frontend (.env) - Pre-configured
```
VITE_API_URL=http://localhost:5000/api/transactions
VITE_API_SECRET=dev-secret-key
```

## ✨ Features

- ✅ **TypeScript** - Full type safety across frontend and backend
- 💰 **Income & Expense Tracking** - Track all your financial transactions
- 📊 **Real-time Balance** - See your current balance instantly
- 🎨 **Modern UI** - Beautiful gradient design with Tailwind CSS
- 📱 **Responsive** - Works perfectly on all devices
- 🔄 **Redux State Management** - Efficient state handling
- 🔒 **API Authentication** - Secure API with secret key
- 🗄️ **MongoDB Integration** - Persistent data storage
- ⚡ **Fast Development** - Hot reload with Vite and tsx
- 🎯 **CRUD Operations** - Create, Read, Update, Delete transactions

## 🛠️ Tech Stack

### Backend
- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **tsx** - TypeScript execution for development
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **TypeScript** - Type-safe React
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **Lucide React** - Modern icons
- **date-fns** - Date formatting

## 📦 Deployment

### Deploy Backend to Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add MONGO_URI, API_SECRET

### Deploy Frontend to Render

1. Push code to GitHub
2. Create new Static Site on Render
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**: Add VITE_API_URL, VITE_API_SECRET

## 🔍 API Endpoints

All endpoints require `Authorization` header with your API secret.

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
  ```json
  { "amount": -10.50, "description": "Groceries" }
  ```
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

## 🎯 TypeScript Benefits

- **Type Safety**: Catch errors at compile time
- **IntelliSense**: Better IDE autocomplete
- **Refactoring**: Safer code changes
- **Documentation**: Types serve as documentation
- **Maintainability**: Easier to maintain large codebases

## 📝 Type Definitions

### Transaction Interface
```typescript
interface Transaction {
  _id: string;
  amount: number;
  description: string;
  date: string;
}
```

### State Interface
```typescript
interface TransactionsState {
  list: Transaction[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
```

## 🐛 Troubleshooting

### TypeScript Errors
- Run `npm install` to install all dependencies and type definitions
- Errors will resolve once packages are installed

### Build Errors
- Ensure all `.env` files are properly configured
- Check that MongoDB connection string is valid
- Verify API_SECRET matches in both frontend and backend

### Runtime Errors
- Check browser console for frontend errors
- Check server logs for backend errors
- Verify CORS is properly configured

## 📚 Learn More

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Render Deployment](https://render.com/docs)

## 📄 License

MIT License - feel free to use this project for learning or production!

---

Built with ❤️ using TypeScript, React, Express, and Tailwind CSS
