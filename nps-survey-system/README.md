# NPS Survey System

A complete NPS (Net Promoter Score) survey solution with an embeddable widget and analytics dashboard.

## 🚀 Features

- **Embeddable Widget**: Easy integration with any website via script tag or React component
- **Real-time Dashboard**: Monitor NPS scores, trends, and customer feedback
- **Customizable**: Brand colors, positioning, and targeting options
- **Mobile Responsive**: Works perfectly on all devices
- **API-First**: RESTful API for data collection and retrieval

## 🛠️ Quick Start

### For Website Owners (Embed the Widget)

Add this script to your website:

\`\`\`html
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://your-domain.vercel.app/nps-widget.js';
    script.onload = function() {
      NPSWidget.init({
        apiKey: 'your-api-key',
        position: 'bottom-right',
        primaryColor: '#3b82f6'
      });
    };
    document.head.appendChild(script);
  })();
</script>
\`\`\`

### For React Applications

\`\`\`bash
npm install @your-org/nps-widget
\`\`\`

\`\`\`jsx
import { NPSWidget } from '@your-org/nps-widget'

function App() {
  return (
    <div>
      <NPSWidget
        apiKey="your-api-key"
        position="bottom-right"
        primaryColor="#3b82f6"
      />
    </div>
  )
}
\`\`\`

## 🏗️ Development

\`\`\`bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/nps-survey-system.git

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
\`\`\`

## 📊 Dashboard

Visit `/dashboard` to view:
- Real-time NPS scores
- Response analytics
- Customer feedback
- Embed code generator

## 🔧 Configuration

### Environment Variables

\`\`\`bash
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.com
\`\`\`

### Widget Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | string | required | Your API key |
| `position` | string | 'bottom-right' | Widget position |
| `primaryColor` | string | '#3b82f6' | Brand color |
| `delay` | number | 0 | Show delay in ms |
| `showOnce` | boolean | false | Show only once per user |

## 📡 API Endpoints

- `POST /api/nps-responses` - Submit NPS response
- `GET /api/nps-responses` - Fetch responses (authenticated)
- `POST /api/auth/login` - User authentication

## 🚀 Deployment

This project is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/nps-survey-system)

## 📄 License

MIT License - see LICENSE file for details.
