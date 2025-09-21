import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Users, Gift, Heart, TrendingUp } from 'lucide-react';
import Watermark from '@/components/Watermark';
import { Donation, Request, Sponsor, VolunteerRating, VolunteerProfile, Payout } from '@/types';

interface AdminDashboardProps {
  language: string;
}

const translations = {
  en: {
    title: 'Admin Dashboard',
    subtitle: 'Manage and monitor the MealBridge platform',
    totalStats: 'Platform Statistics',
    donations: 'Total Donations',
    volunteers: 'Active Volunteers',
    sponsors: 'Total Sponsors',
    mealsServed: 'Meals Served',
    volunteerRatings: 'Volunteer Ratings',
    payouts: 'Volunteer Payouts',
    sendPayout: 'Send Payout',
    analytics: 'Analytics & Insights',
    donationsGrowth: 'Donations Growth',
    mealsPerWeek: 'Meals Served Per Week',
    sponsorshipTrends: 'Sponsorship Trends',
    volunteerActivity: 'Volunteer Activity',
    volunteer: 'Volunteer',
    rating: 'Rating',
    credits: 'Credits',
    upiId: 'UPI ID',
    amount: 'Amount',
    status: 'Status',
    pending: 'Pending',
    paid: 'Paid'
  },
  hi: {
    title: 'व्यवस्थापक डैशबोर्ड',
    subtitle: 'MealBridge प्लेटफॉर्म का प्रबंधन और निगरानी करें',
    totalStats: 'प्लेटफॉर्म आंकड़े',
    donations: 'कुल दान',
    volunteers: 'सक्रिय स्वयंसेवक',
    sponsors: 'कुल प्रायोजक',
    mealsServed: 'परोसे गए भोजन',
    volunteerRatings: 'स्वयंसेवक रेटिंग',
    payouts: 'स्वयंसेवक भुगतान',
    sendPayout: 'भुगतान भेजें',
    analytics: 'विश्लेषण और अंतर्दृष्टि',
    donationsGrowth: 'दान वृद्धि',
    mealsPerWeek: 'प्रति सप्ताह परोसे गए भोजन',
    sponsorshipTrends: 'प्रायोजन रुझान',
    volunteerActivity: 'स्वयंसेवक गतिविधि',
    volunteer: 'स्वयंसेवक',
    rating: 'रेटिंग',
    credits: 'क्रेडिट',
    upiId: 'UPI ID',
    amount: 'राशि',
    status: 'स्थिति',
    pending: 'लंबित',
    paid: 'भुगतान किया गया'
  },
  te: {
    title: 'అడ్మిన్ డాష్‌బోర్డ్',
    subtitle: 'MealBridge ప్లాట్‌ఫారమ్‌ను నిర్వహించండి మరియు పర్యవేక్షించండి',
    totalStats: 'ప్లాట్‌ఫారమ్ గణాంకాలు',
    donations: 'మొత్తం దానాలు',
    volunteers: 'క్రియాశీల వాలంటీర్లు',
    sponsors: 'మొత్తం స్పాన్సర్లు',
    mealsServed: 'వడ్డించిన భోజనం',
    volunteerRatings: 'వాలంటీర్ రేటింగ్‌లు',
    payouts: 'వాలంటీర్ చెల్లింపులు',
    sendPayout: 'చెల్లింపు పంపండి',
    analytics: 'విశ్లేషణలు మరియు అంతర్దృష్టులు',
    donationsGrowth: 'దానాల వృద్ధి',
    mealsPerWeek: 'వారానికి వడ్డించిన భోజనం',
    sponsorshipTrends: 'స్పాన్సర్‌షిప్ ట్రెండ్‌లు',
    volunteerActivity: 'వాలంటీర్ కార్యకలాపాలు',
    volunteer: 'వాలంటీర్',
    rating: 'రేటింగ్',
    credits: 'క్రెడిట్‌లు',
    upiId: 'UPI ID',
    amount: 'మొత్తం',
    status: 'స్థితి',
    pending: 'పెండింగ్',
    paid: 'చెల్లించబడింది'
  }
};

// Mock data for charts
const donationsData = [
  { week: 'Week 1', donations: 12 },
  { week: 'Week 2', donations: 19 },
  { week: 'Week 3', donations: 25 },
  { week: 'Week 4', donations: 31 },
];

