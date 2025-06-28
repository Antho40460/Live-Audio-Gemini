# Live Audio Gemini - Multi-Tenant SaaS Platform

A production-ready SaaS platform for creating and embedding intelligent voice chat bots powered by Google Gemini AI.

## 🚀 Features

- **Multi-tenant Architecture**: Secure user isolation with Prisma and NextAuth.js
- **Voice AI Integration**: Real-time voice conversations with Google Gemini
- **Visual Bot Studio**: Drag-and-drop customization with theme editor
- **Knowledge Base**: Upload PDFs/CSVs for contextual AI responses
- **Easy Embedding**: One-line iframe embed + WordPress plugin
- **Usage-based Billing**: Stripe integration with metered pricing
- **Enterprise Security**: JWT-based auth, CORS protection, GDPR compliance
- **Real-time Analytics**: Detailed usage insights and performance metrics

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, Shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Railway/Neon/Vercel Postgres)
- **Authentication**: NextAuth.js with Google OAuth + Magic Links
- **AI**: Google Gemini API for voice and text processing
- **Payments**: Stripe with webhook integration
- **3D Graphics**: React Three Fiber for interactive landing page
- **Real-time**: Socket.IO for live audio streaming

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Railway, Neon, or Vercel Postgres)
- Stripe account for payments
- Google AI Studio account for Gemini API
- Google Cloud Console for OAuth (optional)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd live-audio-gemini-saas
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `DATABASE_URL` - Your PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret for NextAuth.js
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `GEMINI_API_KEY` - Google Gemini API key

### 3. Database Setup

Initialize your database:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with default plans
npm run db:seed
```

### 4. Stripe Configuration

1. Create products and prices in your Stripe dashboard
2. Update the `stripePriceId` fields in your database plans
3. Set up webhook endpoint: `https://your-domain.com/api/webhooks/stripe`
4. Configure webhook events: `customer.subscription.*`, `invoice.payment_*`

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── landing/          # Landing page sections
│   └── dashboard/        # Dashboard components
├── lib/                  # Utility libraries
├── prisma/              # Database schema and migrations
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## 🔧 Key Components

### Authentication
- NextAuth.js with Google OAuth and magic links
- JWT-based sessions with role-based access
- Secure middleware protection for dashboard routes

### Database Schema
- **Users**: Authentication and billing information
- **Plans**: Subscription tiers with features
- **Bots**: Voice bot configurations and settings
- **Sessions**: Usage tracking for billing
- **Files**: Knowledge base file management

### Bot Studio (Coming Soon)
- Visual theme editor with real-time preview
- AI-powered system prompt assistant
- Knowledge base file upload and processing
- Voice configuration and testing

### Dashboard
- Usage analytics with charts and metrics
- Subscription management and billing
- Bot creation and management
- File upload and knowledge base management

### Embedding System
- Secure iframe embedding with JWT authentication
- CORS configuration for domain whitelisting
- Real-time usage tracking

### Billing & Usage
- Stripe subscription management
- Metered billing based on conversation minutes
- Usage tracking with detailed analytics
- Automatic credit deduction and renewal

## 🔒 Security Features

- **JWT Authentication**: Secure session management with NextAuth.js
- **Database Security**: Prisma ORM with parameterized queries
- **CORS Protection**: Domain whitelisting for embeds
- **Rate Limiting**: API protection against abuse
- **Data Encryption**: All data encrypted in transit and at rest

## 📊 Analytics & Monitoring

- Real-time usage tracking
- Conversation analytics and insights
- Performance monitoring with Sentry
- Stripe webhook event logging
- User engagement metrics

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Database Providers

**Railway** (Recommended for development):
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and create project
railway login
railway init
railway add postgresql

# Get connection string
railway variables
```

**Neon** (Recommended for production):
1. Create account at neon.tech
2. Create new project
3. Copy connection string to `DATABASE_URL`

**Vercel Postgres**:
1. Add Postgres to your Vercel project
2. Copy connection string from dashboard

## 🔌 WordPress Plugin (Coming Soon)

The included WordPress plugin will provide:

- Easy bot embedding via shortcode
- Admin settings panel
- Automatic token generation
- Responsive design integration

## 📚 API Documentation

### Bot Embedding API

```
GET /api/embed/:botSlug?token=:token
```

Returns bot configuration and authentication for embedding.

### Usage Tracking API

```
POST /api/usage/track
```

Records conversation minutes for billing purposes.

### Webhook Endpoints

```
POST /api/webhooks/stripe
```

Handles Stripe subscription and payment events.

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run linting
npm run lint
```

## 📈 Scaling Considerations

- **Database**: Use connection pooling for high traffic
- **File Storage**: Implement CDN for knowledge base files
- **Rate Limiting**: Add Redis-based rate limiting
- **Monitoring**: Set up alerts for usage spikes and errors
- **Caching**: Implement Redis caching for frequently accessed data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- Documentation: [docs.liveaudiogemini.com](https://docs.liveaudiogemini.com)
- Community: [community.liveaudiogemini.com](https://community.liveaudiogemini.com)
- Email: support@liveaudiogemini.com

## 🗺 Roadmap

- [ ] Bot Studio with visual editor
- [ ] WordPress plugin
- [ ] Multi-language support for dashboard
- [ ] Advanced analytics and reporting
- [ ] Integration marketplace
- [ ] Mobile app for bot management
- [ ] Voice cloning capabilities
- [ ] Advanced conversation flows
- [ ] A/B testing for bot responses
- [ ] Enterprise SSO integration

---

Built with ❤️ for the future of AI conversations.