import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Watermark from '@/components/Watermark';
import { Donation } from '@/types';

interface DonorDashboardProps {
  language: string;
}

const translations = {
  en: {
    title: 'Donor Dashboard',
    subtitle: 'Donate food and help reduce waste',
    addDonation: 'Add New Donation',
    myDonations: 'My Donations',
    foodImage: 'Food Image',
    purpose: 'Purpose/Description',
    location: 'Pickup Location',
    phone: 'Contact Phone',
    expiryTime: 'Expiry Time',
    target: 'Target',
    human: 'Human',
    animal: 'Animal',
    submit: 'Submit Donation',
    status: 'Status',
    available: 'Available',
    claimed: 'Claimed',
    delivered: 'Delivered'
  },
  hi: {
    title: 'दाता डैशबोर्ड',
    subtitle: 'भोजन दान करें और बर्बादी कम करने में मदद करें',
    addDonation: 'नया दान जोड़ें',
    myDonations: 'मेरे दान',
    foodImage: 'भोजन की छवि',
    purpose: 'उद्देश्य/विवरण',
    location: 'पिकअप स्थान',
    phone: 'संपर्क फोन',
    expiryTime: 'समाप्ति समय',
    target: 'लक्ष्य',
    human: 'मानव',
    animal: 'पशु',
    submit: 'दान जमा करें',
    status: 'स्थिति',
    available: 'उपलब्ध',
    claimed: 'दावा किया गया',
    delivered: 'वितरित'
  },
  te: {
    title: 'దాత డాష్‌బోర్డ్',
    subtitle: 'ఆహారం దానం చేయండి మరియు వ్యర్థాలను తగ్గించడంలో సహాయపడండి',
    addDonation: 'కొత్త దానం జోడించండి',
    myDonations: 'నా దానాలు',
    foodImage: 'ఆహార చిత్రం',
    purpose: 'ప్రయోజనం/వివరణ',
    location: 'పికప్ స్థానం',
    phone: 'సంప్రదింపు ఫోన్',
    expiryTime: 'గడువు సమయం',
    target: 'లక్ష్యం',
    human: 'మానవ',
    animal: 'జంతువు',
    submit: 'దానం సమర్పించండి',
    status: 'స్థితి',
    available: 'అందుబాటులో',
    claimed: 'క్లెయిమ్ చేయబడింది',
    delivered: 'పంపిణీ చేయబడింది'
  }
};

export default function DonorDashboard({ language }: DonorDashboardProps) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [formData, setFormData] = useState({
    foodImage: '',
    purpose: '',
    location: '',
    phone: '',
    expiryTime: '',
    target: ''
  });
  
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    // Load donations from localStorage
    const savedDonations = localStorage.getItem('donations');
    if (savedDonations) {
      setDonations(JSON.parse(savedDonations) as Donation[]);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDonation: Donation = {
      id: Date.now().toString(),
      ...formData,
      target: formData.target as 'human' | 'animal',
      donorId: 'current-donor',
      status: 'available',
      createdAt: new Date().toISOString()
    };
    
    const updatedDonations = [...donations, newDonation];
    setDonations(updatedDonations);
    localStorage.setItem('donations', JSON.stringify(updatedDonations));
    
    // Reset form
    setFormData({
      foodImage: '',
      purpose: '',
      location: '',
      phone: '',
      expiryTime: '',
      target: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          {/* Add Donation Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-600">{t.addDonation}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="foodImage">{t.foodImage}</Label>
                  <Input
                    id="foodImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          handleInputChange('foodImage', reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="purpose">{t.purpose}</Label>
                  <Textarea
                    id="purpose"
                    value={formData.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
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
                  <Label htmlFor="expiryTime">{t.expiryTime}</Label>
                  <Input
                    id="expiryTime"
                    type="datetime-local"
                    value={formData.expiryTime}
                    onChange={(e) => handleInputChange('expiryTime', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="target">{t.target}</Label>
                  <Select value={formData.target} onValueChange={(value) => handleInputChange('target', value)} required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={t.target} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="human">{t.human}</SelectItem>
                      <SelectItem value="animal">{t.animal}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  {t.submit}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* My Donations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-600">{t.myDonations}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {donations.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No donations yet</p>
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
                      <h3 className="font-semibold">{donation.purpose}</h3>
                      <p className="text-sm text-gray-600">{donation.location}</p>
                      <p className="text-sm text-gray-600">{donation.target}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          donation.status === 'available' ? 'bg-green-100 text-green-800' :
                          donation.status === 'claimed' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {t[donation.status as keyof typeof t]}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(donation.expiryTime).toLocaleString()}
                        </span>
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