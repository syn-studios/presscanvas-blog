import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";

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

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export const PostCard = ({ post, featured = false }: PostCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl bg-surface-primary border border-border-primary shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h2 className="heading-2 mb-3 text-white group-hover:text-white/90 transition-colors">
            {post.title}
          </h2>
          
          <p className="body-large mb-4 text-white/80 line-clamp-2">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
            
            <Link to={`/post/${post.slug}`}>
              <Button variant="gradient" size="sm" className="gap-2">
                Read More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-xl bg-surface-primary border border-border-primary shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-surface-secondary text-content-muted rounded-md border border-border-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="heading-4 mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="body-medium mb-4 text-content-secondary line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-content-muted">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>
          
          <Link to={`/post/${post.slug}`}>
            <Button variant="minimal" size="sm" className="gap-2">
              Read
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};