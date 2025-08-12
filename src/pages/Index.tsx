import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { PostCard } from "@/components/PostCard";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { Button } from "@/components/ui/button";
import { PenTool, TrendingUp, Users, BookOpen, Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

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

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    // Load posts from data file
    import("@/data/posts.json").then((data) => {
      setPosts(data.default);
      setFilteredPosts(data.default);
    });
  }, []);

  const handleFilteredPosts = (filtered: Post[]) => {
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const featuredPost = posts[0]; // First post as featured
  const regularPosts = currentPosts.filter(post => post.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl">
            <h1 className="heading-1 mb-6 animate-fade-in">
              Write. Publish.{" "}
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Inspire.
              </span>
            </h1>
            <p className="body-large mb-8 max-w-2xl animate-slide-up">
              PressCanvas is a modern static blog platform built for writers who love the simplicity of markdown 
              and the power of GitHub Pages. Create beautiful content that loads instantly and scales infinitely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
              <Link to="/editor">
                <Button variant="gradient" size="lg" className="gap-3">
                  <PenTool className="h-5 w-5" />
                  Start Writing
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="gap-3">
                <Github className="h-5 w-5" />
                View on GitHub
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border-primary bg-surface-secondary/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary text-white">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="heading-4 mb-2">Lightning Fast</h3>
              <p className="body-medium text-content-secondary">Static sites load in milliseconds, not seconds</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary text-white">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="heading-4 mb-2">Markdown Powered</h3>
              <p className="body-medium text-content-secondary">Write in plain markdown, publish beautifully</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary text-white">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="heading-4 mb-2">GitHub Ready</h3>
              <p className="body-medium text-content-secondary">Perfect integration with GitHub Pages</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8">
            <h2 className="heading-2 mb-4">Featured Post</h2>
            <p className="body-large text-content-secondary">Our latest and greatest content</p>
          </div>
          <PostCard post={featuredPost} featured />
        </section>
      )}

      {/* Search and Filter */}
      <section className="container mx-auto px-4 py-8">
        <SearchAndFilter posts={posts} onFilteredPosts={handleFilteredPosts} />
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-8">
          <h2 className="heading-2 mb-4">Latest Posts</h2>
          <p className="body-large text-content-secondary">
            {filteredPosts.length === posts.length 
              ? "Discover our latest articles and insights"
              : `${filteredPosts.length} ${filteredPosts.length === 1 ? 'post' : 'posts'} found`
            }
          </p>
        </div>

        {currentPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {regularPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-secondary flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-content-muted" />
            </div>
            <h3 className="heading-4 mb-2">No posts found</h3>
            <p className="body-medium text-content-secondary mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button variant="outline" onClick={() => {
              setFilteredPosts(posts);
              setCurrentPage(1);
            }}>
              Show All Posts
            </Button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border-primary bg-surface-secondary">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary text-white font-bold text-lg">
                  P
                </div>
                <span className="heading-4 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  PressCanvas
                </span>
              </div>
              <p className="body-medium text-content-secondary">
                A modern static blog platform for the GitHub generation.
              </p>
            </div>
            
            <div>
              <h4 className="heading-4 mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/" className="block body-medium text-content-secondary hover:text-brand-primary transition-colors">
                  Home
                </Link>
                <Link to="/editor" className="block body-medium text-content-secondary hover:text-brand-primary transition-colors">
                  Editor
                </Link>
                <a href="#" className="block body-medium text-content-secondary hover:text-brand-primary transition-colors">
                  Documentation
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="heading-4 mb-4">Community</h4>
              <div className="space-y-2">
                <a href="#" className="block body-medium text-content-secondary hover:text-brand-primary transition-colors">
                  GitHub
                </a>
                <a href="#" className="block body-medium text-content-secondary hover:text-brand-primary transition-colors">
                  Issues
                </a>
                <a href="#" className="block body-medium text-content-secondary hover:text-brand-primary transition-colors">
                  Discussions
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border-secondary mt-8 pt-8 text-center">
            <p className="body-small text-content-muted">
              Built with PressCanvas • Powered by GitHub Pages
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
