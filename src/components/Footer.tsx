import React from 'react';
import { ExternalLink, Phone, FileText, HelpCircle } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { icon: FileText, label: 'Advisory', href: '#' },
    { icon: HelpCircle, label: 'Govt Schemes', href: '#' },
    { icon: Phone, label: 'Helpline: 1800-XXX-XXXX', href: 'tel:1800XXXXXX' }
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a 
                  key={index}
                  href={link.href}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                  {link.href.startsWith('http') && <ExternalLink className="w-3 h-3" />}
                </a>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div className="text-center md:text-right">
            <p className="text-xs text-muted-foreground max-w-md">
              <strong className="text-warning">Disclaimer:</strong> Use chemicals responsibly. 
              Always follow label instructions and safety guidelines.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 KisanMitra. Empowering farmers with smart agriculture solutions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;