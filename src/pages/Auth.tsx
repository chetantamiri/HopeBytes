import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Watermark from '@/components/Watermark';

interface AuthProps {
  language: string;
  onLogin: (role: string) => void;
}

const translations = {
  en: {
    title: 'Login to MealBridge',
    subtitle: 'Choose your role and sign in',
    email: 'Email',
    password: 'Password',
    role: 'Select Role',
    login: 'Login',
    register: 'Create Account',
    donor: 'Donor - Donate Food',
    recipient: 'Recipient - Receive Food',
    volunteer: 'Volunteer - Deliver Food',
    admin: 'Admin - Manage Platform'
  },
  hi: {
    title: 'MealBridge में लॉगिन करें',
    subtitle: 'अपनी भूमिका चुनें और साइन इन करें',
    email: 'ईमेल',
    password: 'पासवर्ड',
    role: 'भूमिका चुनें',
    login: 'लॉगिन',
    register: 'खाता बनाएं',
    donor: 'दाता - भोजन दान करें',
    recipient: 'प्राप्तकर्ता - भोजन प्राप्त करें',
    volunteer: 'स्वयंसेवक - भोजन पहुंचाएं',
    admin: 'व्यवस्थापक - प्लेटफॉर्म प्रबंधित करें'
  },
  te: {
    title: 'MealBridge లో లాగిన్ చేయండి',
    subtitle: 'మీ పాత్రను ఎంచుకుని సైన్ ఇన్ చేయండి',
    email: 'ఇమెయిల్',
    password: 'పాస్‌వర్డ్',
    role: 'పాత్రను ఎంచుకోండి',
    login: 'లాగిన్',
    register: 'ఖాతా సృష్టించండి',
    donor: 'దాత - ఆహారం దానం చేయండి',
    recipient: 'గ్రహీత - ఆహారం అందుకోండి',
    volunteer: 'వాలంటీర్ - ఆహారం పంపిణీ చేయండి',
    admin: 'అడ్మిన్ - ప్లాట్‌ఫారమ్ నిర్వహించండి'
  }
};

export default function Auth({ language, onLogin }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  
  const t = translations[language as keyof typeof translations];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) {
      // Simulate authentication
      onLogin(role);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center p-4">
      <Watermark />
      
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-600">{t.title}</CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="role">{t.role}</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder={t.role} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="donor">{t.donor}</SelectItem>
                  <SelectItem value="recipient">{t.recipient}</SelectItem>
                  <SelectItem value="volunteer">{t.volunteer}</SelectItem>
                  <SelectItem value="admin">{t.admin}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              {isRegister ? t.register : t.login}
            </Button>
            
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? t.login : t.register}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}