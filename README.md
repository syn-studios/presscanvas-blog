# PressCanvas Blog

A modern static blog platform built for GitHub Pages, featuring a beautiful markdown-powered writing experience and seamless GitHub integration.

## 🚀 Features

- **Static & Fast**: Lightning-fast loading times with static site generation
- **Markdown-Powered**: Write in pure markdown with beautiful rendering
- **GitHub Integration**: Perfect for GitHub Pages deployment
- **Client-Side Editor**: Built-in editor for generating markdown posts
- **Search & Filter**: Advanced post filtering by tags and content
- **Responsive Design**: Beautiful on all devices
- **SEO Optimized**: Clean URLs and meta tags for better search visibility

## 📁 Project Structure

```
presscanvas-blog/
├── src/
│   ├── components/          # Reusable UI components
│   ├── data/
│   │   ├── posts.json      # Post metadata index
│   │   └── posts/          # Markdown blog posts
│   ├── pages/              # Main application pages
│   └── assets/             # Images, icons, etc.
├── public/                 # Static assets
└── README.md              # This file
```

## 🖋️ Adding New Posts

### Method 1: Using the Built-in Editor

1. Navigate to `/editor` in your PressCanvas blog
2. Fill in the post details (title, tags, author, etc.)
3. Write your content in markdown
4. Click "Generate Markdown" to create the formatted file
5. Copy the generated markdown

### Method 2: Manual Creation

Create a new `.md` file in `src/data/posts/` with this frontmatter structure:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
slug: "your-post-slug"
excerpt: "Brief description of your post"
tags: ["tag1", "tag2", "tag3"]
author: "Your Name"
coverImage: "https://images.unsplash.com/photo-example"
---

# Your Post Content

Write your amazing content here using markdown!

## Subheading

You can use all standard markdown features:
- Lists
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Code blocks
- And much more!
```

### Publishing Your Post

1. **Add the markdown file**: Save your `.md` file in `src/data/posts/` with the filename matching your slug
2. **Update the posts index**: Add your post metadata to `src/data/posts.json`:

```json
{
  "id": "your-post-slug",
  "title": "Your Post Title",
  "slug": "your-post-slug", 
  "date": "2024-01-15",
  "excerpt": "Brief description of your post",
  "coverImage": "https://images.unsplash.com/photo-example",
  "tags": ["tag1", "tag2"],
  "author": "Your Name",
  "readTime": "5 min read"
}
```

3. **Commit and push**: Add your changes to Git and push to GitHub
4. **Deploy**: Your post will be live once GitHub Pages rebuilds your site

## 🚀 Deployment to GitHub Pages

### Initial Setup

1. **Create a GitHub repository** for your blog
2. **Push your PressCanvas code** to the repository
3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Set Source to "GitHub Actions"
   - Use the default build workflow

### Custom Domain (Optional)

1. In your repository settings, go to Pages
2. Add your custom domain
3. Update DNS settings with your domain provider:
   - Add a CNAME record pointing to `username.github.io`

## 🛠️ Development

### Prerequisites

- Node.js 16+ and npm
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/presscanvas-blog.git
cd presscanvas-blog

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Creating a New Post Locally

1. Use the editor at `http://localhost:5173/editor`
2. Or manually create a `.md` file in `src/data/posts/`
3. Update `src/data/posts.json` with the post metadata
4. The development server will automatically refresh

## 🔧 Customization

### Styling

The design system is defined in `src/index.css` with custom CSS variables:
- Update colors, fonts, and spacing
- Modify component styles in `src/components/`
- Customize the layout in `src/pages/`

### Adding Features

PressCanvas is built with:
- **React + TypeScript** for the UI
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **React Router** for navigation
- **Marked.js** for markdown parsing

Feel free to extend with additional features like:
- Comment systems (Disqus, Giscus)
- Analytics (Google Analytics, Plausible)
- Newsletter signups
- RSS feeds

## 🎨 Design Features

- **Typography-focused design** with Inter and Merriweather fonts
- **Professional color palette** with brand gradients
- **Responsive layout** that works on all devices
- **Smooth animations** and hover effects
- **Dark mode ready** (if you want to implement it)

## 📈 Performance

- **Static site generation** for optimal loading speeds
- **Image optimization** with lazy loading
- **Minimal JavaScript** bundle size
- **SEO optimized** with proper meta tags and structured data

## 🆘 Troubleshooting

### Post Not Showing Up

1. Check that the post exists in `src/data/posts/`
2. Verify the post is listed in `src/data/posts.json`
3. Ensure the slug matches between the filename and JSON
4. Check for syntax errors in the frontmatter

### Build Errors

1. Validate your markdown frontmatter syntax
2. Check for missing required fields in posts.json
3. Ensure all image URLs are accessible
4. Run `npm run build` locally to catch errors before pushing

### GitHub Pages Not Updating

1. Check the Actions tab in your GitHub repository
2. Look for build/deployment failures
3. Ensure you've pushed all files including `posts.json`
4. Wait a few minutes for changes to propagate

## 🔮 Advanced Usage

### Upgrading to a Full CMS

If you outgrow the client-side editor, consider these options:

1. **Netlify CMS**: Add a `/admin` interface for content management
2. **GitHub Actions**: Automate post publishing with workflows
3. **Headless CMS**: Integrate with Strapi, Contentful, or Sanity
4. **Database Integration**: Connect to Supabase or Firebase for dynamic content

### SEO Enhancements

- Add XML sitemaps
- Implement structured data (JSON-LD)
- Optimize images with proper alt tags
- Add meta descriptions for each post
- Set up canonical URLs

## 📄 License

MIT License - feel free to use PressCanvas for your own projects!

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

---

**Built with ❤️ using PressCanvas**

Happy blogging! 🎉