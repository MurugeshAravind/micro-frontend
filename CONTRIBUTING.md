# Contributing to Micro Frontend Example

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Bugs 🐛

If you find a bug, please open an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Your environment (Node version, OS, browser)
- Screenshots if applicable

### Suggesting Features 💡

Feature requests are welcome! Please:
- Check existing issues first
- Describe the feature and use case
- Explain why it would be useful

### Submitting Pull Requests 🔧

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
   - Ensure both apps start without errors
   - Verify Module Federation still works
   - Test in multiple browsers if UI changes
5. **Commit with clear messages**
   ```bash
   git commit -m "Add: New feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request**

### Code Style

- Use consistent formatting (Prettier recommended)
- Follow existing code patterns
- Add comments for complex logic
- Keep commits atomic and focused

### Documentation

If your changes require documentation updates:
- Update README.md if needed
- Add or update relevant docs in `/docs`
- Include code examples where helpful

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/micro-frontend-example.git

# Install dependencies
cd app-a-host && npm install
cd ../app-b-remote && npm install

# Start development servers
# Terminal 1
cd app-b-remote && npm start

# Terminal 2
cd app-a-host && npm start
```

## Questions?

Feel free to open an issue for any questions!

Thank you for contributing! 🙌
