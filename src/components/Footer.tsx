import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';
import logo from '@/assets/logo.jpg';

interface FooterProps {
  language: string;
}

const translations = {
  en: {
    sponsors: 'Our Sponsors',
    aboutUs: 'About Us',
    contact: 'Contact Us',
    email: 'contact@mealbridge.org',
    phone: '+91 9876543210',
    address: 'Hyderabad, Telangana, India',
    aboutText: 'MealBridge connects surplus food with those in need, reducing waste while fighting hunger in our communities.',
    thankYou: 'Thank you to our generous sponsors who make our mission possible!'
  },
  hi: {
    sponsors: 'हमारे प्रायोजक',
    aboutUs: 'हमारे बारे में',
    contact: 'संपर्क करें',
    email: 'contact@mealbridge.org',
    phone: '+91 9876543210',
    address: 'हैदराबाद, तेलंगाना, भारत',
    aboutText: 'MealBridge अतिरिक्त भोजन को जरूरतमंदों से जोड़ता है, हमारे समुदायों में भूख से लड़ते हुए बर्बादी को कम करता है।',
    thankYou: 'हमारे उदार प्रायोजकों का धन्यवाद जो हमारे मिशन को संभव बनाते हैं!'
  },
  te: {
    sponsors: 'మా స్పాన్సర్లు',
    aboutUs: 'మా గురించి',
    contact: 'మమ్మల్ని సంప్రదించండి',
    email: 'contact@mealbridge.org',
    phone: '+91 9876543210',
    address: 'హైదరాబాద్, తెలంగాణ, భారతదేశం',
    aboutText: 'MealBridge అదనపు ఆహారాన్ని అవసరమైన వారితో కలుపుతుంది, మా కమ్యూనిటీలలో ఆకలితో పోరాడుతూ వ్యర్థాలను తగ్గిస్తుంది.',
    thankYou: 'మా మిషన్‌ను సాధ్యం చేసే మా ఉదార స్పాన్సర్లకు ధన్యవాదాలు!'
  }
};

// Mock sponsor data
const defaultSponsors = [
  { id: '1', firstName: 'Tech', lastName: 'Solutions', amount: '50000', screenshot: '' },
  { id: '2', firstName: 'Green', lastName: 'Foods Ltd', amount: '75000', screenshot: '' },
  { id: '3', firstName: 'Community', lastName: 'Foundation', amount: '100000', screenshot: '' },
  { id: '4', firstName: 'Local', lastName: 'Business', amount: '25000', screenshot: '' }
];

export default function Footer({ language }: FooterProps) {
  const [sponsors, setSponsors] = useState(defaultSponsors);
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    // Load sponsors from localStorage
    const savedSponsors = localStorage.getItem('sponsors');
    if (savedSponsors) {
      const parsedSponsors = JSON.parse(savedSponsors);
      if (parsedSponsors.length > 0) {
        // Combine saved sponsors with default ones, show top 4 by amount
        const allSponsors = [...defaultSponsors, ...parsedSponsors];
        const topSponsors = allSponsors
          .sort((a, b) => parseInt(b.amount) - parseInt(a.amount))
          .slice(0, 4);
        setSponsors(topSponsors);
      }
    }
  }, []);

  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        {/* Sponsors Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-2 text-orange-400">{t.sponsors}</h2>
          <p className="text-center text-gray-300 mb-8">{t.thankYou}</p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {sponsors.map((sponsor) => (
              <Card key={sponsor.id} className="bg-gray-700 border-gray-600">
                <CardContent className="p-4 text-center">
                  <div className="bg-gradient-to-r from-orange-400 to-green-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">
                      {sponsor.firstName.charAt(0)}{sponsor.lastName.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white mb-1">
                    {sponsor.firstName} {sponsor.lastName}
                  </h3>
                  <p className="text-orange-400 font-bold">₹{parseInt(sponsor.amount).toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 border-t border-gray-600 pt-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-400">{t.aboutUs}</h3>
            <p className="text-gray-300 leading-relaxed">{t.aboutText}</p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-400">{t.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <span className="text-gray-300">{t.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-400" />
                <span className="text-gray-300">{t.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span className="text-gray-300">{t.address}</span>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="flex flex-col items-center justify-center">
            <img 
              src={logo} 
              alt="MealBridge Logo" 
              className="h-20 w-20 object-contain mb-4"
            />
            <span className="text-2xl font-bold">
              <span className="text-green-400">Meal</span>
              <span className="text-orange-400">Bridge</span>
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            © 2024 MealBridge. All rights reserved. | No Food Waste, No Hungry Plates
          </p>
        </div>
      </div>
    </footer>
  );
}