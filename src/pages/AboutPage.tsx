import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, Gift, Target } from 'lucide-react';
import Watermark from '@/components/Watermark';

interface AboutPageProps {
  language: string;
}

const translations = {
  en: {
    title: 'About MealBridge',
    subtitle: 'Connecting surplus food with those in need',
    mission: 'Our Mission',
    missionText: 'MealBridge is dedicated to reducing food waste while addressing hunger in our communities. We connect food donors with recipients through our network of dedicated volunteers.',
    howItWorks: 'How It Works',
    step1: 'Donors upload details of surplus food',
    step2: 'Recipients browse and request food items',
    step3: 'Volunteers facilitate safe delivery',
    step4: 'Communities benefit from reduced waste',
    impact: 'Our Impact',
    impactText: 'Together, we are making a difference by ensuring no food goes to waste while helping those in need access nutritious meals.',
    values: 'Our Values',
    sustainability: 'Sustainability',
    sustainabilityText: 'Reducing food waste for a better environment',
    community: 'Community',
    communityText: 'Building stronger connections within neighborhoods',
    compassion: 'Compassion',
    compassionText: 'Caring for those who need support most',
    transparency: 'Transparency',
    transparencyText: 'Open and honest operations you can trust'
  },
  hi: {
    title: 'MealBridge के बारे में',
    subtitle: 'अतिरिक्त भोजन को जरूरतमंदों से जोड़ना',
    mission: 'हमारा मिशन',
    missionText: 'MealBridge हमारे समुदायों में भूख को संबोधित करते हुए भोजन की बर्बादी को कम करने के लिए समर्पित है। हम समर्पित स्वयंसेवकों के नेटवर्क के माध्यम से भोजन दाताओं को प्राप्तकर्ताओं से जोड़ते हैं।',
    howItWorks: 'यह कैसे काम करता है',
    step1: 'दाता अतिरिक्त भोजन का विवरण अपलोड करते हैं',
    step2: 'प्राप्तकर्ता ब्राउज़ करते हैं और भोजन का अनुरोध करते हैं',
    step3: 'स्वयंसेवक सुरक्षित डिलीवरी की सुविधा प्रदान करते हैं',
    step4: 'समुदायों को कम बर्बादी से लाभ होता है',
    impact: 'हमारा प्रभाव',
    impactText: 'मिलकर, हम यह सुनिश्चित करके अंतर ला रहे हैं कि कोई भोजन बर्बाद न हो जबकि जरूरतमंदों को पौष्टिक भोजन तक पहुंच में मदद मिले।',
    values: 'हमारे मूल्य',
    sustainability: 'स्थिरता',
    sustainabilityText: 'बेहतर पर्यावरण के लिए भोजन की बर्बादी कम करना',
    community: 'समुदाय',
    communityText: 'पड़ोसियों के भीतर मजबूत संबंध बनाना',
    compassion: 'करुणा',
    compassionText: 'उन लोगों की देखभाल करना जिन्हें सबसे अधिक सहारे की जरूरत है',
    transparency: 'पारदर्शिता',
    transparencyText: 'खुले और ईमानदार संचालन जिस पर आप भरोसा कर सकते हैं'
  },
  te: {
    title: 'MealBridge గురించి',
    subtitle: 'అదనపు ఆహారాన్ని అవసరమైన వారితో కలుపుట',
    mission: 'మా లక్ష్యం',
    missionText: 'MealBridge మా కమ్యూనిటీలలో ఆకలిని పరిష్కరించేటప్పుడు ఆహార వ్యర్థాలను తగ్గించడానికి అంకితం చేయబడింది. మేము అంకిత వాలంటీర్ల నెట్‌వర్క్ ద్వారా ఆహార దాతలను గ్రహీతలతో కలుపుతాము.',
    howItWorks: 'ఇది ఎలా పనిచేస్తుంది',
    step1: 'దాతలు అదనపు ఆహార వివరాలను అప్‌లోడ్ చేస్తారు',
    step2: 'గ్రహీతలు బ్రౌజ్ చేసి ఆహార వస్తువులను అభ్యర్థిస్తారు',
    step3: 'వాలంటీర్లు సురక్షిత డెలివరీని సులభతరం చేస్తారు',
    step4: 'కమ్యూనిటీలు తగ్గిన వ్యర్థాల నుండి ప్రయోజనం పొందుతాయి',
    impact: 'మా ప్రభావం',
    impactText: 'కలిసి, మేము ఆహారం వృథా కాకుండా చూసుకోవడం ద్వారా మార్పు తెస్తున్నాము, అదే సమయంలో అవసరమైన వారికి పోషకాహారం అందుబాటులో ఉంచడంలో సహాయపడుతున్నాము.',
    values: 'మా విలువలు',
    sustainability: 'స్థిరత్వం',
    sustainabilityText: 'మెరుగైన పర్యావరణం కోసం ఆహార వ్యర్థాలను తగ్గించడం',
    community: 'కమ్యూనిటీ',
    communityText: 'పొరుగు ప్రాంతాలలో బలమైన కనెక్షన్లను నిర్మించడం',
    compassion: 'కరుణ',
    compassionText: 'అత్యధిక మద్దతు అవసరమైన వారిని చూసుకోవడం',
    transparency: 'పారదర్శకత',
    transparencyText: 'మీరు విశ్వసించగల బహిరంగ మరియు నిజాయితీ కార్యకలాపాలు'
  }
};

export default function AboutPage({ language }: AboutPageProps) {
  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 p-4">
      <Watermark />
      
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        {/* Mission */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-600 flex items-center gap-2">
              <Target className="w-6 h-6" />
              {t.mission}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{t.missionText}</p>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">{t.howItWorks}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                <p className="text-gray-700">{t.step1}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                <p className="text-gray-700">{t.step2}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                <p className="text-gray-700">{t.step3}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                <p className="text-gray-700">{t.step4}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-600 flex items-center gap-2">
              <Heart className="w-6 h-6" />
              {t.impact}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{t.impactText}</p>
          </CardContent>
        </Card>

        {/* Values */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">{t.values}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center p-4">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-600 mb-2">{t.sustainability}</h3>
                <p className="text-sm text-gray-600">{t.sustainabilityText}</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-600 mb-2">{t.community}</h3>
                <p className="text-sm text-gray-600">{t.communityText}</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-orange-600 mb-2">{t.compassion}</h3>
                <p className="text-sm text-gray-600">{t.compassionText}</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-purple-600 mb-2">{t.transparency}</h3>
                <p className="text-sm text-gray-600">{t.transparencyText}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}