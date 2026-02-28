// ============================================================
// Akcja Listy — modele danych
// ============================================================

export interface Action {
  id: string;
  year: number;
  name: string;
  isActive: boolean;
  startDate: string;   // ISO date
  endDate: string;     // ISO date
  turns: Turn[];
}

export interface Turn {
  id: string;
  actionId: string;
  name: string;
  startDate: string;       // ISO date
  confirmByDate: string;   // ISO date — deadline potwierdzenia
}

export interface Facility {
  id: string;
  code: string;
  name: string;
  city: string;
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  contactPerson: string;
  isExcluded: boolean;
  galleryPhotos: GalleryPhoto[];
}

export interface GalleryPhoto {
  id: string;
  facilityId: string;
  year: number;
  url: string;
  caption?: string;
}

export type LetterStatus = 'available' | 'selected' | 'confirmed' | 'returned';

export interface Letter {
  id: string;
  code: string;
  facilityId: string;
  actionId: string;
  turnId: string;
  imageUrls: string[];
  status: LetterStatus;
  santaId: string | null;
  selectedAt: string | null;
  confirmedAt: string | null;
  estimatedValue: number | null;
  trackingLink: string | null;
  deliveryMethod: 'shipping' | 'personal' | null;
}

export interface Santa {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isCompany: boolean;
  companyName?: string;
  nip?: string;
  companyAddress?: string;
  marketingConsent: boolean;
  createdAt: string;   // ISO datetime
}

export type EmailTemplateType =
  | 'letter_selected'
  | 'confirmation_reminder'
  | 'action_finale'
  | 'thank_you';

export interface EmailTemplate {
  id: string;
  type: EmailTemplateType;
  name: string;
  subject: string;
  body: string;
  availableParams: string[];
}

export type AdminRole = 'admin' | 'volunteer';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  facilityIds: string[];
}