const mealsData = [
  { week: 'Week 1', meals: 45 },
  { week: 'Week 2', meals: 67 },
  { week: 'Week 3', meals: 89 },
  { week: 'Week 4', meals: 112 },
];

const sponsorshipData = [
  { month: 'Jan', amount: 5000 },
  { month: 'Feb', amount: 7500 },
  { month: 'Mar', amount: 12000 },
  { month: 'Apr', amount: 18000 },
];

export default function AdminDashboard({ language }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    donations: 0,
    volunteers: 0,
    sponsors: 0,
    mealsServed: 0
  });
  const [volunteerRatings, setVolunteerRatings] = useState<VolunteerRating[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    // Load data from localStorage
    const savedDonations = localStorage.getItem('donations');
    const savedRequests = localStorage.getItem('requests');
    const savedSponsors = localStorage.getItem('sponsors');
    const savedRatings = localStorage.getItem('volunteerRatings');
    const savedProfile = localStorage.getItem('volunteerProfile');
    
    if (savedDonations) {
      const donations: Donation[] = JSON.parse(savedDonations);
      setStats(prev => ({ ...prev, donations: donations.length }));
    }
    
    if (savedRequests) {
      const requests: Request[] = JSON.parse(savedRequests);
      const deliveredMeals = requests.filter((r: Request) => r.status === 'delivered').length;
      setStats(prev => ({ ...prev, mealsServed: deliveredMeals, volunteers: 5 }));
    }
    
    if (savedSponsors) {
      const sponsors: Sponsor[] = JSON.parse(savedSponsors);
      setStats(prev => ({ ...prev, sponsors: sponsors.length }));
    }
    
    if (savedRatings) {
      const ratings: VolunteerRating[] = JSON.parse(savedRatings);
      setVolunteerRatings(ratings);
    }
    
    // Mock payouts data
    if (savedProfile) {
      const profile: VolunteerProfile = JSON.parse(savedProfile);
      setPayouts([{
        id: '1',
        volunteerId: 'volunteer-123',
        volunteerName: 'John Doe',
        credits: profile.credits || 0,
        upiId: profile.upiId || 'john@upi',
        amount: (profile.credits || 0) * 5, // 5 rupees per credit
        status: 'pending'
      }]);
    }
  }, []);

  const handleSendPayout = (payoutId: string) => {
    setPayouts(prev => prev.map(p => 
      p.id === payoutId ? { ...p, status: 'paid' as const } : p
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 p-4">
      <Watermark />
      
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t.donations}</p>
                  <p className="text-2xl font-bold text-green-600">{stats.donations}</p>
                </div>
                <Gift className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t.volunteers}</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.volunteers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t.sponsors}</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.sponsors}</p>
                </div>
                <Heart className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t.mealsServed}</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.mealsServed}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Volunteer Ratings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-600">{t.volunteerRatings}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {volunteerRatings.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No ratings yet</p>
                ) : (
                  volunteerRatings.map((rating) => (
                    <div key={rating.id} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-semibold">Volunteer #{rating.volunteerId.slice(-3)}</p>
                        <p className="text-sm text-gray-600">{new Date(rating.createdAt).toLocaleDateString()}</p>
                      </div>
                      <Badge variant="outline" className="text-lg">
                        ⭐ {rating.rating}/10
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payouts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-600">{t.payouts}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {payouts.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No payouts pending</p>
                ) : (
                  payouts.map((payout) => (
                    <div key={payout.id} className="border rounded p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{payout.volunteerName}</p>
                          <p className="text-sm text-gray-600">{payout.upiId}</p>
                        </div>
                        <Badge variant={payout.status === 'paid' ? 'default' : 'secondary'}>
                          {t[payout.status as keyof typeof t]}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          {payout.credits} credits = ₹{payout.amount}
                        </span>
                        {payout.status === 'pending' && (
                          <Button 
                            size="sm"
                            onClick={() => handleSendPayout(payout.id)}
                          >
                            {t.sendPayout}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-green-600">{t.donationsGrowth}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={donationsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="donations" stroke="#16a34a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-green-600">{t.mealsPerWeek}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={mealsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="meals" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg text-green-600">{t.sponsorshipTrends}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={sponsorshipData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}