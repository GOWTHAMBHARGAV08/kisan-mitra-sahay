import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  Cloud, 
  Leaf, 
  Store, 
  MessageCircle, 
  MapPin, 
  Globe, 
  User,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const Layout = () => {
  const location = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard', labelHi: 'डैशबोर्ड' },
    { path: '/weather', icon: Cloud, label: 'Weather', labelHi: 'मौसम' },
    { path: '/crop-care', icon: Leaf, label: 'Crop Care', labelHi: 'फसल देखभाल' },
    { path: '/store', icon: Store, label: 'Store', labelHi: 'दुकान' },
    { path: '/chat', icon: MessageCircle, label: 'Chat', labelHi: 'चैट' }
  ];

  const isActive = (path: string) => location.pathname === path;

  const FloatingActionButton = () => (
    <Link 
      to="/chat" 
      className="fixed bottom-20 right-6 z-50 md:bottom-6"
    >
      <Button 
        size="lg" 
        className="floating-action rounded-full w-14 h-14 shadow-floating hover:scale-105 transition-all duration-300"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    </Link>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2 rounded-xl">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-primary">KisanMitra</h1>
          </div>

          {/* Location and Controls */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Guntur, AP</span>
            </Button>

            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedLanguage(selectedLanguage === 'English' ? 'हिन्दी' : 'English')}
            >
              <Globe className="w-4 h-4 mr-1" />
              <span className="text-sm">{selectedLanguage}</span>
            </Button>

            <Button variant="ghost" size="sm" className="rounded-full p-2">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <nav className="hidden md:flex md:w-64 md:flex-col bg-card border-r border-border">
          <div className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-pill flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'active'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 min-h-screen pb-20 md:pb-6">
          <Outlet />
          <Footer />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 py-2 z-30">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default Layout;