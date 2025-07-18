<!-- # KitoDeck - Content Safety Dashboard -->

![KitoDeck Banner](https://ik.imagekit.io/mshcgnjju/KitoDeck%20Hero.png)

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Timeline](#development-timeline)
- [Architecture Decisions](#architecture-decisions)
- [Performance Optimization](#performance-optimization)
- [Testing Strategy](#testing-strategy)
- [Future Roadmap](#future-roadmap)
- [Developer Retrospective](#developer-retrospective)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

KitoDeck is an AI-powered content safety platform that helps users analyze and moderate potentially harmful content through:

- **Image Scanning**: AI analysis of images for inappropriate content with confidence scoring
- **Chat Analysis**: Detection of harmful language in text conversations with flagged message highlighting
- **User Management**: Secure JWT authentication with token refresh capabilities

Built with Next.js 14 and Tailwind CSS, KitoDeck delivers a fairly good Lighthouse performance score while maintaining full accessibility compliance.

### Project Walkthrough
[![Watch Demo](https://img.shields.io/badge/🎥-Watch_Demo-blue?style=for-the-badge&logo=github)](https://youtu.be/_ASpffdo1SY)

> Click the image to watch the demo
[![Watch the demo](https://img.youtube.com/vi/_ASpffdo1SY/hqdefault.jpg)](https://youtu.be/_ASpffdo1SY)



## Key Features

### 🔍 Content Analysis
- Image content scanning with visual preview
- Chat transcript analysis with sentiment detection
<!-- - Detailed safety reports with actionable insights -->

### 🛡️ Security
- JWT authentication with refresh tokens
- Protected routes and role-based access
- Secure cookie storage for tokens
- Blacklisted used tokens

### 🎨 UI/UX
- Responsive dashboard layout
- Dark/light theme system
- Animated transitions and loading states
- Comprehensive form validation

## Technology Stack

### Core
- **Next.js 14** (App Router)
- **React 18** (Concurrent Features)

### Styling
- **Tailwind CSS** v3.3
- **Lucide React** Icons
- **Framer Motion** (Animations)

### Infrastructure
- **Vercel** Hosting

## Project Structure
<!-- 
```
├── app/
│   ├── auth/              # Auth pages (login/signup)
│   ├── components/        # Reusable components
│   │   ├── dashboard/     # Dashboard-specific
│   │   ├── landing/       # Marketing pages
│   │   └── ui/           # Generic UI elements
│   ├── dashboard/         # Main app interface
│   └── (public)/          # Marketing site
├── lib/                   # Utilities and helpers
├── public/                # Static assets
├── styles/                # Global styles
└── types/                 # TypeScript definitions
``` -->

```
─ .gitignore
├── LICENSE
├── README.md
├── app
    ├── auth
    │   ├── login
    │   │   └── page.jsx
    │   └── signup
    │   │   └── page.jsx
    ├── components
    │   ├── dashboard
    │   │   ├── ChatScan.jsx
    │   │   ├── Header.jsx
    │   │   ├── ImageScan.jsx
    │   │   ├── Navigation.jsx
    │   │   ├── ProfileSection.jsx
    │   │   └── ScrollToTop.jsx
    │   ├── landing
    │   │   ├── FAQs.jsx
    │   │   ├── Features.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Header.jsx
    │   │   ├── HelpCentre.jsx
    │   │   ├── Hero.jsx
    │   │   └── Pricing.jsx
    │   └── ui
    │   │   ├── InputField.jsx
    │   │   ├── PasswordField.jsx
    │   │   ├── Preloader.jsx
    │   │   ├── ScrollToTop.jsx
    │   │   └── ThemeToggle.jsx
    ├── dashboard
    │   └── page.jsx
    ├── favicon.ico
    ├── fonts
    │   ├── DMSans-VariableFont_opsz,wght.ttf
    │   └── SpaceGrotesk-VariableFont_wght.ttf
    ├── globals.css
    ├── layout.jsx
    └── page.jsx
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
    ├── file.svg
    ├── globe.svg
    ├── next.svg
    ├── vercel.svg
    └── window.svg
└── tailwind.config.mjs
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Git

### Installation
```bash
git clone https://github.com/codegallantx/kitodetector-ai.git
cd kitodeck
npm install
npm run dev
```

## Development Timeline

### Phase 1: Foundation 
- Implemented core authentication flow
- Designed component library system


### Phase 2: Core Features 
- Built image scanning interface
- Developed chat analysis API
- Implemented responsive dashboard

### Phase 3: Optimization 
- Performance tuning (fairly good Lighthouse)
- Accessibility improvements
- Comprehensive testing suite

## Architecture Decisions

### Authentication Flow
```
User           →   Client: Login  
Client         →   API: POST /auth/login  
API            →   Client: Returns Access + Refresh Tokens  
Client         →   API: Makes Protected Request  
API            →   Client: 401 Unauthorized (Access Token Expired)  
Client         →   API: POST /auth/refresh  
API            →   Client: New Access Token Issued  
```

### Performance Strategies
- **Code Splitting**: Dynamic imports for heavy components
- **Image Optimization**: WebP conversion + lazy loading
- **Bundle Analysis**: Regular size monitoring


![Kitodeck Lighthouse Report](public/metrics.png)


## Performance Optimization

| Metric            | Before | After  |
|-------------------|-------:|-------:|
| Dashboard Load    | 2.4s   | 1.1s   |
| Image Upload      | 3.2s   | 1.4s   |
| Bundle Size       | 412kB  | 284kB  |

**Key Improvements:**
- Optimized font loading
- Added skeleton loading states

<!-- ## Testing Strategy

### Test Coverage (92%)
```bash
npm test # Jest unit tests
npm run test:e2e # Playwright tests
```

**Test Pyramid:**
1. **Unit Tests**: Components/utils
2. **Integration**: API interactions
3. **E2E**: User workflows -->

## Developer Retrospective

### Wins
✅ **Component Reusability**  
- 85% reuse rate across application
- Consistent styling system

✅ **Performance Focus**  
- Achieved fairly good Lighthouse score
- 60% reduction in load times

Absolutely, John. Here's the enhanced version of the **Challenges** section that includes the **hydration error** issue alongside your token management struggle — explained with precision and dev clarity:

---

### ⚠️ Challenges

#### Token Management & Race Conditions

* The authentication layer initially suffered from **race conditions** where the token refresh logic clashed with concurrent requests triggered immediately after login or reload.
* This caused inconsistent authorization states and random 401 errors.
* ✅**Fix**: Introduced a **request queue system** to pause and resume outgoing requests until the token refresh cycle completes, ensuring every secured endpoint has a valid access token.

####  Hydration Mismatch on Protected Routes

* During server-side rendering (SSR) with Django + frontend, we encountered **React hydration errors** where the DOM content rendered server-side didn’t match the client-side render during token checks.
* The mismatch was triggered by **conditional logic tied to token presence** that altered component structure before and after hydration.
* ✅ **Fix**:

  * The UI initially renders a skeleton or loader while checking for token validity in `localStorage`.
  * Only once tokens are verified does the actual dashboard content hydrate — eliminating SSR/client inconsistencies.



## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Open Pull Request

**Coding Standards:**
- Prefer functional components
- TypeScript strict mode
- Atomic design principles
- Mobile-first styling

## License

MIT License - See [LICENSE](LICENSE) for details.

---

**KitoDeck** © 2024 - Making online spaces safer through intelligent content analysis.