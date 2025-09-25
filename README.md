# Draft.js JSON Previewer

A simple web tool that converts Draft.js raw content state (JSON) into live HTML preview. Perfect for developers working with Draft.js who need to quickly visualize their editor's content state or debug formatting issues.

## What it does

- **Input**: Paste your Draft.js raw content state JSON
- **Output**: Live HTML preview with proper formatting
- **Features**: Real-time conversion, error handling, sample data included

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the app:
   ```bash
   npm run dev
   ```

## Live Demo

🌐 **[View Live Demo](https://killerwolf.github.io/draft-to-html-previewer/)**

## Contributing

Found a bug or want to add a feature? Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development

### Code Quality
This project uses [Biome](https://biomejs.dev/) for fast formatting and linting:

```bash
# Format code
npm run format

# Lint and fix issues
npm run lint

# Check everything (format + lint)
npm run check

# CI check (no fixes, fails on errors)
npm run ci
```

### Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Biome** - Fast formatter and linter
- **draftjs-to-html** - Draft.js conversion library
