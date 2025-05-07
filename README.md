# BINI COLET's MARKET

A full-stack e-commerce platform for BINI COLET's BUY & SELL MARKET, featuring secure payments through GCash and Binance, with Telegram integration for order management.

## 🌟 Features

- 💻 Responsive web interface
- 🌓 Dark/Light theme support
- 🔍 Real-time search and sorting
- 💳 Multiple payment methods (GCash, Binance)
- 📱 Telegram integration for order notifications
- 🔐 Secure admin panel
- 📸 Image upload support
- 📦 Stock management

## 🚀 Live Demo

Visit [https://bini-market.onrender.com](https://bini-market.onrender.com)

## 🛠️ Tech Stack

- Frontend:
  - HTML5
  - CSS3
  - JavaScript (Vanilla)
  
- Backend:
  - Node.js
  - Express.js
  - PostgreSQL
  
- Integrations:
  - Telegram Bot API
  - Cloudinary (for image hosting)
  
- Deployment:
  - Render
  - Neon (PostgreSQL)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm
- PostgreSQL
- Telegram Bot Token
- Git

## ⚙️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bini-market.git
cd bini-market
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://Ocho%20Database_owner:npg_5BDhT1UzSWRA@ep-morning-frog-a10qopdc-pooler.ap-southeast-1.aws.neon.tech/Ocho%20Database?sslmode=require
TELEGRAM_BOT_TOKEN=7762890246:AAH0gl9zd4bTe8u43zhVtihYiuYQYkAtsf4
TELEGRAM_ADMIN_ID=7057793599
```

4. Start the development server:
```bash
npm run dev
```

## 🚀 Deployment

### Deploy to Render

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Create New Web Service
4. Connect GitHub repository
5. Configure:
   - Build Command: `npm install`
   - Start Command: `node server/index.js`
6. Add environment variables
7. Deploy

## 👥 Admin Access

- Email: coletbini2025@gmail.com
- Password: coletbini2025

## 💳 Payment Methods

### GCash
- Number: 09764595236

### Binance
- ID: 1095880042

## 📱 Telegram Integration

- Admin Username: @coletsbini
- Bot: @Coletseller_bot

## 🗂️ Project Structure

```
bini-market/
├── client/
│   ├── public/
│   │   ├── images/
│   │   ├── css/
│   │   ├── js/
│   │   └── index.html
│   └── src/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── index.js
└── package.json
```

## 🔄 API Endpoints

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post (Admin)
- `POST /api/submit-payment` - Submit payment proof

## 🎨 Features Details

### Theme Toggle
- Supports dark/light mode
- Persists user preference

### Search & Sort
- Real-time search functionality
- Sort by:
  - Newest First
  - Price: Low to High
  - Price: High to Low

### Payment Process
1. User selects payment method
2. Uploads payment screenshot
3. Provides Telegram username
4. Admin verifies through Telegram

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

BINI COLET - [@coletsbini](https://t.me/coletsbini)

Project Link: [https://github.com/AaronOcho/bini-market](https://github.com/AaronOcho/bini-market)