# Profile Website

A modern, resume-style profile website built with Angular 21, featuring automated translation, print-to-PDF functionality, and a built-in CMS for content management.

## Features

- **Modern Tech Stack**: Angular 21, Tailwind CSS, TypeScript
- **Automated Translation**: French (default) and English support using Transloco
- **Print to PDF**: Generate a formatted resume PDF optimized for ATS scanning
- **Built-in CMS**: Manage content directly in the browser using localStorage
- **Section Management**: Toggle visibility and customize sections
- **Component Library**: Storybook integration for component development
- **Testing**: Jest for unit tests, Playwright for E2E testing
- **Code Quality**: SonarQube integration for quality and security monitoring
- **Cloud Deployment**: Configured for Cloudflare Pages

## Tech Stack

- **Framework**: Angular 21 with standalone components
- **Styling**: Tailwind CSS
- **Translation**: @jsverse/transloco
- **PDF Generation**: html2pdf.js
- **Testing**:
  - Unit: Jest + jest-preset-angular
  - E2E: Playwright
- **Component Development**: Storybook 10
- **Code Quality**: SonarQube Scanner
- **Deployment**: Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 11.x or higher

### Installation

```bash
cd profile-website
npm install
```

### Development

```bash
# Start development server
npm start

# Open http://localhost:4200
```

### Testing

```bash
# Run unit tests
npm test

# Run unit tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

### Storybook

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

### Building

```bash
# Development build
npm run build

# Production build
npm run build:prod
```

## Project Structure

```
src/
├── app/
│   ├── cms/                    # CMS models and services
│   │   ├── models/
│   │   │   └── profile.model.ts
│   │   └── services/
│   │       └── cms.service.ts
│   ├── core/                   # Core services
│   │   └── services/
│   │       └── print.service.ts
│   ├── features/               # Feature components
│   │   ├── profile.component.ts
│   │   ├── profile.component.html
│   │   └── profile.component.css
│   ├── app.ts                  # Root component
│   ├── app.config.ts           # App configuration
│   └── app.routes.ts           # Route configuration
├── assets/
│   └── i18n/                   # Translation files
│       ├── en.json
│       └── fr.json
└── styles.css                  # Global styles

```

## Content Management

The website includes a lightweight CMS that stores content in the browser's localStorage. This allows you to:

- Update profile information
- Add/remove/reorder sections
- Toggle section visibility
- Add custom sections
- Export/import data as JSON

All content is managed client-side, so there's no backend dependency.

## Translation

The site supports French (default) and English. Toggle between languages using the language switcher in the header.

Translation files are located in `src/assets/i18n/`:
- `fr.json` - French translations
- `en.json` - English translations

## Print Functionality

Click the "Print Resume" button to generate a PDF version of your profile. The PDF is:
- Optimized for A4 paper size
- Formatted for ATS (Applicant Tracking System) compatibility
- Includes proper page breaks to avoid splitting sections
- Excludes UI elements (buttons, controls) from the output

## Deployment

### Cloudflare Pages

The project is configured for Cloudflare Pages deployment:

1. Build command: `npm run build:prod`
2. Build output directory: `dist/profile-website/browser`
3. Node version: 20 (specified in `.nvmrc`)

Configuration files:
- `wrangler.toml` - Cloudflare Pages configuration
- `public/_redirects` - SPA routing support
- `.nvmrc` - Node version specification

## Code Quality

### SonarQube

Run SonarQube analysis:

```bash
npm run sonar
```

Configuration is in `sonar-project.properties`.

### Test Coverage

Generate coverage reports:

```bash
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory.

## Development Workflow

1. **Make changes** to components or services
2. **Run tests** to ensure nothing breaks
3. **Build** the project to verify production build
4. **Deploy** to Cloudflare Pages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project - All rights reserved

## Notes

- The CMS is development-only in terms of UI, but the data persists in localStorage
- Production builds exclude development tools but include the CMS service for content rendering
- Translation files are included in the production bundle
- PDF generation works entirely client-side with no server dependency
