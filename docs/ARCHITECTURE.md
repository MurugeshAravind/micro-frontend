# Module Federation Architecture

## Visual Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     Browser (localhost:3000)                     │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                    App A (Host)                        │    │
│  │                                                        │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │  Header: "Main Shopping Platform"            │    │    │
│  │  └──────────────────────────────────────────────┘    │    │
│  │                                                        │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │  Remote Module Container                     │    │    │
│  │  │                                               │    │    │
│  │  │  ┌────────────────────────────────────┐     │    │    │
│  │  │  │  ProductCatalog                    │ ◄───┼────┼────┼──┐
│  │  │  │  (Loaded from App B)               │     │    │    │  │
│  │  │  │                                     │     │    │    │  │
│  │  │  │  • Wireless Headphones - $99.99    │     │    │    │  │
│  │  │  │  • Smart Watch - $249.99           │     │    │    │  │
│  │  │  │  • Running Shoes - $79.99          │     │    │    │  │
│  │  │  │  • Coffee Maker - $149.99          │     │    │    │  │
│  │  │  └────────────────────────────────────┘     │    │    │  │
│  │  └──────────────────────────────────────────────┘    │    │  │
│  └────────────────────────────────────────────────────────┘    │  │
└─────────────────────────────────────────────────────────────────┘  │
                                                                      │
                                                                      │
        Webpack Module Federation                                    │
        Dynamic Import at Runtime                                    │
        (not build-time bundling!)                                   │
                                                                      │
                                                                      │
┌─────────────────────────────────────────────────────────────────┐  │
│                     Browser (localhost:3001)                     │  │
│                                                                  │  │
│  ┌────────────────────────────────────────────────────────┐    │  │
│  │                   App B (Remote)                       │    │  │
│  │                                                        │    │  │
│  │  ┌──────────────────────────────────────────────┐    │    │  │
│  │  │  Header: "Product Catalog Service"          │    │    │  │
│  │  └──────────────────────────────────────────────┘    │    │  │
│  │                                                        │    │  │
│  │  ┌──────────────────────────────────────────────┐    │    │  │
│  │  │  Exposed Component:                          │    │    │  │
│  │  │                                               │    │    │  │
│  │  │  ProductCatalog.js  ◄─────────────────────────────┼────┘
│  │  │                                               │    │
│  │  │  • Can run standalone                        │    │
│  │  │  • OR be consumed by App A                   │    │
│  │  │                                               │    │
│  │  │  Exposed via remoteEntry.js                  │    │
│  │  └──────────────────────────────────────────────┘    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
1. User visits App A (localhost:3000)
   │
   ├─► App A loads its own code
   │
   ├─► Webpack detects remote module import
   │
   ├─► Fetches remoteEntry.js from App B (localhost:3001)
   │
   ├─► Loads ProductCatalog component code
   │
   ├─► Shares React instance (singleton)
   │
   └─► Renders ProductCatalog in App A's UI
```

## Key Files

```
App A (Host)
├── webpack.config.js
│   └── remotes: { appBRemote: 'http://localhost:3001/remoteEntry.js' }
│
└── src/App.js
    └── import('appBRemote/ProductCatalog')

App B (Remote)
├── webpack.config.js
│   ├── name: 'appBRemote'
│   ├── filename: 'remoteEntry.js'
│   └── exposes: { './ProductCatalog': './src/components/ProductCatalog' }
│
└── src/components/ProductCatalog.js
    └── Actual component code
```

## Shared Dependencies

```
         React Instance
              │
      ┌───────┴───────┐
      │               │
   App A           App B
  (Host)         (Remote)
      │               │
      └───────┬───────┘
              │
    Loaded only ONCE
    (singleton: true)
```
