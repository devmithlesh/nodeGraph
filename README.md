# React Flow Node Editor

A sophisticated React Flow-based node editor for building hierarchical tree structures with predefined node types and relationship rules. Built with React, Zustand for state management, and Tailwind CSS for styling.

## ✨ Features

### 🌟 Node Types & Relationships
- **Account Node** 🧾: Represents a customer's account
  - Can have: Loan, Collateral children
  - Can be root node
- **Loan Node** 💸: A loan issued to an account
  - Can have: Collateral children
  - Can be root node
- **Collateral Node** 🏦: Asset pledged against a loan
  - Cannot have children (leaf node)
  - Cannot be root node

### 🔗 Connection Visualization
- **Connected Users Display**: Shows all nodes connected to the selected node
- **Incoming/Outgoing Connections**: Visual distinction between different connection types
- **Edge Highlighting**: Connected edges are highlighted when a node is selected
- **Interactive Relationships**: Click to see detailed connection information

### 🎨 Modern UI/UX
- **Beautiful Animations**: Smooth transitions and hover effects
- **Responsive Design**: Works on all screen sizes
- **Color-coded Information**: Different colors for different node types and data
- **Professional Styling**: Modern gradients, shadows, and typography

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd my-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📊 How to Use

### Adding Nodes
1. **Root Nodes**: Only Account and Loan can be added as root nodes from the sidebar
2. **Child Nodes**: Click on a node to open the side panel and add valid children
3. **Relationship Rules**: 
   - Account → Loan, Collateral
   - Loan → Collateral
   - Collateral → No children allowed

### Node Management
- **View Details**: Click any node to see detailed information and financial data
- **Add Children**: Use the side panel to add valid child node types
- **Delete Nodes**: Remove nodes and all their descendants
- **Connected Users**: See all related nodes with visual indicators

### Interactive Features
- **Quick Actions**: Deposit, withdraw, make payments, view statements
- **JSON Export**: Export the entire node structure as JSON
- **Delete Nodes**: Remove nodes and their descendants
- **Layout Management**: Automatic layout with manual adjustments

## 🏗️ Project Structure

```
src/
├── components/
│   ├── NodeTypes/
│   │   ├── AccountNode.jsx      # Account node component
│   │   ├── LoanNode.jsx         # Loan node component
│   │   └── CollateralNode.jsx   # Collateral node component
│   ├── CustomPanel.jsx          # Detailed information panel
│   └── Sidebar.jsx              # Node creation sidebar
├── store/
│   └── nodeStore.js             # Zustand state management
├── utils/
│   ├── layoutUtils.js           # Layout algorithms
│   ├── nodeRules.js             # Node relationship rules
│   └── nodeTypes.js             # Node type definitions
└── App.jsx                      # Main application component
```

## 🎯 Key Features

### Financial Data Display
- **Real-time Balance**: Account balances displayed on nodes
- **Transaction History**: Recent transactions with amounts and dates
- **Payment Tracking**: Loan payment history and due dates
- **Interest Calculations**: APY and APR display

### Visual Enhancements
- **Node Scaling**: Selected nodes scale up for better visibility
- **Edge Animations**: Smooth animated connections
- **Color Coding**: Blue for accounts, green for loans, orange for amounts
- **Gradient Backgrounds**: Beautiful visual effects

### Data Management
- **Mock Data**: Sample financial data for demonstration
- **Dynamic Updates**: Real-time data changes
- **Export Functionality**: JSON export of entire structure
- **Validation**: Node relationship validation

## 🔧 Customization

### Adding New Node Types
1. Create a new component in `src/components/NodeTypes/`
2. Add the node type to `src/utils/nodeTypes.js`
3. Define rules in `src/utils/nodeRules.js`
4. Add mock data in `src/store/nodeStore.js`

### Styling
- **Tailwind CSS**: All styling uses Tailwind classes
- **Custom CSS**: Additional animations in `src/index.css`
- **Theme Colors**: Easily customizable color schemes

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices
- Touch interfaces

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React Flow, Zustand, and Tailwind CSS**
# nodeGraph
