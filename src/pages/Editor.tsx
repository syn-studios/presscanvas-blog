import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Download, Copy, Eye, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [generatedMarkdown, setGeneratedMarkdown] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value));
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const generateMarkdown = () => {
    if (!title || !content) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in at least the title and content fields.",
        variant: "destructive",
      });
      return;
    }

    const frontmatter = `---
title: "${title}"
date: "${getCurrentDate()}"
slug: "${slug || generateSlug(title)}"
excerpt: "${excerpt || title}"
tags: [${tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')}]
author: "${author || 'Anonymous'}"
coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
---

${content}`;

    setGeneratedMarkdown(frontmatter);
    setShowPreview(true);

    toast({
      title: "Markdown Generated!",
      description: "Your post is ready. You can now copy or download the markdown file.",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    toast({
      title: "Copied to Clipboard",
      description: "The markdown content has been copied to your clipboard.",
    });
  };

  const downloadMarkdown = () => {
    const filename = `${slug || generateSlug(title)}.md`;
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "File Downloaded",
      description: `${filename} has been downloaded to your device.`,
    });
  };

  const clearForm = () => {
    setTitle("");
    setSlug("");
    setExcerpt("");
    setTags("");
    setAuthor("");
    setContent("");
    setGeneratedMarkdown("");
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="heading-2 mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary text-white">
                <FileText className="h-6 w-6" />
              </div>
              PressCanvas Editor
            </h1>
            <p className="body-large text-content-secondary max-w-2xl">
              Create beautiful blog posts with our markdown editor. Fill in the details below and generate 
              a markdown file ready for your GitHub repository.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Editor Form */}
            <div className="space-y-6">
              <Card className="p-6 border-border-primary shadow-lg">
                <h2 className="heading-4 mb-6 flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Post Details
                </h2>
                
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium text-content-primary">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter your post title..."
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <Label htmlFor="slug" className="text-sm font-medium text-content-primary">
                      Slug (URL)
                    </Label>
                    <Input
                      id="slug"
                      placeholder="auto-generated-from-title"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-content-muted mt-1">
                      Auto-generated from title. Used in the URL.
                    </p>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <Label htmlFor="excerpt" className="text-sm font-medium text-content-primary">
                      Excerpt
                    </Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief description of your post..."
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <Label htmlFor="tags" className="text-sm font-medium text-content-primary">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      placeholder="react, typescript, web-development"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-content-muted mt-1">
                      Separate tags with commas.
                    </p>
                  </div>

                  {/* Author */}
                  <div>
                    <Label htmlFor="author" className="text-sm font-medium text-content-primary">
                      Author
                    </Label>
                    <Input
                      id="author"
                      placeholder="Your name"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </Card>

              {/* Content Editor */}
              <Card className="p-6 border-border-primary shadow-lg">
                <h2 className="heading-4 mb-6">
                  Content *
                </h2>
                
                <Textarea
                  placeholder="Write your post content in markdown...

# Your Post Content

Start writing your amazing blog post here! You can use:

- **Bold text** and *italic text*
- [Links](https://example.com)
- Code blocks with \`inline code\`
- Lists and much more!

## Markdown Tips

```javascript
// Code blocks work great too!
function hello() {
  console.log('Hello, PressCanvas!');
}
```

> Blockquotes are perfect for callouts

Happy writing! 🎉"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={20}
                  className="font-mono text-sm"
                />
                
                <div className="flex gap-3 mt-4">
                  <Button onClick={generateMarkdown} variant="gradient" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Generate Markdown
                  </Button>
                  <Button onClick={clearForm} variant="outline" className="gap-2">
                    Clear All
                  </Button>
                </div>
              </Card>
            </div>

            {/* Preview/Output */}
            <div className="space-y-6">
              {/* Instructions */}
              <Card className="p-6 border-border-primary shadow-lg bg-surface-secondary">
                <h2 className="heading-4 mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-brand-primary" />
                  How to Publish
                </h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary text-white text-xs font-bold">
                      1
                    </div>
                    <p className="body-medium">
                      Generate your markdown using the form on the left
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary text-white text-xs font-bold">
                      2
                    </div>
                    <p className="body-medium">
                      Copy the generated markdown or download the file
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary text-white text-xs font-bold">
                      3
                    </div>
                    <p className="body-medium">
                      Add it to your <code className="px-1 py-0.5 bg-surface-elevated rounded text-brand-primary">_posts/</code> directory via GitHub web UI
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary text-white text-xs font-bold">
                      4
                    </div>
                    <p className="body-medium">
                      Update <code className="px-1 py-0.5 bg-surface-elevated rounded text-brand-primary">data/posts.json</code> with your post metadata
                    </p>
                  </div>
                </div>
              </Card>

              {/* Generated Output */}
              {showPreview && generatedMarkdown && (
                <Card className="p-6 border-border-primary shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="heading-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      Generated Markdown
                    </h2>
                    
                    <div className="flex gap-2">
                      <Button onClick={copyToClipboard} variant="outline" size="sm" className="gap-2">
                        <Copy className="h-4 w-4" />
                        Copy
                      </Button>
                      <Button onClick={downloadMarkdown} variant="default" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <pre className="bg-surface-elevated p-4 rounded-lg overflow-x-auto text-sm border border-border-secondary max-h-96">
                      <code>{generatedMarkdown}</code>
                    </pre>
                  </div>
                  
                  <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                    <p className="text-sm text-success font-medium">
                      ✅ Markdown file ready! Copy the content above and save it as <code>{slug || 'your-post'}.md</code> in your <code>_posts/</code> directory.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;