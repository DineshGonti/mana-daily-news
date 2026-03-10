const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType, 
        ShadingType, PageNumber, PageBreak, LevelFormat } = require('docx');
const fs = require('fs');

// Color theme
const RED = "CC0000";
const DARK = "1A1A1A";
const GRAY = "666666";
const LIGHT_BG = "F5F5F5";
const WHITE = "FFFFFF";
const ACCENT = "CC0000";

const border = { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorders = { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } };

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({ heading: level, spacing: { before: 300, after: 200 }, children: [new TextRun({ text, bold: true, font: "Arial" })] });
}

function para(text, opts = {}) {
  return new Paragraph({ 
    spacing: { after: 200, line: 360 }, 
    ...opts,
    children: [new TextRun({ text, font: "Arial", size: 22, color: DARK, ...opts.run })] 
  });
}

function boldPara(label, text) {
  return new Paragraph({
    spacing: { after: 160, line: 360 },
    children: [
      new TextRun({ text: label, bold: true, font: "Arial", size: 22, color: DARK }),
      new TextRun({ text, font: "Arial", size: 22, color: GRAY }),
    ]
  });
}

function spacer(height = 200) {
  return new Paragraph({ spacing: { after: height }, children: [] });
}

function tableRow(cells, isHeader = false) {
  return new TableRow({
    children: cells.map((text, i) => new TableCell({
      borders,
      width: { size: i === 0 ? 3000 : 6360, type: WidthType.DXA },
      shading: isHeader ? { fill: RED, type: ShadingType.CLEAR } : (i % 2 === 0 ? { fill: LIGHT_BG, type: ShadingType.CLEAR } : undefined),
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text, font: "Arial", size: 20, bold: isHeader, color: isHeader ? WHITE : DARK })] })]
    }))
  });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: RED },
        paragraph: { spacing: { before: 360, after: 240 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: DARK },
        paragraph: { spacing: { before: 280, after: 180 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: GRAY },
        paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [
    // ═══ COVER PAGE ═══
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      children: [
        spacer(2000),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [
          new TextRun({ text: "RAVI NEWS", font: "Arial", size: 72, bold: true, color: RED })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [
          new TextRun({ text: "Proof of Concept Application", font: "Arial", size: 36, color: GRAY })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, 
          border: { top: { style: BorderStyle.SINGLE, size: 3, color: RED, space: 10 } },
          children: [] }),
        spacer(200),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [
          new TextRun({ text: "Technical Documentation & Build Report", font: "Arial", size: 28, color: DARK })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [
          new TextRun({ text: "Prepared for Client Review", font: "Arial", size: 24, color: GRAY })
        ]}),
        spacer(600),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [
          new TextRun({ text: "Date: March 4, 2026", font: "Arial", size: 22, color: GRAY })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [
          new TextRun({ text: "Version: 1.0", font: "Arial", size: 22, color: GRAY })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [
          new TextRun({ text: "Prepared by: Dinesh Gonti | Clymin", font: "Arial", size: 22, color: GRAY })
        ]}),
      ]
    },
    // ═══ TABLE OF CONTENTS PAGE ═══
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      headers: {
        default: new Header({ children: [new Paragraph({ 
          border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: RED, space: 4 } },
          children: [new TextRun({ text: "Ravi News — POC Documentation", font: "Arial", size: 18, color: GRAY, italics: true })] })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Page ", font: "Arial", size: 18, color: GRAY }), new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 18, color: GRAY })] })] })
      },
      children: [
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "Table of Contents", bold: true, font: "Arial" })] }),
        spacer(200),
        para("1.  Executive Summary"),
        para("2.  Project Overview"),
        para("3.  Target Audience & Design Philosophy"),
        para("4.  Technology Stack"),
        para("5.  Application Architecture"),
        para("6.  Reader App — Screen Descriptions"),
        para("7.  Admin Panel — Screen Descriptions"),
        para("8.  Key Features"),
        para("9.  Data Flow & Sync Mechanism"),
        para("10. File Structure"),
        para("11. How to Run"),
        para("12. Future Roadmap"),
        para("13. Conclusion"),
      ]
    },
    // ═══ MAIN CONTENT ═══
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      headers: {
        default: new Header({ children: [new Paragraph({ 
          border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: RED, space: 4 } },
          children: [new TextRun({ text: "Ravi News — POC Documentation", font: "Arial", size: 18, color: GRAY, italics: true })] })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Page ", font: "Arial", size: 18, color: GRAY }), new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 18, color: GRAY })] })] })
      },
      children: [
        // ── 1. EXECUTIVE SUMMARY ──
        heading("1. Executive Summary"),
        para("Ravi News is a hyperlocal news application designed specifically for Tier 2 and Tier 3 urban villages in the Nizamabad and Kamareddy districts of Telangana. The app delivers news in both Telugu and English, with an Inshorts-style swipeable card interface optimized for users who may have limited smartphone experience."),
        para("This document presents the Proof of Concept (POC) build, covering the Reader App for end users and the Admin Panel for news reporters. The POC demonstrates the core user experience, bilingual content delivery, and the complete news publishing workflow from reporter to reader."),
        
        new Paragraph({ children: [new PageBreak()] }),

        // ── 2. PROJECT OVERVIEW ──
        heading("2. Project Overview"),
        boldPara("Project Name: ", "Ravi News"),
        boldPara("Type: ", "Hyperlocal News Application (Mobile-First Web App)"),
        boldPara("Region: ", "Nizamabad & Kamareddy Districts, Telangana"),
        boldPara("Languages: ", "Telugu (తెలుగు) and English"),
        boldPara("Inspiration: ", "Inshorts, Way2News, Mee24News"),
        boldPara("POC Status: ", "Fully functional interactive prototype"),
        spacer(200),
        para("The app aims to fill a gap in hyperlocal news coverage for mandal-level communities. Existing news apps focus on state or national news, while Ravi News delivers ward-level, mandal-level, and district-level stories that directly impact local residents."),

        // ── 3. TARGET AUDIENCE ──
        heading("3. Target Audience & Design Philosophy"),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "3.1 Target Users", bold: true, font: "Arial" })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "Residents of Tier 2 and Tier 3 urban villages in Telangana", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "Primarily Telugu-speaking population with varying English literacy", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "Users with basic smartphones and moderate internet connectivity", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "Age group: 18–65, with emphasis on ease of use for all age groups", font: "Arial", size: 22 })] }),
        spacer(100),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "3.2 Design Principles", bold: true, font: "Arial" })] }),
        new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 120 }, children: [
          new TextRun({ text: "Super Minimal: ", bold: true, font: "Arial", size: 22 }),
          new TextRun({ text: "Inspired by Inshorts and Way2News. One news story per screen, swipe to navigate.", font: "Arial", size: 22 })
        ]}),
        new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 120 }, children: [
          new TextRun({ text: "Telugu First: ", bold: true, font: "Arial", size: 22 }),
          new TextRun({ text: "App defaults to Telugu with easy toggle to English.", font: "Arial", size: 22 })
        ]}),
        new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 120 }, children: [
          new TextRun({ text: "Mobile-First: ", bold: true, font: "Arial", size: 22 }),
          new TextRun({ text: "Designed for 390px phone screens. Touch swipe + keyboard navigation.", font: "Arial", size: 22 })
        ]}),
        new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 120 }, children: [
          new TextRun({ text: "Fast & Lightweight: ", bold: true, font: "Arial", size: 22 }),
          new TextRun({ text: "No heavy frameworks. Pure React with zero external UI dependencies.", font: "Arial", size: 22 })
        ]}),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 4. TECHNOLOGY STACK ──
        heading("4. Technology Stack"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [3000, 6360],
          rows: [
            tableRow(["Component", "Technology"], true),
            tableRow(["Frontend Framework", "React 19.2 (Functional Components + Hooks)"]),
            tableRow(["Build Tool", "Vite 8.0 (Beta)"]),
            tableRow(["Language", "JavaScript (JSX)"]),
            tableRow(["Styling", "Inline CSS (zero external dependencies)"]),
            tableRow(["Data Store", "localStorage (shared cross-tab)"]),
            tableRow(["Routing", "Hash-based routing (#admin)"]),
            tableRow(["Sync Mechanism", "Custom events + storage events + polling"]),
            tableRow(["Image Assets", "Unsplash stock photos (placeholder)"]),
            tableRow(["Package Manager", "npm"]),
          ]
        }),

        spacer(300),

        // ── 5. APPLICATION ARCHITECTURE ──
        heading("5. Application Architecture"),
        para("The Ravi News POC is a single-page application (SPA) with two main views served from the same codebase, separated by hash-based routing:"),
        spacer(100),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [
          new TextRun({ text: "localhost:5173/ ", bold: true, font: "Arial", size: 22, color: RED }),
          new TextRun({ text: "→ Reader App (end-user facing)", font: "Arial", size: 22 })
        ]}),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [
          new TextRun({ text: "localhost:5173/#admin ", bold: true, font: "Arial", size: 22, color: RED }),
          new TextRun({ text: "→ Admin Panel (reporter/editor facing)", font: "Arial", size: 22 })
        ]}),
        spacer(100),
        para("Both views share a common data store (store.js) backed by localStorage. When a reporter publishes an article in the Admin Panel, it becomes immediately visible in the Reader App through a real-time sync mechanism combining custom DOM events, storage events, and 3-second polling."),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 6. READER APP SCREENS ──
        heading("6. Reader App — Screen Descriptions"),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "6.1 Splash Screen", bold: true, font: "Arial" })] }),
        para("A branded splash screen displaying the Ravi News logo in Telugu (రవి న్యూస్) with a loading animation. Displays for 2 seconds before transitioning to the home feed. Sets the visual identity and brand recognition."),
        spacer(100),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "6.2 Home Feed — News Card (Telugu)", bold: true, font: "Arial" })] }),
        para("The primary screen of the app. Displays one news story at a time in a full-screen card format inspired by Inshorts. The card includes: cover image with category badge and mandal location tag, breaking news indicator (when applicable), headline in Telugu, reporter name and timestamp, body text preview, action buttons for Save and Share, swipe up/down hint for navigation, and progress dots showing position in the feed."),
        para("The top of the screen features horizontally scrollable category filter pills: All (అన్ని), Politics (రాజకీయాలు), Sports (క్రీడలు), Education (విద్య), Entertainment (వినోదం), Health (ఆరోగ్యం), Agriculture (వ్యవసాయం), and more."),
        spacer(100),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "6.3 Home Feed — News Card (English)", bold: true, font: "Arial" })] }),
        para("Identical layout to the Telugu version, but with all content rendered in English. The user toggles between languages via the Profile screen. All UI elements including category pills, action buttons, navigation labels, and the status bar adapt to the selected language."),
        spacer(100),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "6.4 Navigation — Swipe & Keyboard", bold: true, font: "Arial" })] }),
        para("Users navigate between news stories using three input methods: touch swipe (swipe up for next, swipe down for previous), mouse drag (click and drag vertically), and keyboard arrows (up/down arrow keys). A visual hint at the bottom of each card guides users with the text \"Swipe up for next story.\""),
        spacer(100),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "6.5 Categories Screen", bold: true, font: "Arial" })] }),
        para("A 2-column grid displaying all available news categories with icons. Categories include: Politics, Sports, Education, Entertainment, Business, Health, Agriculture, and Technology. Tapping a category filters the home feed to show only stories in that category. Each category tile shows the icon emoji and localized label."),
        spacer(100),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "6.6 Profile Screen", bold: true, font: "Arial" })] }),
        para("User settings and preferences screen. Features include: user avatar with name and email, language toggle (EN / తె), mandal selection dropdown (for location-based news filtering), notification preferences, dark mode toggle (placeholder), and app version information. The language toggle is the most critical feature, allowing users to instantly switch the entire app between Telugu and English."),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 7. ADMIN PANEL SCREENS ──
        heading("7. Admin Panel — Screen Descriptions"),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "7.1 Dashboard — Article List", bold: true, font: "Arial" })] }),
        para("The main admin view displays a dashboard with statistics cards (Total Articles, Published, Drafts) and a filterable list of all articles. Each article card shows a thumbnail, publication status badge, category, headline in Telugu, reporter name, and timestamp. Action buttons include Edit, Publish/Unpublish toggle, and Delete. A prominent \"+ New Article\" button in the header allows reporters to create new stories. A floating \"Open Reader App\" button provides quick access to preview published content."),
        spacer(100),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "7.2 New Article Form", bold: true, font: "Arial" })] }),
        para("A comprehensive article creation form with the following fields: Cover Image selection from stock photos gallery or custom URL input, Category dropdown (Politics, Sports, Education, etc.), Mandal dropdown (Aloor, Armoor, Balkonda, Bodhan, etc.), Breaking News toggle, Publish Immediately toggle, bilingual content tabs (Telugu and English) with headline and body fields for each, reporter name, and a live preview showing how the article will appear in the reader app."),
        spacer(100),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "7.3 Edit Article Form", bold: true, font: "Arial" })] }),
        para("Identical to the New Article form but pre-populated with existing article data. Allows reporters and editors to update any field. Changes are saved to the shared data store and reflected in the Reader App in real time."),
        spacer(100),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "7.4 Toast Notifications", bold: true, font: "Arial" })] }),
        para("Action confirmations appear as toast notifications at the bottom of the admin screen. Messages include: \"Article published!\", \"Moved to drafts\", \"Article deleted\", and \"Article updated.\""),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 8. KEY FEATURES ──
        heading("8. Key Features"),
        
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [3000, 6360],
          rows: [
            tableRow(["Feature", "Description"], true),
            tableRow(["Bilingual Support", "Full Telugu + English support with instant toggle. All UI, categories, and content switch languages."]),
            tableRow(["Inshorts-Style Cards", "One story per screen. Swipe/drag/arrow key navigation. Full-screen immersive reading."]),
            tableRow(["Breaking News Badges", "Visual indicator for breaking news with lightning bolt icon and red badge."]),
            tableRow(["Category Filtering", "Horizontal scrollable pills + dedicated categories screen. Filter news by topic."]),
            tableRow(["Mandal-Level Location", "News tagged by mandal (Armoor, Aloor, Bodhan, etc.). Location badge on each card."]),
            tableRow(["Admin CRUD", "Full Create, Read, Update, Delete operations for articles from the admin panel."]),
            tableRow(["Real-Time Sync", "Articles published in admin appear in reader app within 3 seconds. No page refresh needed."]),
            tableRow(["Live Preview", "Admin panel shows live preview of article card while editing."]),
            tableRow(["Mobile-First Design", "390px phone frame with touch gestures. Works on any mobile browser."]),
            tableRow(["Save & Share", "Users can save articles for later and share via device share API."]),
          ]
        }),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 9. DATA FLOW ──
        heading("9. Data Flow & Sync Mechanism"),
        para("The POC uses a lightweight client-side data synchronization approach suitable for demonstration purposes:"),
        spacer(100),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "9.1 Data Store (store.js)", bold: true, font: "Arial" })] }),
        para("A centralized module that manages all article data using the browser's localStorage API. It exposes CRUD functions: getArticles(), addArticle(), updateArticle(), and deleteArticle(). Default sample articles are seeded on first load covering categories like politics, education, agriculture, health, sports, and entertainment across different mandals."),
        spacer(100),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "9.2 Cross-Tab Synchronization", bold: true, font: "Arial" })] }),
        para("Three mechanisms ensure real-time data sync between the Admin and Reader tabs:"),
        new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 120 }, children: [
          new TextRun({ text: "Custom Events: ", bold: true, font: "Arial", size: 22 }),
          new TextRun({ text: "A 'ravi-news-updated' event fires on data save for same-tab listeners.", font: "Arial", size: 22 })
        ]}),
        new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 120 }, children: [
          new TextRun({ text: "Storage Events: ", bold: true, font: "Arial", size: 22 }),
          new TextRun({ text: "The browser's native storage event notifies other tabs when localStorage changes.", font: "Arial", size: 22 })
        ]}),
        new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 120 }, children: [
          new TextRun({ text: "Polling Fallback: ", bold: true, font: "Arial", size: 22 }),
          new TextRun({ text: "A 3-second polling interval catches any missed updates as a safety net.", font: "Arial", size: 22 })
        ]}),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 10. FILE STRUCTURE ──
        heading("10. File Structure"),
        
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [3500, 5860],
          rows: [
            tableRow(["File", "Purpose"], true),
            tableRow(["src/main.jsx", "Entry point with hash-based Router component"]),
            tableRow(["src/App.jsx", "Reader app — Inshorts-style swipeable news cards"]),
            tableRow(["src/Admin.jsx", "Admin panel — CRUD interface for reporters"]),
            tableRow(["src/store.js", "Shared data store with localStorage persistence"]),
            tableRow(["src/index.css", "Minimal CSS reset (all styles are inline)"]),
            tableRow(["package.json", "Project config with React 19 + Vite 8"]),
          ]
        }),

        spacer(300),

        // ── 11. HOW TO RUN ──
        heading("11. How to Run"),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "Prerequisites", bold: true, font: "Arial" })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "Node.js version 18 or higher", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "npm (comes with Node.js)", font: "Arial", size: 22 })] }),
        spacer(100),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "Steps", bold: true, font: "Arial" })] }),
        new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 120 }, children: [
          new TextRun({ text: "Clone or download the project folder ", font: "Arial", size: 22 }),
          new TextRun({ text: "ravi-news-poc", font: "Arial", size: 22, bold: true })
        ]}),
        new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 120 }, children: [
          new TextRun({ text: "Open terminal and navigate to the project: ", font: "Arial", size: 22 }),
          new TextRun({ text: "cd ravi-news-poc", font: "Courier New", size: 22, bold: true })
        ]}),
        new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 120 }, children: [
          new TextRun({ text: "Install dependencies: ", font: "Arial", size: 22 }),
          new TextRun({ text: "npm install", font: "Courier New", size: 22, bold: true })
        ]}),
        new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 120 }, children: [
          new TextRun({ text: "Start the development server: ", font: "Arial", size: 22 }),
          new TextRun({ text: "npm run dev", font: "Courier New", size: 22, bold: true })
        ]}),
        new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 120 }, children: [
          new TextRun({ text: "Open Reader App: ", font: "Arial", size: 22 }),
          new TextRun({ text: "http://localhost:5173/", font: "Courier New", size: 22, color: RED })
        ]}),
        new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 120 }, children: [
          new TextRun({ text: "Open Admin Panel: ", font: "Arial", size: 22 }),
          new TextRun({ text: "http://localhost:5173/#admin", font: "Courier New", size: 22, color: RED })
        ]}),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 12. FUTURE ROADMAP ──
        heading("12. Future Roadmap"),
        para("The POC demonstrates the core concept and user experience. The following enhancements are planned for the production version:"),
        spacer(100),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "Phase 2 — Backend & Database", bold: true, font: "Arial" })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "Replace localStorage with a cloud database (Firebase / Supabase / PostgreSQL)", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "RESTful API or GraphQL backend for article management", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "User authentication for reporters and editors", font: "Arial", size: 22 })] }),
        spacer(100),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "Phase 3 — Native Mobile App", bold: true, font: "Arial" })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "Convert to React Native for Android and iOS", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "Push notifications for breaking news", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "Offline mode with cached articles", font: "Arial", size: 22 })] }),
        spacer(100),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: "Phase 4 — Advanced Features", bold: true, font: "Arial" })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "Voice-to-text news reading in Telugu", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "Video news clips integration", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "Community comments and reactions", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "Advertising platform for local businesses", font: "Arial", size: 22 })] }),
        new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 120 }, children: [new TextRun({ text: "Analytics dashboard for article performance", font: "Arial", size: 22 })] }),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 13. CONCLUSION ──
        heading("13. Conclusion"),
        para("The Ravi News POC successfully demonstrates a complete hyperlocal news delivery platform tailored for Telangana's Tier 2 and Tier 3 communities. The Inshorts-style interface provides an intuitive, minimal experience that requires zero training for new users. The bilingual Telugu-English support ensures accessibility across literacy levels."),
        para("The Admin Panel provides reporters with a straightforward tool to publish news in both languages, with real-time delivery to the Reader App. The mandal-level location tagging and category system enable hyper-targeted news delivery."),
        para("This POC is ready for client review and serves as the foundation for the production application. The modular architecture allows for incremental enhancements as outlined in the roadmap, with minimal refactoring needed to transition from the POC to a full-stack production application."),
        spacer(400),

        // Signature block
        new Paragraph({ 
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: RED, space: 10 } },
          spacing: { before: 400, after: 100 },
          children: [] 
        }),
        new Paragraph({ spacing: { after: 80 }, children: [
          new TextRun({ text: "Prepared by:", font: "Arial", size: 22, bold: true, color: DARK })
        ]}),
        new Paragraph({ spacing: { after: 40 }, children: [
          new TextRun({ text: "Dinesh Gonti", font: "Arial", size: 22, color: DARK })
        ]}),
        new Paragraph({ spacing: { after: 40 }, children: [
          new TextRun({ text: "Clymin", font: "Arial", size: 22, color: GRAY })
        ]}),
        new Paragraph({ spacing: { after: 40 }, children: [
          new TextRun({ text: "dinesh.gonti@clymin.com", font: "Arial", size: 22, color: RED })
        ]}),
        new Paragraph({ spacing: { after: 40 }, children: [
          new TextRun({ text: "March 4, 2026", font: "Arial", size: 22, color: GRAY })
        ]}),
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/sessions/dazzling-exciting-tesla/mnt/ravi-news-poc/Ravi_News_POC_Document.docx", buffer);
  console.log("Document created successfully!");
});
