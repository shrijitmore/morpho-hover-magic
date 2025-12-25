import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Work', hasDropdown: false },
  { label: 'Company', hasDropdown: true },
  { label: 'Services', hasDropdown: true },
  { label: 'Garai', hasDropdown: false },
  { label: 'Contact', hasDropdown: false },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-display font-bold tracking-tight text-foreground uppercase">
            Orangeglazz
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
              {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button 
            className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-6 gap-2 font-medium"
          >
            Start Your Project
            <div className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border p-6"
        >
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center justify-between text-foreground py-2"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </button>
            ))}
            <Button className="mt-4 w-full rounded-full bg-foreground text-background hover:bg-foreground/90">
              Start Your Project
            </Button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
