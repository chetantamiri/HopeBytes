import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import logo from '@/assets/logo.jpg'; // ✅ import your logo

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

const translations = {
  en: {
    home: 'Home',
    about: 'About',
    login: 'Login',
    sponsor: 'Become Sponsor',
    donor: 'Donor',
    recipient: 'Recipient', 
    volunteer: 'Volunteer',
    admin: 'Admin',
    logout: 'Logout'
  },
  hi: {
    home: 'होम',
    about: 'के बारे में',
    login: 'लॉगिन',
    sponsor: 'प्रायोजक बनें',
    donor: 'दाता',
    recipient: 'प्राप्तकर्ता',
    volunteer: 'स्वयंसेवक', 
    admin: 'व्यवस्थापक',
    logout: 'लॉगआउट'
  },
  te: {
    home: 'హోమ్',
    about: 'గురించి',
    login: 'లాగిన్',
    sponsor: 'స్పాన్సర్ అవ్వండి',
    donor: 'దాత',
    recipient: 'గ్రహీత',
    volunteer: 'వాలంటీర్',
    admin: 'అడ్మిన్',
    logout: 'లాగ్అవుట్'
  }
};

export default function Header({ currentPage, onNavigate, language, onLanguageChange }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string>('');
  const t = translations[language as keyof typeof translations];

  const handleLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setUserRole('');
      onNavigate('home');
    } else {
      onNavigate('auth');
    }
  };

  const handleRoleLogin = (role: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    onNavigate(`${role}-dashboard`);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
          <img 
            src={logo} 
            alt="MealBridge Logo" 
            className="h-12 w-12 object-contain"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
            MealBridge
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button 
            variant={currentPage === 'home' ? 'default' : 'ghost'}
            onClick={() => onNavigate('home')}
          >
            {t.home}
          </Button>
          <Button 
            variant={currentPage === 'about' ? 'default' : 'ghost'}
            onClick={() => onNavigate('about')}
          >
            {t.about}
          </Button>
          
          {isLoggedIn ? (
            <>
              <Button 
                variant={currentPage.includes('dashboard') ? 'default' : 'ghost'}
                onClick={() => onNavigate(`${userRole}-dashboard`)}
              >
                {t[userRole as keyof typeof t]}
              </Button>
              <Button variant="outline" onClick={handleLogin}>
                {t.logout}
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={handleLogin}>
              {t.login}
            </Button>
          )}
          
          <Button 
            variant={currentPage === 'sponsor' ? 'default' : 'ghost'}
            onClick={() => onNavigate('sponsor')}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            {t.sponsor}
          </Button>
        </nav>

        {/* Language Selector */}
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">EN</SelectItem>
            <SelectItem value="hi">हि</SelectItem>
            <SelectItem value="te">తె</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant={currentPage === 'home' ? 'default' : 'ghost'} onClick={() => onNavigate('home')}>
            {t.home}
          </Button>
          <Button size="sm" variant={currentPage === 'about' ? 'default' : 'ghost'} onClick={() => onNavigate('about')}>
            {t.about}
          </Button>
          {isLoggedIn ? (
            <>
              <Button size="sm" variant={currentPage.includes('dashboard') ? 'default' : 'ghost'} onClick={() => onNavigate(`${userRole}-dashboard`)}>
                {t[userRole as keyof typeof t]}
              </Button>
              <Button size="sm" variant="outline" onClick={handleLogin}>{t.logout}</Button>
            </>
          ) : (
            <Button size="sm" variant="outline" onClick={handleLogin}>{t.login}</Button>
          )}
          <Button size="sm" variant="ghost" onClick={() => onNavigate('sponsor')} className="bg-orange-500 text-white">
            {t.sponsor}
          </Button>
        </div>
      </div>

      {/* Pass login handler to parent for auth page */}
      {currentPage === 'auth' && (
        <div style={{ display: 'none' }} data-login-handler={handleRoleLogin} />
      )}
    </header>
  );
}
