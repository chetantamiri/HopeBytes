import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Watermark from '@/components/Watermark';

interface SponsorPageProps {
  language: string;
}

const translations = {
  en: {
    title: 'Become a Sponsor',
    subtitle: 'Support MealBridge and help fight food waste',
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone Number',
    email: 'Email Address',
    location: 'Location',
    amount: 'Sponsorship Amount (₹)',
    screenshot: 'Payment Screenshot',
    submit: 'Submit Sponsorship',
    success: 'Thank you for your sponsorship! Your contribution will help us serve more meals.',
    uploadScreenshot: 'Upload payment screenshot'
  },
  hi: {
    title: 'प्रायोजक बनें',
    subtitle: 'MealBridge का समर्थन करें और भोजन की बर्बादी से लड़ने में मदद करें',
    firstName: 'पहला नाम',
    lastName: 'अंतिम नाम',
    phone: 'फोन नंबर',
    email: 'ईमेल पता',
    location: 'स्थान',
    amount: 'प्रायोजन राशि (₹)',
    screenshot: 'भुगतान स्क्रीनशॉट',
    submit: 'प्रायोजन जमा करें',
    success: 'आपके प्रायोजन के लिए धन्यवाद! आपका योगदान हमें अधिक भोजन परोसने में मदद करेगा।',
    uploadScreenshot: 'भुगतान स्क्रीनशॉट अपलोड करें'
  },
  te: {
    title: 'స్పాన్సర్ అవ్వండి',
    subtitle: 'MealBridge కు మద్దతు ఇవ్వండి మరియు ఆహార వ్యర్థాలతో పోరాడటంలో సహాయపడండి',
    firstName: 'మొదటి పేరు',
    lastName: 'చివరి పేరు',
    phone: 'ఫోన్ నంబర్',
    email: 'ఇమెయిల్ చిరునామా',
    location: 'స్థానం',
    amount: 'స్పాన్సర్‌షిప్ మొత్తం (₹)',
    screenshot: 'చెల్లింపు స్క్రీన్‌షాట్',
    submit: 'స్పాన్సర్‌షిప్ సమర్పించండి',
    success: 'మీ స్పాన్సర్‌షిప్‌కు ధన్యవాదాలు! మీ సహకారం మాకు మరిన్ని భోజనాలు అందించడంలో సహాయపడుతుంది।',
    uploadScreenshot: 'చెల్లింపు స్క్రీన్‌షాట్ అప్‌లోడ్ చేయండి'
  }
};

export default function SponsorPage({ language }: SponsorPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    location: '',
    amount: '',
    screenshot: ''
  });
  const [submitted, setSubmitted] = useState(false);
  
  const t = translations[language as keyof typeof translations];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSponsor = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const savedSponsors = localStorage.getItem('sponsors') || '[]';
    const sponsors = JSON.parse(savedSponsors);
    sponsors.push(newSponsor);
    localStorage.setItem('sponsors', JSON.stringify(sponsors));
    
    setSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center p-4">
        <Watermark />
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">{t.success}</h2>
            <Button onClick={() => setSubmitted(false)} className="bg-green-600 hover:bg-green-700">
              Sponsor Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 p-4">
      <Watermark />
      
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-orange-600">{t.title}</CardTitle>
            <CardDescription>Fill in your details to become a sponsor</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">{t.firstName}</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">{t.lastName}</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">{t.phone}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="location">{t.location}</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="amount">{t.amount}</Label>
                <Input
                  id="amount"
                  type="number"
                  min="100"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="screenshot">{t.screenshot}</Label>
                <Input
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        handleInputChange('screenshot', reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  required
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">{t.uploadScreenshot}</p>
              </div>
              
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                {t.submit}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}