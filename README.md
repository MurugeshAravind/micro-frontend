# 🚀 Micro Frontend Example - Webpack Module Federation

A complete, production-ready example demonstrating **Webpack Module Federation** with two React applications. Perfect for learning how micro frontends work!

![Module Federation](https://img.shields.io/badge/Module%20Federation-Webpack%205-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![License](https://img.shields.io/badge/license-MIT-green)

## 📺 Live Demo

- **App A (Host)**: http://localhost:3000
- **App B (Remote)**: http://localhost:3001

## 🎯 What You'll Learn

- ✅ How to configure Webpack Module Federation
- ✅ Sharing React components across micro frontends
- ✅ Dynamic remote imports at runtime
- ✅ Singleton pattern for shared dependencies
- ✅ Bootstrap pattern to avoid eager consumption errors
- ✅ Independent deployment strategies

## ⚡ Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/micro-frontend-example.git
cd micro-frontend-example

# 2. Install dependencies and start App B (Remote) - MUST START FIRST
cd app-b-remote
npm install
npm start
# App B will open at http://localhost:3001

# 3. In a new terminal, install and start App A (Host)
cd app-a-host
npm install
npm start
# App A will open at http://localhost:3000
```

**That's it!** Visit http://localhost:3000 to see App A consuming components from App B! 🎉

## 🏗️ Project Structure

```
micro-frontend-example/
│
├── app-a-host/                 # Host Application (Port 3000)
│   ├── src/
│   │   ├── index.js           # Entry point with async bootstrap
│   │   ├── bootstrap.js       # Actual React initialization
│   │   └── App.js             # Main app consuming remote modules
│   ├── public/
│   │   └── index.html
│   ├── webpack.config.js      # Module Federation config (consumer)
│   └── package.json
│
├── app-b-remote/               # Remote Application (Port 3001)
│   ├── src/
│   │   ├── components/
│   │   │   └── ProductCatalog.js  # Exposed component
│   │   ├── index.js           # Entry point with async bootstrap
│   │   ├── bootstrap.js       # Actual React initialization
│   │   └── App.js             # Standalone app
│   ├── public/
│   │   └── index.html
│   ├── webpack.config.js      # Module Federation config (provider)
│   └── package.json
│
└── docs/                       # Documentation
    ├── ARCHITECTURE.md
    ├── TROUBLESHOOTING.md
```

## 🔑 Key Concepts

### Module Federation Configuration

**App A (Host)** - Consumes remote modules:
```javascript
new ModuleFederationPlugin({
  name: 'appAHost',
  remotes: {
    appBRemote: 'appBRemote@http://localhost:3001/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, eager: false },
    'react-dom': { singleton: true, eager: false },
  },
})
```

**App B (Remote)** - Exposes modules:
```javascript
new ModuleFederationPlugin({
  name: 'appBRemote',
  filename: 'remoteEntry.js',
  exposes: {
    './ProductCatalog': './src/components/ProductCatalog',
  },
  shared: {
    react: { singleton: true, eager: false },
    'react-dom': { singleton: true, eager: false },
  },
})
```

### Dynamic Import in App A

```javascript
import React, { Suspense, lazy } from 'react';

// Dynamically import ProductCatalog from App B
const ProductCatalog = lazy(() => import('appBRemote/ProductCatalog'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductCatalog />
    </Suspense>
  );
}
```

## 📚 Documentation

- **[Quick Start Guide](docs/QUICK_START.md)** - Get up and running in 5 minutes
- **[Architecture Overview](docs/ARCHITECTURE.md)** - Visual diagrams and flow charts
- **[Module Federation Explained](docs/MODULE_FEDERATION_EXPLAINED.md)** - Deep dive into configuration
- **[Error Fix Guide](docs/ERROR_FIX.md)** - Common errors and solutions
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - FAQ and debugging tips

## 🛠️ Tech Stack

- **React** 18.2.0
- **Webpack** 5.88.0
- **Babel** 7.22.0
- **Module Federation Plugin** (built into Webpack 5)

## 💡 How It Works

1. **App B** starts and exposes `ProductCatalog` via `remoteEntry.js`
2. **App A** references App B's remote entry in its webpack config
3. When App A runs, it **dynamically fetches** ProductCatalog from App B at runtime
4. React is **shared as a singleton** - both apps use the same React instance
5. The component renders in App A as if it were local code!

## 🎨 Features Demonstrated

- ✅ **Runtime Integration** - Components loaded dynamically, not at build time
- ✅ **Independent Development** - Each app can be developed separately
- ✅ **Independent Deployment** - Update App B without touching App A
- ✅ **Shared Dependencies** - React loaded once, shared by both apps
- ✅ **Standalone Capability** - App B works independently at port 3001
- ✅ **Bootstrap Pattern** - Prevents eager consumption errors

## 🚨 Common Issues

### "Shared module not available for eager consumption"

**Solution**: We use the bootstrap pattern (see [ERROR_FIX.md](docs/ERROR_FIX.md))

### "Invalid Hook Call Warning"

**Solution**: We use `singleton: true` for React (see [MODULE_FEDERATION_EXPLAINED.md](docs/MODULE_FEDERATION_EXPLAINED.md))

### Module Not Found

**Solution**: Ensure App B is running before App A (see [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md))

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests

## 📖 Learn More

### Official Documentation
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [React Documentation](https://react.dev/)

### Related Resources
- [Micro Frontends](https://micro-frontends.org/)
- [Module Federation Examples](https://github.com/module-federation/module-federation-examples)

## 📄 License

MIT License - feel free to use this example for learning and commercial projects!

## ⭐ Star This Repo

If this example helped you understand Module Federation, please give it a star! ⭐

## 🙏 Acknowledgments

Built with ❤️ to demonstrate the power of Webpack Module Federation and micro frontends.

---

**Happy Learning! 🚀**

Questions? Open an issue or check the [documentation](docs/)!
