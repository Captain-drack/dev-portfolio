<div align="center">

# ✨ Akshat Austin — Developer Portfolio

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-akshat--austin.vercel.app-blue?style=for-the-badge)](https://akshat-austin.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

**A modern, performant, and visually stunning developer portfolio built with cutting-edge technologies.**

![Portfolio Preview](/public/images/readme-hero.png)

</div>

---

## 🎯 Features

| Feature                    | Description                                                                     |
| -------------------------- | ------------------------------------------------------------------------------- |
| ⚡ **Blazing Fast**        | Built with Next.js 16 Turbopack for instant HMR and optimized production builds |
| 🎨 **Dynamic Theming**     | Multiple color themes with smooth transitions using CSS custom properties       |
| 🌗 **Dark/Light Mode**     | System-aware theme switching with `next-themes`                                 |
| ✨ **Stunning Animations** | Framer Motion powered animations, including text scramble effects               |
| 📱 **Fully Responsive**    | Mobile-first design that looks perfect on all devices                           |
| 🖼️ **Interactive Gallery** | Immersive image gallery with loupe zoom and keyboard navigation                 |
| 📧 **Contact Form**        | Functional email integration via EmailJS                                        |
| 🔄 **Smooth Scrolling**    | Lenis smooth scroll for premium UX                                              |
| 🎭 **3D Effects**          | Interactive 3D card tilts and perspective transforms                            |

---

## 🛠️ Tech Stack

### Core

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** [TypeScript 5](https://typescriptlang.org/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/)
- **UI Library:** [React 19](https://react.dev/)

### Animation & UX

- **Animations:** [Framer Motion 12](https://www.framer.com/motion/)
- **Smooth Scroll:** [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons:** [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)

### Utilities

- **Email:** [EmailJS](https://www.emailjs.com/)
- **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Typewriter:** [react-simple-typewriter](https://www.npmjs.com/package/react-simple-typewriter)

---

## 📂 Project Structure

```
dev-portfolio/
├── app/
│   ├── components/
│   │   ├── Home/           # Hero, Skills, Projects, Experience, Contact
│   │   ├── Gallery/        # Image gallery with loupe zoom
│   │   └── ui/             # Reusable UI components
│   ├── context/            # Theme and app-wide context providers
│   ├── data/               # Static data (projects, skills, experience)
│   ├── gallery/            # Gallery page
│   ├── types/              # TypeScript type definitions
│   ├── globals.css         # Global styles and CSS variables
│   ├── layout.tsx          # Root layout with fonts and providers
│   └── page.tsx            # Home page
├── public/
│   ├── icons/              # Technology icons
│   └── images/             # Project screenshots and assets
└── ...config files
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Captain-drack/dev-portfolio.git
   cd dev-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # EmailJS Configuration (Get these from https://dashboard.emailjs.com)
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

---

## 📜 Available Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start development server with Turbopack |
| `npm run build` | Build for production                    |
| `npm run start` | Start production server                 |
| `npm run lint`  | Run ESLint                              |

---

## 🎨 Customization

### Changing Theme Colors

Edit the theme definitions in `app/globals.css`:

```css
:root {
  --palette-primary: #your-color;
  --palette-accent2: #your-accent;
}
```

### Updating Personal Data

Modify the data files in `app/data/`:

- `index.ts` — Hero section, social links
- `projects.ts` — Portfolio projects
- `skills.ts` — Technical skills
- `experience.ts` — Work experience

---

## 🌐 Deployment

### Deploy on Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Captain-drack/dev-portfolio)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add your environment variables in Vercel's dashboard
4. Deploy!

---

## 📸 Screenshots

<div align="center">

| Light Mode  |  Dark Mode  |
| :---------: | :---------: |
| Coming Soon | Coming Soon |

</div>

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Akshat Austin](https://github.com/Captain-drack)**

⭐ Star this repo if you found it helpful!

</div>
