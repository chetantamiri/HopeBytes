import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Phone, Star } from 'lucide-react';
import Watermark from '@/components/Watermark';
import { Request, VolunteerProfile, VolunteerRating } from '@/types';

interface VolunteerDashboardProps {
  language: string;
}

const translations = {
  en: {
    title: 'Volunteer Dashboard',
    subtitle: 'Help deliver food to those in need',
    availableRequests: 'Available Requests',
    myDeliveries: 'My Deliveries',
    profile: 'Profile Settings',
    upiId: 'UPI ID',
    saveProfile: 'Save Profile',
    claimTask: 'Claim Task',
    updateStatus: 'Update Status',
    picked: 'Picked Up',
    delivered: 'Delivered',
    location: 'Location',
    contact: 'Contact',
    requestedAt: 'Requested',
    status: 'Status',
    pending: 'Pending',
    assigned: 'Assigned to You',
    credits: 'Credits Earned',
    rating: 'Average Rating'
  },
  hi: {
    title: 'स्वयंसेवक डैशबोर्ड',
    subtitle: 'जरूरतमंदों तक भोजन पहुंचाने में मदद करें',
    availableRequests: 'उपलब्ध अनुरोध',
    myDeliveries: 'मेरी डिलीवरी',
    profile: 'प्रोफाइल सेटिंग्स',
    upiId: 'UPI ID',
    saveProfile: 'प्रोफाइल सेव करें',
    claimTask: 'कार्य का दावा करें',
    updateStatus: 'स्थिति अपडेट करें',
    picked: 'उठाया गया',
    delivered: 'वितरित',
    location: 'स्थान',
    contact: 'संपर्क',
    requestedAt: 'अनुरोधित',
    status: 'स्थिति',
    pending: 'लंबित',
    assigned: 'आपको सौंपा गया',
    credits: 'अर्जित क्रेडिट',
    rating: 'औसत रेटिंग'
  },
  te: {
    title: 'వాలంటీర్ డాష్‌బోర్డ్',
    subtitle: 'అవసరమైన వారికి ఆహారం అందించడంలో సహాయపడండి',
    availableRequests: 'అందుబాటులో ఉన్న అభ్యర్థనలు',
    myDeliveries: 'నా డెలివరీలు',
    profile: 'ప్రొఫైల్ సెట్టింగ్‌లు',
    upiId: 'UPI ID',
    saveProfile: 'ప్రొఫైల్ సేవ్ చేయండి',
    claimTask: 'టాస్క్ క్లెయిమ్ చేయండి',
    updateStatus: 'స్థితిని అప్‌డేట్ చేయండి',
    picked: 'తీసుకోబడింది',
    delivered: 'పంపిణీ చేయబడింది',
    location: 'స్థానం',
    contact: 'సంప్రదింపు',
    requestedAt: 'అభ్యర్థించబడింది',
    status: 'స్థితి',
    pending: 'పెండింగ్',
    assigned: 'మీకు కేటాయించబడింది',
    credits: 'సంపాదించిన క్రెడిట్‌లు',
    rating: 'సగటు రేటింగ్'
  }
};

