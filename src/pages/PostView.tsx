import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen, Tag } from "lucide-react";
import { marked } from "marked";

interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  author: string;
  readTime: string;
}

const PostView = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        // Load post metadata
        const postsData = await import("@/data/posts.json");
        const foundPost = postsData.default.find((p: Post) => p.slug === slug);
        
        if (foundPost) {
          setPost(foundPost);
          
          // Load markdown content
          try {
            const markdownModule = await import(`@/data/posts/${slug}.md?raw`);
            const markdownContent = markdownModule.default;
            
            // Remove frontmatter and parse markdown
            const contentWithoutFrontmatter = markdownContent.replace(/^---[\s\S]*?---/, '').trim();
            const htmlContent = await marked(contentWithoutFrontmatter);
            setContent(htmlContent);
          } catch (error) {
            console.error("Error loading markdown:", error);
            setContent("<p>Content could not be loaded.</p>");
          }
        }
      } catch (error) {
        console.error("Error loading post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-surface-secondary rounded mb-4"></div>
              <div className="h-64 bg-surface-secondary rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-surface-secondary rounded w-3/4"></div>
                <div className="h-4 bg-surface-secondary rounded w-1/2"></div>
                <div className="h-4 bg-surface-secondary rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-secondary flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-content-muted" />
            </div>
            <h1 className="heading-2 mb-4">Post Not Found</h1>
            <p className="body-large text-content-secondary mb-8">
              The post you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/">
              <Button variant="gradient" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Posts
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <article className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Cover Image */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Post Header */}
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium bg-surface-secondary text-content-muted rounded-lg border border-border-secondary flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="heading-1 mb-6 animate-fade-in">{post.title}</h1>

            {/* Excerpt */}
            <p className="body-large text-content-secondary mb-8 max-w-3xl animate-slide-up">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-surface-secondary rounded-xl border border-border-secondary">
              <div className="flex items-center gap-6 text-sm text-content-secondary">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
              
              <Button variant="outline" size="sm" onClick={sharePost} className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </header>

          {/* Content */}
          <div 
            className="prose-content animate-slide-up"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Post Footer */}
          <footer className="mt-16 pt-8 border-t border-border-secondary">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="heading-4 mb-2">Share this post</h3>
                <p className="body-small text-content-secondary">
                  Found this helpful? Share it with your network.
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  Twitter
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" onClick={sharePost}>
                  Copy Link
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default PostView;