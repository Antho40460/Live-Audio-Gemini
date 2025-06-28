# Live Audio Gemini - Multi-Tenant SaaS Platform

A production-ready SaaS platform for creating and embedding intelligent voice chat bots powered by Google Gemini AI.

## 🚀 Features

- **Multi-tenant Architecture**: Secure user isolation with Row-Level Security
- **Voice AI Integration**: Real-time voice conversations with Google Gemini
- **Visual Bot Studio**: Drag-and-drop customization with theme editor
- **Knowledge Base**: Upload PDFs/CSVs for contextual AI responses
- **Easy Embedding**: One-line iframe embed + WordPress plugin
- **Usage-based Billing**: Stripe integration with metered pricing
- **Enterprise Security**: CORS protection, token-based auth, GDPR compliance
- **Real-time Analytics**: Detailed usage insights and performance metrics

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, Shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **AI**: Google Gemini API for voice and text processing
- **Payments**: Stripe with webhook integration
- **3D Graphics**: React Three Fiber for interactive landing page
- **Real-time**: Socket.IO for live audio streaming

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Stripe account for payments
- Google AI Studio account for Gemini API

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
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `GEMINI_API_KEY` - Google Gemini API key

### 3. Database Setup

Initialize your Supabase database:

```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Push database schema
supabase db push

# Generate TypeScript types
npm run db:generate
```

### 4. Stripe Configuration

1. Create products and prices in your Stripe dashboard
2. Update the `stripe_price_id` fields in the `plans` table
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
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── embed/            # Bot embedding endpoints
│   └── api/              # API routes
├── components/           # React components
│   ├── ui/              # Shadcn/ui components
│   ├── landing/         # Landing page sections
│   ├── dashboard/       # Dashboard components
│   └── bot/             # Bot-related components
├── lib/                 # Utility libraries
├── supabase/           # Database migrations and functions
├── types/              # TypeScript type definitions
└── public/             # Static assets
```

## 🔧 Key Components

### Bot Studio
- Visual theme editor with real-time preview
- System prompt assistant powered by Gemini
- Knowledge base file upload and processing
- Voice configuration and testing

### Dashboard
- Usage analytics with charts and metrics
- Subscription management and billing
- Bot creation and management
- File upload and knowledge base management

### Embedding System
- Secure iframe embedding with token authentication
- WordPress plugin for easy integration
- CORS configuration for domain whitelisting
- Real-time usage tracking

### Billing & Usage
- Stripe subscription management
- Metered billing based on conversation minutes
- Usage tracking with detailed analytics
- Automatic credit deduction and renewal

## 🔒 Security Features

- **Row-Level Security**: Database-level user isolation
- **Token-based Auth**: Secure bot access with signed JWTs
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

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔌 WordPress Plugin

The included WordPress plugin (`/wordpress-plugin/`) provides:

- Easy bot embedding via shortcode
- Admin settings panel
- Automatic token generation
- Responsive design integration

Installation:
1. Upload plugin ZIP to WordPress
2. Configure API credentials in settings
3. Use shortcode: `[live-audio-gemini bot="your-bot-slug"]`

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

- **Database**: Supabase automatically scales PostgreSQL
- **File Storage**: Supabase Storage with CDN distribution
- **Edge Functions**: Auto-scaling serverless functions
- **Rate Limiting**: Implement Redis-based rate limiting for high traffic
- **Monitoring**: Set up alerts for usage spikes and errors

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