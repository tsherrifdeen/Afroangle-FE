# Afroangle Frontend

A modern, multilingual content platform built with **Next.js 14** and **Sanity CMS**. Afroangle showcases African perspectives, stories, and opinions through a beautifully designed web experience.

## 🌟 Features

- **Multilingual Support**: Full internationalization (i18n) with English and French localization
- **Rich Content Management**: Integration with Sanity CMS for dynamic content management
- **Article Management**: Browse, search, and read articles with advanced filtering by categories and authors
- **Author Profiles**: Dedicated author pages with biographies and social links
- **User Comments**: Interactive comment system for community engagement
- **Search Functionality**: Full-text search across articles and content
- **Audio Generation**: Convert articles to audio for accessibility
- **Opinion Submissions**: Allow users to submit opinion pieces and content
- **Email Subscriptions**: Newsletter integration via Brevo
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Dynamic sitemap, meta tags, and robots.txt configuration

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **CMS**: [Sanity](https://www.sanity.io/)
- **Styling**: CSS Modules with PostCSS
- **Internationalization**: Built-in i18n with locale-based routing
- **TypeScript**: Full type safety across the project
- **API Integrations**: Brevo (Email), Translation APIs, Audio Generation
- **Admin**: Sanity Studio for content management

## 📁 Project Structure

```
afroangle-fe/
├── app/                      # Next.js App Router
│   ├── [locale]/            # Locale-based routing
│   │   ├── articles/        # Article pages
│   │   ├── authors/         # Author profiles
│   │   ├── categories/      # Category pages
│   │   ├── search/          # Search functionality
│   │   └── submit-piece/    # Content submission
│   ├── api/                 # API routes
│   │   ├── comment/         # Comment endpoints
│   │   ├── generate-audio/  # Audio generation
│   │   ├── submit-piece/    # Submission handling
│   │   ├── subscribe/       # Newsletter subscription
│   │   └── translate/       # Translation service
│   └── admin/               # Sanity Studio dashboard
├── components/              # React components
│   ├── ArticlePage/        # Article-related components
│   ├── AuthorPage/         # Author-related components
│   ├── HomePage/           # Homepage components
│   ├── SanityComponents/   # Custom Sanity renderers
│   └── common/             # Reusable components
├── sanity/                 # Sanity CMS configuration
│   ├── schemaTypes/        # Content type definitions
│   ├── queries/            # GROQ queries
│   ├── services/           # Sanity API services
│   └── structure.ts        # Studio structure
├── lib/                    # Utility functions
├── utils/                  # Helper utilities
└── public/                 # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account and project credentials

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/thebrickfirm-source/Afroangle-FE.git
   cd Afroangle-FE
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory with the following:

   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=your_dataset
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_TOKEN=your_api_token
   NEXT_PUBLIC_SANITY_STUDIO_TITLE=Afroangle Studio
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking
npm run type-check
```

## 🔄 Internationalization (i18n)

The application supports multiple languages through locale-based routing:

- **English**: `/en/*`
- **French**: `/fr/*`

Locale switching is handled via the `Languageswitcher` component. Dictionaries are stored in `dictionaries/` directory in JSON format.

## 📚 API Routes

### Comment System

- `POST /api/comment` - Submit a new comment

### Audio Generation

- `POST /api/generate-audio` - Convert article text to audio

### Content Submission

- `POST /api/submit-piece` - Submit an opinion piece

### Newsletter

- `POST /api/subscribe` - Subscribe to newsletter

### Translation

- `POST /api/translate` - Translate content

## 🗂️ Sanity CMS Integration

The project uses Sanity as the headless CMS. Content types include:

- **Articles**: Blog posts and news articles
- **Authors**: Contributor profiles with social links
- **Categories**: Content categorization
- **Comments**: User comments on articles
- **Opinion Pieces**: Submitted user opinions
- **Social Media Posts**: Social media integration

### Access Sanity Studio

The Sanity Studio is available at `/admin`:

```
http://localhost:3000/admin
```

### Key Queries

- [Articles Query](sanity/queries/articles.ts)
- [Authors Query](sanity/queries/authors.ts)
- [Categories Query](sanity/queries/categories.ts)
- [Comments Query](sanity/queries/comments.ts)

## 🎨 Component Architecture

### Page Components

- `HomePage` - Landing page with featured content
- `ArticlePage` - Dynamic article display with metadata
- `AuthorPage` - Author profiles and their articles
- `CategoryPage` - Category-specific article listings
- `SearchPage` - Search results interface
- `SubmitPiecePage` - Content submission form
- `AboutPage` - About Afroangle

### Common Components

- `Header` - Navigation and branding
- `Footer` - Footer with links
- `ArticleList` - Article grid/list view
- `NewsLetterSignUp` - Email subscription
- `ShareButton` - Social sharing
- `CategoryNav` - Category navigation

## 🔐 Environment Variables

| Variable                          | Description                                 | Required |
| --------------------------------- | ------------------------------------------- | -------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`   | Sanity project ID                           | Yes      |
| `NEXT_PUBLIC_SANITY_DATASET`      | Sanity dataset name                         | Yes      |
| `NEXT_PUBLIC_SANITY_API_VERSION`  | Sanity API version                          | Yes      |
| `SANITY_API_TOKEN`                | Sanity API token for server-side operations | Yes      |
| `SANITY_API_WRITE_TOKEN`          | Sanity API token for file uploads           | Yes      |
| `NEXT_PUBLIC_SANITY_STUDIO_TITLE` | Studio app title                            | No       |
| `NEXT_PUBLIC_URL`                 | Base URL for the application                | No       |
| `BREVO_API_KEY`                   | Brevo email service API key                 | No       |
| `DEEPL_API_KEY`                   | DeepL translation API key                   | No       |

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 License

This project is proprietary software owned by [The Brick Firm](https://github.com/thebrickfirm-source).

## 👥 Support

For questions or issues, please contact the development team or open an issue on GitHub.
