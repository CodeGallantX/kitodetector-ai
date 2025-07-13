# Contributing to KitoDeck

We welcome contributions from the community! This guide will help you get started with contributing to our content safety platform.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Git

### Setup Instructions
1. Fork the repository
2. Clone your fork locally:
   ```bash
   git clone https://github.com/codegallantx/kitodeck.git
   cd kitodeck
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠 Development Workflow

### Branch Naming Convention
- `feature/`: New features
- `fix/`: Bug fixes
- `docs/`: Documentation changes
- `refactor/`: Code refactoring
- `test/`: Test-related changes

### Making Changes
1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes following our coding standards
3. Run tests:
   ```bash
   npm test
   ```
4. Commit your changes with a descriptive message:
   ```bash
   git commit -m "feat: add image compression feature"
   ```

## 📝 Coding Standards

### React Components
- Functional components only
- Follow the component structure:
  ```jsx

  const Component = ({ prop1, prop2 }) => {
    // Component logic
    
    return (
      // JSX
    )
  }

  export default Component
  ```

### Styling
- Use Tailwind utility classes primarily
- For complex styles, use CSS Modules
- Follow our design system spacing (4px increments)

## 🧪 Testing

### Writing Tests
- Unit tests: `__tests__` folder adjacent to components
- Integration tests: `tests/integration`
- E2E tests: `tests/e2e`

### Running Tests
```bash
npm test       # Unit tests
npm run test:integration  # Integration tests
npm run test:e2e         # End-to-end tests
npm run test:coverage    # Test coverage report
```

## 🐛 Reporting Bugs

1. Check if the issue already exists
2. Create a new issue using the bug report template
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable
   - Browser/OS information

## 💡 Proposing Features

1. Check existing feature requests
2. Create a new issue using the feature request template
3. Include:
   - Problem description
   - Proposed solution
   - Alternative solutions considered
   - Additional context

## 🔄 Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Open a PR against the `main` branch
4. Include:
   - Description of changes
   - Screenshots for UI changes
   - Reference related issues
5. Request review from maintainers

## 🏆 Recognition

All significant contributions will be:
- Recognized in our contributors list
- Highlighted in release notes
- Eligible for swag after 5 approved PRs

## ❓ Need Help?

Join our [Discord community](https://discord.gg/) or open a discussion on GitHub.

---

Thank you for considering contributing to KitoDeck! Your efforts help make online content safer for everyone.