import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Gift, Heart, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Watermark from '@/components/Watermark';
import Auth from './Auth';
import DonorDashboard from './DonorDashboard';
import RecipientDashboard from './RecipientDashboard';
import VolunteerDashboard from './VolunteerDashboard';
import AdminDashboard from './AdminDashboard';
import SponsorPage from './SponsorPage';
import AboutPage from './AboutPage';

const translations = {
  en: {
    hero: 'No Food Waste, No Hungry Plates',
    subtitle: 'Connect surplus food with those in need through our community-driven platform',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    howItWorks: 'How MealBridge Works',
    step1: 'Donate Food',
    step1Desc: 'Restaurants, events, and individuals can donate surplus food',
    step2: 'Request Food', 
    step2Desc: 'Those in need can browse and request available food items',
    step3: 'Volunteer Delivery',
    step3Desc: 'Community volunteers help deliver food safely and efficiently',
    impact: 'Our Impact',
    impactDesc: 'Making a difference in communities across the region',
    mealsServed: 'Meals Served',
    foodSaved: 'Kg Food Saved',
    volunteersActive: 'Active Volunteers',
    communitiesServed: 'Communities Served',
    joinMovement: 'Join the Movement',
    becomeVolunteer: 'Become a Volunteer',
    donateFoodNow: 'Donate Food Now',
    findFood: 'Find Food',
    sponsorUs: 'Sponsor Us'
  },
  hi: {
    hero: 'कोई भोजन बर्बादी नहीं, कोई भूखी प्लेटें नहीं',
    subtitle: 'हमारे समुदाय-संचालित प्लेटफॉर्म के माध्यम से अतिरिक्त भोजन को जरूरतमंदों से जोड़ें',
    getStarted: 'शुरू करें',
    learnMore: 'और जानें',
    howItWorks: 'MealBridge कैसे काम करता है',
    step1: 'भोजन दान करें',
    step1Desc: 'रेस्तरां, कार्यक्रम और व्यक्ति अतिरिक्त भोजन दान कर सकते हैं',
    step2: 'भोजन का अनुरोध करें',
    step2Desc: 'जरूरतमंद लोग उपलब्ध भोजन की वस्तुओं को ब्राउज़ और अनुरोध कर सकते हैं',
    step3: 'स्वयंसेवक डिलीवरी',
    step3Desc: 'समुदायी स्वयंसेवक भोजन को सुरक्षित और कुशलता से पहुंचाने में मदद करते हैं',
    impact: 'हमारा प्रभाव',
    impactDesc: 'क्षेत्र भर के समुदायों में बदलाव ला रहे हैं',
    mealsServed: 'परोसे गए भोजन',
    foodSaved: 'किलो भोजन बचाया',
    volunteersActive: 'सक्रिय स्वयंसेवक',
    communitiesServed: 'सेवा किए गए समुदाय',
    joinMovement: 'आंदोलन में शामिल हों',
    becomeVolunteer: 'स्वयंसेवक बनें',
    donateFoodNow: 'अभी भोजन दान करें',
    findFood: 'भोजन खोजें',
    sponsorUs: 'हमें प्रायोजित करें'
  },
  te: {
    hero: 'ఆహార వ్యర్థాలు లేవు, ఆకలితో ఉన్న ప్లేట్లు లేవు',
    subtitle: 'మా కమ్యూనిటీ-నడిచే ప్లాట్‌ఫారమ్ ద్వారా అదనపు ఆహారాన్ని అవసరమైన వారితో కలుపుము',
    getStarted: 'ప్రారంభించండి',
    learnMore: 'మరింత తెలుసుకోండి',
    howItWorks: 'MealBridge ఎలా పనిచేస్తుంది',
    step1: 'ఆహారం దానం చేయండి',
    step1Desc: 'రెస్టారెంట్లు, ఈవెంట్లు మరియు వ్యక్తులు అదనపు ఆహారాన్ని దానం చేయవచ్చు',
    step2: 'ఆహారం అభ్యర్థించండి',
    step2Desc: 'అవసరమైన వారు అందుబాటులో ఉన్న ఆహార వస్తువులను బ్రౌజ్ చేసి అభ్యర్థించవచ్చు',
    step3: 'వాలంటీర్ డెలివరీ',
    step3Desc: 'కమ్యూనిటీ వాలంటీర్లు ఆహారాన్ని సురక్షితంగా మరియు సమర్థవంతంగా అందించడంలో సహాయపడతారు',
    impact: 'మా ప్రభావం',
    impactDesc: 'ప్రాంతం అంతటా కమ్యూనిటీలలో మార్పు తెస్తున్నాము',
    mealsServed: 'వడ్డించిన భోజనం',
    foodSaved: 'కిలోల ఆహారం ఆదా',
    volunteersActive: 'క్రియాశీల వాలంటీర్లు',
    communitiesServed: 'సేవ చేసిన కమ్యూనిటీలు',
    joinMovement: 'ఉద్యమంలో చేరండి',
    becomeVolunteer: 'వాలంటీర్ అవ్వండి',
    donateFoodNow: 'ఇప్పుడే ఆహారం దానం చేయండి',
    findFood: 'ఆహారం కనుగొనండి',
    sponsorUs: 'మమ్మల్ని స్పాన్సర్ చేయండి'
  }
};

