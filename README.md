# Меблерія

## About the Project

Меблерія is a front-end web application for browsing furniture products.
It helps users quickly discover items through categories, popular product
highlights, and detailed product modals.

The project solves a common catalog browsing task: presenting a large product
list in a clean and interactive way with responsive UI components.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES Modules)
- Vite
- Axios
- Swiper
- Accordion.js
- iziToast
- modern-normalize

## Run and Deploy

### Local Development

1. Install [Node.js LTS](https://nodejs.org/en/).
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

4. Open the app in your browser at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

### Preview Production Build Locally

```bash
npm run preview
```

### Deploy to GitHub Pages

1. In `package.json`, update the build script base path to your repository name:

   ```json
   "build": "vite build --base=/<REPO>/"
   ```

2. Replace `<REPO>` with your GitHub repository name.
3. Push changes to `main`.
4. Configure GitHub Pages in repository settings to serve from the `gh-pages`
   branch (if not configured automatically).

## Additional Project Information

- Project type: team JavaScript project (`Group 8 - JS Project`).
- Main scripts:
  - `npm run dev` - development mode
  - `npm run build` - production build
  - `npm run preview` - local preview of production build
- Source structure:
  - `src/js` - application logic
  - `src/css` - styling
  - `src/partials` - reusable HTML sections
  - `src/img` - static images