export default function VolunteerDashboard({ language }: VolunteerDashboardProps) {
  const [requests, setRequests] = useState<Request[]>([]);
  const [myDeliveries, setMyDeliveries] = useState<Request[]>([]);
  const [upiId, setUpiId] = useState('');
  const [credits, setCredits] = useState(0);
  const [rating, setRating] = useState(0);
  
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    // Load data from localStorage
    const savedRequests = localStorage.getItem('requests');
    const savedProfile = localStorage.getItem('volunteerProfile');
    const savedRatings = localStorage.getItem('volunteerRatings');
    
    if (savedRequests) {
      const allRequests: Request[] = JSON.parse(savedRequests);
      setRequests(allRequests.filter((r: Request) => r.type === 'volunteer' && r.status === 'pending'));
      setMyDeliveries(allRequests.filter((r: Request) => r.volunteerId === 'volunteer-123'));
    }
    
    if (savedProfile) {
      const profile: VolunteerProfile = JSON.parse(savedProfile);
      setUpiId(profile.upiId || '');
      setCredits(profile.credits || 0);
    }
    
    if (savedRatings) {
      const ratings: VolunteerRating[] = JSON.parse(savedRatings);
      const volunteerRatings = ratings.filter((r: VolunteerRating) => r.volunteerId === 'volunteer-123');
      if (volunteerRatings.length > 0) {
        const avgRating = volunteerRatings.reduce((sum: number, r: VolunteerRating) => sum + r.rating, 0) / volunteerRatings.length;
        setRating(avgRating);
      }
    }
  }, []);

  const handleClaimTask = (requestId: string) => {
    const savedRequests = localStorage.getItem('requests');
    if (savedRequests) {
      const allRequests: Request[] = JSON.parse(savedRequests);
      const updatedRequests = allRequests.map((r: Request) => 
        r.id === requestId ? { ...r, status: 'assigned' as const, volunteerId: 'volunteer-123' } : r
      );
      localStorage.setItem('requests', JSON.stringify(updatedRequests));
      
      setRequests(updatedRequests.filter((r: Request) => r.type === 'volunteer' && r.status === 'pending'));
      setMyDeliveries(updatedRequests.filter((r: Request) => r.volunteerId === 'volunteer-123'));
    }
  };

  const handleUpdateStatus = (requestId: string, newStatus: string) => {
    const savedRequests = localStorage.getItem('requests');
    if (savedRequests) {
      const allRequests: Request[] = JSON.parse(savedRequests);
      const updatedRequests = allRequests.map((r: Request) => 
        r.id === requestId ? { ...r, status: newStatus as Request['status'] } : r
      );
      localStorage.setItem('requests', JSON.stringify(updatedRequests));
      setMyDeliveries(updatedRequests.filter((r: Request) => r.volunteerId === 'volunteer-123'));
      
      // Add credits for delivery
      if (newStatus === 'delivered') {
        const newCredits = credits + 10;
        setCredits(newCredits);
        const profile: VolunteerProfile = { upiId, credits: newCredits };
        localStorage.setItem('volunteerProfile', JSON.stringify(profile));
      }
    }
  };

  const handleSaveProfile = () => {
    const profile: VolunteerProfile = { upiId, credits };
    localStorage.setItem('volunteerProfile', JSON.stringify(profile));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 p-4">
      <Watermark />
      
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{credits}</div>
              <div className="text-sm text-gray-600">{t.credits}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 flex items-center justify-center gap-1">
                <Star className="w-5 h-5 fill-current" />
                {rating.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">{t.rating}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <Label htmlFor="upi">{t.upiId}</Label>
                <Input
                  id="upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="your@upi"
                />
                <Button size="sm" onClick={handleSaveProfile} className="w-full">
                  {t.saveProfile}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Available Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-600">{t.availableRequests}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {requests.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No requests available</p>
                ) : (
                  requests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>Pickup & Delivery Location</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(request.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm"
                        onClick={() => handleClaimTask(request.id)}
                        className="w-full"
                      >
                        {t.claimTask}
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* My Deliveries */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-600">{t.myDeliveries}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {myDeliveries.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No deliveries yet</p>
                ) : (
                  myDeliveries.map((delivery) => (
                    <div key={delivery.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant={
                          delivery.status === 'assigned' ? 'default' :
                          delivery.status === 'picked' ? 'secondary' : 'outline'
                        }>
                          {t[delivery.status as keyof typeof t] || delivery.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(delivery.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {delivery.status === 'assigned' && (
                        <Button 
                          size="sm"
                          onClick={() => handleUpdateStatus(delivery.id, 'picked')}
                          className="w-full mb-2"
                        >
                          {t.picked}
                        </Button>
                      )}
                      
                      {delivery.status === 'picked' && (
                        <Button 
                          size="sm"
                          onClick={() => handleUpdateStatus(delivery.id, 'delivered')}
                          className="w-full mb-2"
                        >
                          {t.delivered}
                        </Button>
                      )}
                      
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>Location tracking active</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}