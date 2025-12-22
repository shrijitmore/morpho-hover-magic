import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Products', hasDropdown: true },
  { label: 'Solutions', hasDropdown: true },
  { label: 'Customers', hasDropdown: false },
  { label: 'Resources', hasDropdown: true },
  { label: 'Contact', hasDropdown: false },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
              <path
                d="M16 4L4 10v12l12 6 12-6V10L16 4z"
                stroke="currentColor"
                strokeWidth="2"
                className="text-foreground"
              />
              <path
                d="M16 4v12m0 0l12-6m-12 6L4 10m12 6v12"
                stroke="currentColor"
                strokeWidth="2"
                className="text-foreground"
              />
            </svg>
          </div>
          <span className="text-xl font-semibold text-foreground">Morpho</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
              {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button variant="cta" size="lg">
            Launch App
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
            <Button variant="cta" className="mt-4 w-full">
              Launch App
            </Button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
