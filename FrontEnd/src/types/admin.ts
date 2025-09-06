// Type definitions for the admin dashboard components

// Contact types
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  eventDate: string;
  service: string;
  status: 'read' | 'unread';
  createdAt: string;
}

// FAQ types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// Gallery types
export interface GalleryImage {
  id: string;
  src: string;
  category: string;
  title: string;
}

// Package types
export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  features: string[];
  recommended?: boolean;
  type: 'standard' | 'premium' | 'basic' | 'custom';
}

// Review types
export interface Review {
  id: string;
  name: string;
  image: string;
  quote: string;
  eventDate: string;
  status: 'approved' | 'pending' | 'rejected';
  rating: number;
}

// Edit form types
export interface ReviewEditForm {
  name: string;
  eventDate: string;
  rating: number;
  quote: string;
  status: string;
}

export interface FAQForm {
  question: string;
  answer: string;
}