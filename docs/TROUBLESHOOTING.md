# Troubleshooting Guide

## Common Issues and Solutions

### 1. "Uncaught Error: Module not found"

**Problem**: App A can't find the remote module from App B

**Solutions**:
- ✅ Ensure App B is running FIRST (start on port 3001)
- ✅ Check that remoteEntry.js is accessible at `http://localhost:3001/remoteEntry.js`
- ✅ Verify the remote name matches in both configs (`appBRemote`)
- ✅ Check for typos in the exposed module path

```bash
# Test if remoteEntry.js is accessible
curl http://localhost:3001/remoteEntry.js
```

### 2. "Invalid Hook Call Warning"

**Problem**: Multiple React instances loaded

**Solution**:
Ensure `singleton: true` in shared dependencies:

```javascript
shared: {
  react: { singleton: true, requiredVersion: '^18.2.0' },
  'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
}
```

### 3. Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions**:
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or change port in webpack.config.js
devServer: {
  port: 3002,  // Use different port
}
```

### 4. Changes Not Reflecting

**Problem**: Updates in App B not showing in App A

**Solutions**:
- ✅ Hard refresh App A (Ctrl+Shift+R or Cmd+Shift+R)
- ✅ Clear browser cache
- ✅ Restart both dev servers
- ✅ Check browser DevTools for cached resources

### 5. CORS Errors

**Problem**: Cross-origin request blocked

**Solution**:
Add CORS headers in webpack dev server:

```javascript
devServer: {
  port: 3001,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
}
```

### 6. Component Not Loading (Blank Screen)

**Problem**: ProductCatalog shows loading spinner indefinitely

**Checklist**:
1. Is App B running? Check `http://localhost:3001`
2. Open browser DevTools → Network tab
3. Look for `remoteEntry.js` request - did it succeed?
4. Check Console for errors
5. Verify the expose path in App B's webpack config matches import in App A

### 7. Different React Versions

**Problem**: Version mismatch between apps

**Solution**:
Use the same React version in both package.json files:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

### 8. Build Fails

**Problem**: Webpack build errors

**Common causes**:
- Missing dependencies: `npm install`
- Wrong Node version: Use Node 16+ (`node --version`)
- Syntax errors in webpack.config.js
- Missing babel presets

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 16+
```

### 9. Slow Loading

**Problem**: App takes too long to load remote modules

**Optimizations**:
- Use production builds: `npm run build`
- Enable webpack caching
- Minimize shared dependencies
- Use CDN for static assets

### 10. TypeScript Errors

**Problem**: Type definitions not found for remote modules

**Solution**:
Create type declarations:

```typescript
// app-a-host/src/types/remote-modules.d.ts
declare module 'appBRemote/ProductCatalog' {
  const ProductCatalog: React.ComponentType;
  export default ProductCatalog;
}
```

## Debugging Tips

### 1. Check remoteEntry.js

Visit `http://localhost:3001/remoteEntry.js` directly to verify it loads

### 2. Inspect Network Tab

Look for:
- `remoteEntry.js` - should return 200
- Chunk files loading from App B
- No 404 errors

### 3. Console Logging

Add logs to verify module loading:

```javascript
// In App A
const ProductCatalog = lazy(() => {
  console.log('Loading ProductCatalog from App B...');
  return import('appBRemote/ProductCatalog');
});
```

### 4. Webpack Bundle Analyzer

Add to webpack config to visualize bundles:

```bash
npm install --save-dev webpack-bundle-analyzer
```

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

plugins: [
  new BundleAnalyzerPlugin()
]
```

## Still Having Issues?

1. Check the browser console for errors
2. Review webpack.config.js for typos
3. Ensure both apps have matching shared dependency versions
4. Try the example apps in this repo first to verify setup
5. Check Webpack Module Federation documentation

## Quick Health Check

Run this checklist:

- [ ] App B is running on port 3001
- [ ] `http://localhost:3001/remoteEntry.js` is accessible
- [ ] App A is running on port 3000
- [ ] Both apps use same React version
- [ ] `singleton: true` in shared dependencies
- [ ] No console errors in browser DevTools
- [ ] Remote name matches: `appBRemote` in both configs

If all boxes are checked, Module Federation should work! 🎉
