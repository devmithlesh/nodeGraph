# React Flow Node Editor

An interactive node editor built with React Flow, featuring auto-layout, node management, and custom components.

## 🚀 Features

- **Auto-layout Mode**: Automatic node positioning using dagre
- **Node Selection**: Click nodes to view details and manage them
- **Node Details Panel**: View type, ID, and data for selected nodes
- **Add Child Nodes**: Add valid child node types based on business rules
- **Delete Nodes**: Remove nodes and all their descendants
- **Custom Components**: Each node type has distinct visual styling
- **Unique IDs**: UUID-based unique identifiers for all nodes
- **Zoom Controls**: In, out, fit view, reset, and auto-layout
- **Connection Validation**: Prevents invalid connections with user feedback
- **Visual Feedback**: Selected nodes, connection guides, and animations

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd my-project

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📦 Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview

# Serve production build locally
npm run serve

# Build and serve in one command
npm run deploy
```

## 🚀 Deployment

### Netlify

1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy automatically on push to main branch

### Vercel

1. Connect your repository to Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy automatically on push to main branch

### GitHub Pages

1. Enable GitHub Pages in repository settings
2. Set source to GitHub Actions
3. Push to trigger deployment

### Manual Deployment

```bash
# Build the project
npm run build

# Upload the contents of the 'dist' folder to your web server
```

## 🎯 Usage

### Creating Nodes
- Use the sidebar to add Account or Loan nodes (root nodes)
- Click on any node to open the details panel
- Use the "Add Child Node" buttons to create child nodes

### Connecting Nodes
- Drag from a node's bottom handle (output) to another node's top handle (input)
- Valid connections:
  - Account → Loan, Collateral
  - Loan → Collateral
  - Collateral → (no children)

### Managing Nodes
- Click any node to select it and view details
- Use the side panel to add child nodes or delete the selected node
- Delete operations remove the node and all its descendants

### View Controls
- Use the control panel for zoom in/out, fit view, and reset
- Auto-layout is applied automatically when nodes are added/connected/deleted
- Manual auto-layout button available in the control panel

## 🏗️ Project Structure

```
src/
├── components/
│   ├── CustomPanel.jsx          # Control panel with zoom and layout controls
│   ├── NodeDetailsPanel.jsx     # Side panel for node details and actions
│   ├── Sidebar.jsx              # Left sidebar for adding root nodes
│   └── NodeTypes/
│       ├── AccountNode.jsx      # Account node component
│       ├── LoanNode.jsx         # Loan node component
│       └── CollateralNode.jsx   # Collateral node component
├── store/
│   └── nodeStore.js             # Zustand store for state management
├── utils/
│   ├── layoutUtils.js           # Auto-layout utilities using dagre
│   ├── nodeRules.js             # Business rules for node connections
│   └── nodeTypes.js             # Node type definitions
└── App.jsx                      # Main application component
```

## 🔧 Configuration

### Node Rules
Edit `src/utils/nodeRules.js` to modify allowed connections:

```javascript
export const allowedChildMap = {
  account: ['loan', 'collateral'],
  loan: ['collateral'],
  collateral: [],
};
```

### Layout Settings
Modify `src/utils/layoutUtils.js` to change auto-layout behavior:

```javascript
// Change direction: 'TB' (top-bottom), 'LR' (left-right)
export const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  // ... layout logic
};
```

## 📊 Build Output

The build process generates optimized files in the `dist` directory:

- `index.html` - Main HTML file
- `assets/index-*.js` - Bundled JavaScript (minified)
- `assets/index-*.css` - Bundled CSS (minified)

## 🔒 Security

The application includes security headers for production deployments:
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Troubleshooting

### Build Issues
- Ensure all dependencies are installed: `npm install`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run lint`

### Runtime Issues
- Check browser console for errors
- Verify all imports are correct
- Ensure React Flow CSS is imported: `@xyflow/react/dist/style.css`

### Deployment Issues
- Verify build output in `dist` directory
- Check deployment platform configuration
- Ensure proper redirects for SPA routing
