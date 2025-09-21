export interface Donation {
  id: string;
  foodImage: string;
  purpose: string;
  location: string;
  phone: string;
  expiryTime: string;
  target: 'human' | 'animal';
  donorId: string;
  status: 'available' | 'claimed' | 'delivered';
  createdAt: string;
}

export interface Request {
  id: string;
  donationId: string;
  recipientId: string;
  type: 'pickup' | 'volunteer';
  status: 'pending' | 'assigned' | 'picked' | 'delivered';
  createdAt: string;
  volunteerId?: string;
}

export interface VolunteerRating {
  id: string;
  requestId: string;
  volunteerId: string;
  rating: number;
  createdAt: string;
}

export interface VolunteerProfile {
  upiId: string;
  credits: number;
}

export interface Sponsor {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  location: string;
  amount: string;
  screenshot: string;
  createdAt: string;
}

export interface Payout {
  id: string;
  volunteerId: string;
  volunteerName: string;
  credits: number;
  upiId: string;
  amount: number;
  status: 'pending' | 'paid';
}