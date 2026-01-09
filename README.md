# 💼 HR Health Dashboard

**Real-time workforce intelligence & performance metrics dashboard**

A modern, interactive HR analytics dashboard built with vanilla JavaScript, Chart.js, and a high-tech neon design aesthetic. Visualize key HR metrics including headcount, attrition, satisfaction, and hiring trends.

![Dashboard Preview](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-Vanilla_JS-yellow?style=for-the-badge)
![Design](https://img.shields.io/badge/Design-Hightech_Neon-blue?style=for-the-badge)

---

## ✨ Features

### 📊 **5 Interactive Dashboard Pages**

1. **Executive Overview** - Real-time KPIs, workforce trends, department attrition
2. **Workforce Structure** - Demographics, job levels, gender & age distribution
3. **Attrition Analysis** - Turnover rates, retention insights, stability metrics
4. **Engagement & Performance** - Satisfaction scores, performance correlation
5. **Hiring & Flow** - Recruitment efficiency, time-to-hire, headcount dynamics

### 🎨 **Design Highlights**

- **Hightech Neon Theme** - Cyan, magenta, amber color palette with glow effects
- **Smooth Animations** - Fade-in, slide-down, hover effects
- **Glass Morphism** - Backdrop blur and transparency effects
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Custom Typography** - Orbitron + Exo 2 font pairing

### 🔄 **Interactive Features**

- ✅ **Dynamic Filtering** - Filter by department across all pages
- ✅ **Drill-down Navigation** - Click KPI cards to navigate to related pages
- ✅ **Hover Effects** - Interactive chart tooltips and card highlights
- ✅ **Real Data Visualization** - Based on actual HR dataset (1,470 employees)

---

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Fork or clone this repository**
   ```bash
   git clone https://github.com/yourusername/hr-dashboard.git
   cd hr-dashboard
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/root`
   - Save and wait 1-2 minutes

4. **Access your dashboard**
   - URL: `https://yourusername.github.io/hr-dashboard/`

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hr-dashboard.git
   cd hr-dashboard
   ```

2. **Start a local server**
   
   Using Python:
   ```bash
   python -m http.server 8000
   ```
   
   Using Node.js:
   ```bash
   npx http-server -p 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Option 3: Direct File Open

Simply open `index.html` in your web browser. Note: Some browsers may have CORS restrictions with local files.

---

## 📁 Project Structure

```
hr-dashboard/
├── index.html           # Main HTML file
├── assets/
│   ├── style.css       # Stylesheet with hightech theme
│   └── app.js          # JavaScript logic & data
└── README.md           # This file
```

### File Descriptions

- **index.html** - HTML structure with 5 dashboard pages, navigation, and filters
- **assets/style.css** - Complete styling including animations, responsive design, color theme
- **assets/app.js** - Data processing, chart rendering (Chart.js), navigation logic

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure & semantic markup |
| **CSS3** | Styling, animations, responsive design |
| **Vanilla JavaScript** | Logic, interactivity, no frameworks |
| **Chart.js v4.4** | Charts and data visualization |
| **Google Fonts** | Orbitron & Exo 2 typography |
| **Lucide Icons** | SVG icon set |

---

## 📊 Data Overview

The dashboard visualizes HR data for **1,470 employees** with the following metrics:

### Key Performance Indicators (KPIs)
- Total Headcount: 1,470
- Attrition Rate: 16.12%
- Avg Time to Hire: 17.8 days
- Job Satisfaction: 2.73/4.0
- Monthly Income: $6,503

### Departments
- Sales (446 employees)
- Research & Development (961 employees)
- Human Resources (63 employees)

### Time Range
- Data spans: 2006-2017
- Visualization focus: Last 24-36 months

---

## 🎨 Customization

### Changing Colors

Edit color variables in `assets/style.css`:

```css
:root {
    --color-primary: #00d4ff;      /* Cyan */
    --color-secondary: #ff006e;    /* Magenta */
    --color-accent: #ffbe0b;       /* Amber */
    --color-success: #06ffa5;      /* Green */
    --color-warning: #ff9f1c;      /* Orange */
}
```

### Updating Data

Replace the `HR_DATA` object in `assets/app.js` with your own data:

```javascript
const HR_DATA = {
    kpis: { /* your KPIs */ },
    attritionByDept: [ /* your data */ ],
    // ... other data arrays
};
```

### Adding Pages

1. Add page HTML in `index.html`
2. Create render function in `assets/app.js`
3. Add navigation button
4. Update `switchPage()` function

---

## 🌐 Browser Compatibility

| Browser | Supported Version |
|---------|-------------------|
| Chrome | 90+ ✅ |
| Firefox | 88+ ✅ |
| Safari | 14+ ✅ |
| Edge | 90+ ✅ |
| Opera | 76+ ✅ |

---

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

Created with ⚡ by Claude AI

---

## 🙏 Acknowledgments

- **Chart.js** - Beautiful JavaScript charts
- **Google Fonts** - Orbitron & Exo 2 typefaces
- **Lucide Icons** - Clean SVG icon set
- **Anthropic** - Claude AI assistant

---

## 📧 Support

For issues, questions, or suggestions:

- Open an [Issue](https://github.com/yourusername/hr-dashboard/issues)
- Submit a [Pull Request](https://github.com/yourusername/hr-dashboard/pulls)

---

## 🗺️ Roadmap

- [ ] Export dashboard to PDF
- [ ] Add date range picker
- [ ] Real-time data sync
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Advanced filtering options
- [ ] Custom report builder

---

**⭐ Star this repo if you find it helpful!**
