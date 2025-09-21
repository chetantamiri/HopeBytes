import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Phone, User } from 'lucide-react';
import Watermark from '@/components/Watermark';
import { Donation, Request } from '@/types';

interface RecipientDashboardProps {
  language: string;
}

const translations = {
  en: {
    title: 'Recipient Dashboard',
    subtitle: 'Find and request available food donations',
    availableDonations: 'Available Donations',
    myRequests: 'My Requests',
    requestFood: 'Request Food',
    selfPickup: 'Self Pickup',
    requestVolunteer: 'Request Volunteer',
    location: 'Location',
    contact: 'Contact',
    expires: 'Expires',
    target: 'Target',
    human: 'Human',
    animal: 'Animal',
    status: 'Status',
    pending: 'Pending',
    assigned: 'Volunteer Assigned',
    delivered: 'Delivered',
    rateVolunteer: 'Rate Volunteer',
    rating: 'Rating (1-10)',
    submitRating: 'Submit Rating'
  },
  hi: {
    title: 'प्राप्तकर्ता डैशबोर्ड',
    subtitle: 'उपलब्ध भोजन दान खोजें और अनुरोध करें',
    availableDonations: 'उपलब्ध दान',
    myRequests: 'मेरे अनुरोध',
    requestFood: 'भोजन का अनुरोध करें',
    selfPickup: 'स्वयं पिकअप',
    requestVolunteer: 'स्वयंसेवक का अनुरोध करें',
    location: 'स्थान',
    contact: 'संपर्क',
    expires: 'समाप्त होता है',
    target: 'लक्ष्य',
    human: 'मानव',
    animal: 'पशु',
    status: 'स्थिति',
    pending: 'लंबित',
    assigned: 'स्वयंसेवक नियुक्त',
    delivered: 'वितरित',
    rateVolunteer: 'स्वयंसेवक को रेट करें',
    rating: 'रेटिंग (1-10)',
    submitRating: 'रेटिंग जमा करें'
  },
  te: {
    title: 'గ్రహీత డాష్‌బోర్డ్',
    subtitle: 'అందుబాటులో ఉన్న ఆహార దానాలను కనుగొని అభ్యర్థించండి',
    availableDonations: 'అందుబాటులో ఉన్న దానాలు',
    myRequests: 'నా అభ్యర్థనలు',
    requestFood: 'ఆహారం అభ్యర్థించండి',
    selfPickup: 'స్వయం పికప్',
    requestVolunteer: 'వాలంటీర్‌ను అభ్యర్థించండి',
    location: 'స్థానం',
    contact: 'సంప్రదింపు',
    expires: 'గడువు ముగుస్తుంది',
    target: 'లక్ష్యం',
    human: 'మానవ',
    animal: 'జంతువు',
    status: 'స్థితి',
    pending: 'పెండింగ్',
    assigned: 'వాలంటీర్ కేటాయించబడింది',
    delivered: 'పంపిణీ చేయబడింది',
    rateVolunteer: 'వాలంటీర్‌ను రేట్ చేయండి',
    rating: 'రేటింగ్ (1-10)',
    submitRating: 'రేటింగ్ సమర్పించండి'
  }
};

export default function RecipientDashboard({ language }: RecipientDashboardProps) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [ratingDonation, setRatingDonation] = useState<string | null>(null);
  const [rating, setRating] = useState('');
  
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    // Load donations and requests from localStorage
    const savedDonations = localStorage.getItem('donations');
    const savedRequests = localStorage.getItem('requests');
    
    if (savedDonations) {
      const allDonations: Donation[] = JSON.parse(savedDonations);
      setDonations(allDonations.filter((d: Donation) => d.status === 'available'));
    }
    
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests) as Request[]);
    }
  }, []);

  const handleRequest = (donationId: string, type: 'pickup' | 'volunteer') => {
    const newRequest: Request = {
      id: Date.now().toString(),
      donationId,
      recipientId: 'current-recipient',
      type,
      status: type === 'pickup' ? 'delivered' : 'pending',
      createdAt: new Date().toISOString(),
      volunteerId: type === 'volunteer' ? 'volunteer-123' : undefined
    };
    
    const updatedRequests = [...requests, newRequest];
    setRequests(updatedRequests);
    localStorage.setItem('requests', JSON.stringify(updatedRequests));
    
    // Update donation status
    const savedDonations = localStorage.getItem('donations');
    if (savedDonations) {
      const allDonations: Donation[] = JSON.parse(savedDonations);
      const updatedDonations = allDonations.map((d: Donation) => 
        d.id === donationId ? { ...d, status: 'claimed' as const } : d
      );
      localStorage.setItem('donations', JSON.stringify(updatedDonations));
      setDonations(updatedDonations.filter((d: Donation) => d.status === 'available'));
    }
  };

  const handleRating = (requestId: string) => {
    if (rating) {
      const volunteerRating = {
        id: Date.now().toString(),
        requestId,
        volunteerId: 'volunteer-123',
        rating: parseInt(rating),
        createdAt: new Date().toISOString()
      };
      
      const savedRatings = localStorage.getItem('volunteerRatings') || '[]';
      const ratings = JSON.parse(savedRatings);
      ratings.push(volunteerRating);
      localStorage.setItem('volunteerRatings', JSON.stringify(ratings));
      
      setRatingDonation(null);
      setRating('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 p-4">
      <Watermark />
      
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Available Donations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-600">{t.availableDonations}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {donations.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No donations available</p>
                ) : (
                  donations.map((donation) => (
                    <div key={donation.id} className="border rounded-lg p-4">
                      {donation.foodImage && (
                        <img 
                          src={donation.foodImage} 
                          alt="Food" 
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                      )}
                      <h3 className="font-semibold mb-2">{donation.purpose}</h3>
                      
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{donation.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{donation.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(donation.expiryTime).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <Badge variant={donation.target === 'human' ? 'default' : 'secondary'}>
                            {t[donation.target as keyof typeof t]}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleRequest(donation.id, 'pickup')}
                          className="flex-1"
                        >
                          {t.selfPickup}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRequest(donation.id, 'volunteer')}
                          className="flex-1"
                        >
                          {t.requestVolunteer}
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* My Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-600">{t.myRequests}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {requests.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No requests yet</p>
                ) : (
                  requests.map((request) => {
                    const donation = donations.find(d => d.id === request.donationId);
                    return (
                      <div key={request.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">
                          {donation?.purpose || 'Food Request'}
                        </h3>
                        
                        <div className="flex justify-between items-center mb-2">
                          <Badge variant={
                            request.status === 'pending' ? 'secondary' :
                            request.status === 'assigned' ? 'default' : 'outline'
                          }>
                            {t[request.status as keyof typeof t]}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        {request.status === 'delivered' && request.type === 'volunteer' && (
                          <div className="mt-3">
                            {ratingDonation === request.id ? (
                              <div className="space-y-2">
                                <input
                                  type="number"
                                  min="1"
                                  max="10"
                                  value={rating}
                                  onChange={(e) => setRating(e.target.value)}
                                  placeholder={t.rating}
                                  className="w-full p-2 border rounded"
                                />
                                <Button 
                                  size="sm"
                                  onClick={() => handleRating(request.id)}
                                  className="w-full"
                                >
                                  {t.submitRating}
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                size="sm"
                                variant="outline"
                                onClick={() => setRatingDonation(request.id)}
                                className="w-full"
                              >
                                {t.rateVolunteer}
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}