export default function Index() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('en');
  
  const t = translations[language as keyof typeof translations];

  const handleLogin = (role: string) => {
    setCurrentPage(`${role}-dashboard`);
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  // Render different pages based on current page
  if (currentPage === 'auth') {
    return <Auth language={language} onLogin={handleLogin} />;
  }
  
  if (currentPage === 'donor-dashboard') {
    return (
      <div>
        <Header currentPage={currentPage} onNavigate={handleNavigation} language={language} onLanguageChange={setLanguage} />
        <DonorDashboard language={language} />
        <Footer language={language} />
      </div>
    );
  }
  
  if (currentPage === 'recipient-dashboard') {
    return (
      <div>
        <Header currentPage={currentPage} onNavigate={handleNavigation} language={language} onLanguageChange={setLanguage} />
        <RecipientDashboard language={language} />
        <Footer language={language} />
      </div>
    );
  }
  
  if (currentPage === 'volunteer-dashboard') {
    return (
      <div>
        <Header currentPage={currentPage} onNavigate={handleNavigation} language={language} onLanguageChange={setLanguage} />
        <VolunteerDashboard language={language} />
        <Footer language={language} />
      </div>
    );
  }
  
  if (currentPage === 'admin-dashboard') {
    return (
      <div>
        <Header currentPage={currentPage} onNavigate={handleNavigation} language={language} onLanguageChange={setLanguage} />
        <AdminDashboard language={language} />
        <Footer language={language} />
      </div>
    );
  }
  
  if (currentPage === 'sponsor') {
    return (
      <div>
        <Header currentPage={currentPage} onNavigate={handleNavigation} language={language} onLanguageChange={setLanguage} />
        <SponsorPage language={language} />
        <Footer language={language} />
      </div>
    );
  }
  
  if (currentPage === 'about') {
    return (
      <div>
        <Header currentPage={currentPage} onNavigate={handleNavigation} language={language} onLanguageChange={setLanguage} />
        <AboutPage language={language} />
        <Footer language={language} />
      </div>
    );
  }

  // Home page
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <Header currentPage={currentPage} onNavigate={handleNavigation} language={language} onLanguageChange={setLanguage} />
      <Watermark />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-orange-500 to-green-600 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {t.hero}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 text-lg"
              onClick={() => setCurrentPage('auth')}
            >
              {t.getStarted}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg"
              onClick={() => setCurrentPage('about')}
            >
              {t.learnMore}
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">{t.howItWorks}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-green-600">{t.step1}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{t.step1Desc}</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-orange-600">{t.step2}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{t.step2Desc}</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-blue-600">{t.step3}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{t.step3Desc}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">{t.impact}</h2>
          <p className="text-xl text-gray-600 mb-12">{t.impactDesc}</p>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">2,500+</div>
              <div className="text-gray-700">{t.mealsServed}</div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">1,200+</div>
              <div className="text-gray-700">{t.foodSaved}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-700">{t.volunteersActive}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">25+</div>
              <div className="text-gray-700">{t.communitiesServed}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-orange-600">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-4xl font-bold mb-6">{t.joinMovement}</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-green-600 hover:bg-gray-100"
              onClick={() => setCurrentPage('auth')}
            >
              {t.becomeVolunteer}
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-orange-600 hover:bg-gray-100"
              onClick={() => setCurrentPage('auth')}
            >
              {t.donateFoodNow}
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setCurrentPage('auth')}
            >
              {t.findFood}
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => setCurrentPage('sponsor')}
            >
              {t.sponsorUs}
            </Button>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
}