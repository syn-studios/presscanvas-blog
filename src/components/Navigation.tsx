import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, PenTool, Home, BookOpen } from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ to, children, icon: Icon }: { to: string; children: React.ReactNode; icon: any }) => (
    <Link to={to} onClick={() => setIsMenuOpen(false)}>
      <Button
        variant={isActive(to) ? "gradient" : "ghost"}
        size="sm"
        className="w-full justify-start gap-3 md:w-auto"
      >
        <Icon className="h-4 w-4" />
        {children}
      </Button>
    </Link>
  );

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border-primary bg-surface-primary/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary text-white font-bold text-lg shadow-lg">
                P
              </div>
              <span className="heading-4 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                PressCanvas
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <NavLink to="/" icon={Home}>Home</NavLink>
              <NavLink to="/editor" icon={PenTool}>Editor</NavLink>
              
              <div className="mx-4 h-6 w-px bg-border-secondary" />
              
              <Button variant="outline" size="sm" className="gap-2">
                <Search className="h-4 w-4" />
                <span className="hidden lg:inline">Search posts...</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border-primary bg-surface-primary/95 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <NavLink to="/" icon={Home}>Home</NavLink>
              <NavLink to="/editor" icon={PenTool}>Editor</NavLink>
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Search className="h-4 w-4" />
                  Search posts...
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};