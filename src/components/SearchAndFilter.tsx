import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Tag } from "lucide-react";

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

interface SearchAndFilterProps {
  posts: Post[];
  onFilteredPosts: (posts: Post[]) => void;
}

export const SearchAndFilter = ({ posts, onFilteredPosts }: SearchAndFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts based on search and tags
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }

    return filtered;
  }, [posts, searchQuery, selectedTags]);

  // Update filtered posts when they change
  useMemo(() => {
    onFilteredPosts(filteredPosts);
  }, [filteredPosts, onFilteredPosts]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery.trim() || selectedTags.length > 0;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-content-muted" />
        <Input
          type="text"
          placeholder="Search posts, authors, or topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-4 h-12 text-base bg-surface-secondary border-border-secondary focus:border-brand-primary focus:ring-brand-primary/20"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 text-content-muted hover:text-content-primary"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Tag Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="body-medium font-semibold text-content-primary flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Filter by Topics
          </h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-content-muted hover:text-content-primary"
            >
              Clear All
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleTag(tag)}
              className="text-xs"
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border-secondary">
          <span className="body-small text-content-secondary">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
            {searchQuery && ` for "${searchQuery}"`}
            {selectedTags.length > 0 && ` with tags: ${selectedTags.join(', ')}`}
          </span>
        </div>
      )}
    </div>
  );
};