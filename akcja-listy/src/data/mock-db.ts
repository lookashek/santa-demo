import type {
  Action,
  Turn,
  Facility,
  GalleryPhoto,
  Letter,
  Santa,
  EmailTemplate,
  AdminUser,
} from './models';

// ============================================================
// TURY (dla akcji 2025)
// ============================================================

const turns2025: Turn[] = [
  {
    id: 'turn-2025-1',
    actionId: 'action-2025',
    name: 'Tura I',
    startDate: '2025-11-01',
    confirmByDate: '2025-11-10',
  },
  {
    id: 'turn-2025-2',
    actionId: 'action-2025',
    name: 'Tura II',
    startDate: '2025-11-11',
    confirmByDate: '2025-11-20',
  },
  {
    id: 'turn-2025-3',
    actionId: 'action-2025',
    name: 'Tura III',
    startDate: '2025-11-21',
    confirmByDate: '2025-11-30',
  },
];

const turns2024: Turn[] = [
  {
    id: 'turn-2024-1',
    actionId: 'action-2024',
    name: 'Tura I',
    startDate: '2024-11-01',
    confirmByDate: '2024-11-10',
  },
  {
    id: 'turn-2024-2',
    actionId: 'action-2024',
    name: 'Tura II',
    startDate: '2024-11-11',
    confirmByDate: '2024-11-20',
  },
];

// ============================================================
// AKCJE
// ============================================================

export const actions: Action[] = [
  {
    id: 'action-2025',
    year: 2025,
    name: 'Akcja Listy 2025',
    isActive: true,
    startDate: '2025-11-01',
    endDate: '2025-12-10',
    turns: turns2025,
  },
  {
    id: 'action-2024',
    year: 2024,
    name: 'Akcja Listy 2024',
    isActive: false,
    startDate: '2024-11-01',
    endDate: '2024-12-10',
    turns: turns2024,
  },
];

// ============================================================
// ZDJĘCIA GALERII
// ============================================================

const galleryPhotos: GalleryPhoto[] = [
  // facility-1
  {
    id: 'photo-1',
    facilityId: 'facility-1',
    year: 2025,
    url: '/gallery/photo-1.svg',
    caption: 'Wręczanie paczek, grudzień 2025',
  },
  {
    id: 'photo-2',
    facilityId: 'facility-1',
    year: 2024,
    url: '/gallery/photo-2.svg',
    caption: 'Wspólne kolędowanie, grudzień 2024',
  },
  // facility-2
  {
    id: 'photo-3',
    facilityId: 'facility-2',
    year: 2025,
    url: '/gallery/photo-3.svg',
    caption: 'Spotkanie z Mikołajem, grudzień 2025',
  },
  {
    id: 'photo-4',
    facilityId: 'facility-2',
    year: 2024,
    url: '/gallery/photo-4.svg',
    caption: 'Wigilia w placówce, grudzień 2024',
  },
  // facility-3
  {
    id: 'photo-5',
    facilityId: 'facility-3',
    year: 2025,
    url: '/gallery/photo-5.svg',
    caption: 'Paczki pod choinką, grudzień 2025',
  },
  {
    id: 'photo-6',
    facilityId: 'facility-3',
    year: 2024,
    url: '/gallery/photo-6.svg',
    caption: 'Radość seniorów, grudzień 2024',
  },
  // facility-4
  {
    id: 'photo-7',
    facilityId: 'facility-4',
    year: 2025,
    url: '/gallery/photo-7.svg',
    caption: 'Otwarcie paczek, grudzień 2025',
  },
  {
    id: 'photo-8',
    facilityId: 'facility-4',
    year: 2024,
    url: '/gallery/photo-8.svg',
    caption: 'Wspomnienia z akcji 2024',
  },
];

// ============================================================
// PLACÓWKI
// ============================================================

export const facilities: Facility[] = [
  {
    id: 'facility-1',
    code: 'DPS-WAW-01',
    name: 'DPS Słoneczny Dom',
    city: 'Warszawa',
    address: 'ul. Słoneczna 15',
    postalCode: '00-123',
    phone: '+48 22 111 22 33',
    email: 'kontakt@slonecznydom.pl',
    contactPerson: 'Maria Wiśniewska',
    isExcluded: false,
    galleryPhotos: galleryPhotos.filter((p) => p.facilityId === 'facility-1'),
  },
  {
    id: 'facility-2',
    code: 'DPS-KRK-01',
    name: 'DPS Pod Kasztanami',
    city: 'Kraków',
    address: 'ul. Kasztanowa 8',
    postalCode: '30-456',
    phone: '+48 12 222 33 44',
    email: 'kontakt@podkasztanami.pl',
    contactPerson: 'Tomasz Wróblewski',
    isExcluded: false,
    galleryPhotos: galleryPhotos.filter((p) => p.facilityId === 'facility-2'),
  },
  {
    id: 'facility-3',
    code: 'DPS-GDA-01',
    name: 'DPS Zielona Przystań',
    city: 'Gdańsk',
    address: 'ul. Morska 22',
    postalCode: '80-789',
    phone: '+48 58 333 44 55',
    email: 'kontakt@zielonaprzystan.pl',
    contactPerson: 'Katarzyna Lewandowska',
    isExcluded: false,
    galleryPhotos: galleryPhotos.filter((p) => p.facilityId === 'facility-3'),
  },
  {
    id: 'facility-4',
    code: 'DPS-POZ-01',
    name: 'DPS Złota Jesień',
    city: 'Poznań',
    address: 'ul. Jesionowa 5',
    postalCode: '60-321',
    phone: '+48 61 444 55 66',
    email: 'kontakt@zlotajesien.pl',
    contactPerson: 'Piotr Zając',
    isExcluded: true,
    galleryPhotos: galleryPhotos.filter((p) => p.facilityId === 'facility-4'),
  },
];

// ============================================================
// MIKOŁAJE
// ============================================================

export const santas: Santa[] = [
  {
    id: 'santa-1',
    email: 'anna.kowalska@gmail.com',
    firstName: 'Anna',
    lastName: 'Kowalska',
    phone: '+48 600 111 222',
    isCompany: false,
    marketingConsent: true,
    createdAt: '2025-11-02T10:15:00Z',
  },
  {
    id: 'santa-2',
    email: 'jan.nowak@gmail.com',
    firstName: 'Jan',
    lastName: 'Nowak',
    phone: '+48 601 333 444',
    isCompany: false,
    marketingConsent: false,
    createdAt: '2025-11-03T09:00:00Z',
  },
  {
    id: 'santa-3',
    email: 'kontakt@dobro.pl',
    firstName: 'Agnieszka',
    lastName: 'Dąbrowska',
    phone: '+48 602 555 666',
    isCompany: true,
    companyName: 'Dobro Sp. z o.o.',
    nip: '1234567890',
    companyAddress: 'ul. Biznesowa 1, 00-001 Warszawa',
    marketingConsent: true,
    createdAt: '2025-11-04T11:30:00Z',
  },
  {
    id: 'santa-4',
    email: 'biuro@pomocni.com',
    firstName: 'Marek',
    lastName: 'Wiśniewski',
    phone: '+48 603 777 888',
    isCompany: true,
    companyName: 'Pomocni S.A.',
    nip: '9876543210',
    companyAddress: 'ul. Korporacyjna 10, 30-002 Kraków',
    marketingConsent: true,
    createdAt: '2025-11-05T14:00:00Z',
  },
  {
    id: 'santa-5',
    email: 'zofia.wrobel@wp.pl',
    firstName: 'Zofia',
    lastName: 'Wróbel',
    isCompany: false,
    marketingConsent: false,
    // Ten Mikołaj brał udział w akcji 2024
    createdAt: '2024-11-01T08:00:00Z',
  },
];

// ============================================================
// LISTY (20 sztuk)
// ============================================================

export const letters: Letter[] = [
  // ---------- available (10) ----------
  {
    id: 'letter-001',
    code: 'WAW001',
    facilityId: 'facility-1',
    actionId: 'action-2025',
    turnId: 'turn-2025-1',
    imageUrls: ['/letters/letter-001.svg'],
    status: 'available',
    santaId: null,
    selectedAt: null,
    confirmedAt: null,
    estimatedValue: null,
    trackingLink: null,
    deliveryMethod: null,
  },
  {
    id: 'letter-002',
    code: 'WAW002',
    facilityId: 'facility-1',
    actionId: 'action-2025',
    turnId: 'turn-2025-1',
    imageUrls: ['/letters/letter-002.svg'],
    status: 'available',
    santaId: null,
    selectedAt: null,
    confirmedAt: null,
    estimatedValue: null,
    trackingLink: null,
    deliveryMethod: null,
  },
  {
    id: 'letter-003',
    code: 'WAW003',
    facilityId: 'facility-1',
    actionId: 'action-2025',
    turnId: 'turn-2025-2',
    imageUrls: ['/letters/letter-003.svg'],
    status: 'available',
    santaId: null,
    selectedAt: null,
    confirmedAt: null,
    estimatedValue: null,
    trackingLink: null,
    deliveryMethod: null,
  },
  {
    id: 'letter-004',
    code: 'KRK001',
    facilityId: 'facility-2',
    actionId: 'action-2025',
    turnId: 'turn-2025-1',
    imageUrls: ['/letters/letter-004.svg'],
    status: 'available',
    santaId: null,
    selectedAt: null,
    confirmedAt: null,
    estimatedValue: null,
    trackingLink: null,
    deliveryMethod: null,
  },
  {
    id: 'letter-005',
    code: 'KRK002',
    facilityId: 'facility-2',
    actionId: 'action-2025',
    turnId: 'turn-2025-2',
    imageUrls: ['/letters/letter-005.svg'],
    status: 'available',
    santaId: null,
    selectedAt: null,
    confirmedAt: null,
    estimatedValue: null,
    trackingLink: null,
    deliveryMethod: null,
  },
  {
    id: 'letter-006',
    code: 'GDA001',
    facilityId: 'facility-3',
    actionId: 'action-2025',
    turnId: 'turn-2025-1',
    imageUrls: ['/letters/letter-006.svg'],
    status: 'available',
    santaId: null,
    selectedAt: null,
    confirmedAt: null,
    estimatedValue: null,
    trackingLink: null,
    deliveryMethod: null,
  },
  {
    id: 'letter-007',
    code: 'GDA002',
    facilityId: 'facility-3',
    actionId: 'action-2025',
    turnId: 'turn-2025-2',
    imageUrls: ['/letters/letter-007.svg'],
    status: 'available',
    santaId: null,
    selectedAt: null,
    confirmedAt: null,
    estimatedValue: null,
    trackingLink: null,
    deliveryMethod: null,
  },
  {
    id: 'letter-008',
    code: 'GDA003',
    facilityId: 'facility-3',
    actionId: 'action-2025',
    turnId: 'turn-2025-3',
    imageUrls: ['/letters/letter-008a.svg', '/letters/letter-008b.svg'],
    status: 'available',
    santaId: null,
    selectedAt: null,
    confirmedAt: null,
    estimatedValue: null,
    trackingLink: null,
    deliveryMethod: null,
  },
  {
    id: 'letter-009',
    code: 'KRK003',
    facilityId: 'facility-2',
    actionId: 'action-2025',
    turnId: 'turn-2025-3',
    imageUrls: ['/letters/letter-009.svg'],
    status: 'available',
    santaId: null,
    selectedAt: null,
    confirmedAt: null,
    estimatedValue: null,
    trackingLink: null,
    deliveryMethod: null,
  },
  {
    id: 'letter-010',
    code: 'WAW004',
    facilityId: 'facility-1',
    actionId: 'action-2025',
    turnId: 'turn-2025-3',
    imageUrls: ['/letters/letter-010.svg'],
    status: 'available',
    santaId: null,
    selectedAt: null,
    confirmedAt: null,
    estimatedValue: null,
    trackingLink: null,
    deliveryMethod: null,
  },
  // ---------- selected (5) ----------
  {
    id: 'letter-011',
    code: 'WAW005',
    facilityId: 'facility-1',
    actionId: 'action-2025',
    turnId: 'turn-2025-1',
    imageUrls: ['/letters/letter-001.svg'],
    status: 'selected',
    santaId: 'santa-1',
    selectedAt: '2025-11-02T12:00:00Z',
    confirmedAt: null,
    estimatedValue: null,
    trackingLink: null,
    deliveryMethod: null,
  },
  {
    id: 'letter-012',
    code: 'KRK004',
    facilityId: 'facility-2',
    actionId: 'action-2025',
    turnId: 'turn-2025-1',
    imageUrls: ['/letters/letter-002.svg'],
    status: 'selected',
    santaId: 'santa-2',
    selectedAt: '2025-11-03T09:30:00Z',
    confirmedAt: null,
    estimatedValue: null,
    trackingLink: null,
    deliveryMethod: null,
  },
  {
    id: 'letter-013',
    code: 'GDA004',
    facilityId: 'facility-3',
    actionId: 'action-2025',
    turnId: 'turn-2025-2',
    imageUrls: ['/letters/letter-003.svg'],
    status: 'selected',
    santaId: 'santa-3',
    selectedAt: '2025-11-04T14:00:00Z',
    confirmedAt: null,
    estimatedValue: null,
    trackingLink: null,
    deliveryMethod: null,
  },
  {
    id: 'letter-014',
    code: 'WAW006',
    facilityId: 'facility-1',
    actionId: 'action-2025',
    turnId: 'turn-2025-2',
    imageUrls: ['/letters/letter-004.svg'],
    status: 'selected',
    santaId: 'santa-4',
    selectedAt: '2025-11-05T10:00:00Z',
    confirmedAt: null,
    estimatedValue: null,
    trackingLink: null,
    deliveryMethod: null,
  },
  {
    id: 'letter-015',
    code: 'KRK005',
    facilityId: 'facility-2',
    actionId: 'action-2025',
    turnId: 'turn-2025-3',
    imageUrls: ['/letters/letter-005.svg'],
    status: 'selected',
    santaId: 'santa-1',
    selectedAt: '2025-11-06T11:00:00Z',
    confirmedAt: null,
    estimatedValue: null,
    trackingLink: null,
    deliveryMethod: null,
  },
  // ---------- confirmed (3) ----------
  {
    id: 'letter-016',
    code: 'GDA005',
    facilityId: 'facility-3',
    actionId: 'action-2025',
    turnId: 'turn-2025-1',
    imageUrls: ['/letters/letter-006.svg'],
    status: 'confirmed',
    santaId: 'santa-2',
    selectedAt: '2025-11-01T08:00:00Z',
    confirmedAt: '2025-11-08T16:00:00Z',
    estimatedValue: 150,
    trackingLink: 'https://tracking.inpost.pl/track/ABC123',
    deliveryMethod: 'shipping',
  },
  {
    id: 'letter-017',
    code: 'WAW007',
    facilityId: 'facility-1',
    actionId: 'action-2025',
    turnId: 'turn-2025-1',
    imageUrls: ['/letters/letter-007.svg'],
    status: 'confirmed',
    santaId: 'santa-3',
    selectedAt: '2025-11-01T09:00:00Z',
    confirmedAt: '2025-11-09T10:00:00Z',
    estimatedValue: 200,
    trackingLink: null,
    deliveryMethod: 'personal',
  },
  {
    id: 'letter-018',
    code: 'KRK006',
    facilityId: 'facility-2',
    actionId: 'action-2025',
    turnId: 'turn-2025-2',
    imageUrls: ['/letters/letter-008a.svg'],
    status: 'confirmed',
    santaId: 'santa-4',
    selectedAt: '2025-11-11T07:00:00Z',
    confirmedAt: '2025-11-19T12:00:00Z',
    estimatedValue: 300,
    trackingLink: 'https://tracking.dpd.pl/track/XYZ789',
    deliveryMethod: 'shipping',
  },
  // ---------- returned (2) ----------
  {
    id: 'letter-019',
    code: 'GDA006',
    facilityId: 'facility-3',
    actionId: 'action-2025',
    turnId: 'turn-2025-1',
    imageUrls: ['/letters/letter-009.svg'],
    status: 'returned',
    santaId: null,
    selectedAt: '2025-11-01T10:00:00Z',
    confirmedAt: null,
    estimatedValue: null,
    trackingLink: null,
    deliveryMethod: null,
  },
  // list archiwalny z akcji 2024 — powiązany z santa-5
  {
    id: 'letter-020',
    code: 'WAW2024-01',
    facilityId: 'facility-1',
    actionId: 'action-2024',
    turnId: 'turn-2024-1',
    imageUrls: ['/letters/letter-010.svg'],
    status: 'confirmed',
    santaId: 'santa-5',
    selectedAt: '2024-11-01T08:30:00Z',
    confirmedAt: '2024-11-09T15:00:00Z',
    estimatedValue: 120,
    trackingLink: null,
    deliveryMethod: 'personal',
  },
];

// ============================================================
// SZABLONY MAILI
// ============================================================

export const emailTemplates: EmailTemplate[] = [
  {
    id: 'tpl-letter-selected',
    type: 'letter_selected',
    name: 'Potwierdzenie wyboru listu',
    subject: 'Dziękujemy za wybranie listu! Kod: {kod-listu}',
    body: `<p>Drogi Mikołaju {imie-mikolaja},</p>
<p>Dziękujemy za dołączenie do <strong>Akcji Listy {rok-akcji}</strong>!</p>
<p>Wybrałeś/aś list o kodzie: <strong>{kod-listu}</strong>.</p>
<p>Pamiętaj, że masz czas do <strong>{termin-potwierdzenia}</strong> na potwierdzenie realizacji w swoim panelu.</p>
<p>Zaloguj się swoim adresem e-mail i kodem listu: <a href="{link-panelu}">Panel Mikołaja</a></p>
<p>Wesołych Świąt!<br/>Fundacja Święty Mikołaj dla Seniora</p>`,
    availableParams: [
      'imie-mikolaja',
      'kod-listu',
      'rok-akcji',
      'termin-potwierdzenia',
      'link-panelu',
    ],
  },
  {
    id: 'tpl-confirmation-reminder',
    type: 'confirmation_reminder',
    name: 'Przypomnienie o potwierdzeniu',
    subject: 'Przypomnienie — potwierdź realizację listu {kod-listu}',
    body: `<p>Drogi Mikołaju {imie-mikolaja},</p>
<p>Przypominamy, że do <strong>{termin-potwierdzenia}</strong> musisz potwierdzić realizację listu <strong>{kod-listu}</strong>.</p>
<p>Jeśli nie potwierdzisz w terminie, list wróci do puli i będzie dostępny dla innych.</p>
<p>Zaloguj się i potwierdź: <a href="{link-panelu}">Panel Mikołaja</a></p>
<p>Fundacja Święty Mikołaj dla Seniora</p>`,
    availableParams: [
      'imie-mikolaja',
      'kod-listu',
      'termin-potwierdzenia',
      'link-panelu',
    ],
  },
  {
    id: 'tpl-action-finale',
    type: 'action_finale',
    name: 'Finał akcji',
    subject: 'Akcja Listy {rok-akcji} dobiegła końca — dziękujemy!',
    body: `<p>Drogi Mikołaju {imie-mikolaja},</p>
<p>Akcja Listy {rok-akcji} oficjalnie dobiegła końca.</p>
<p>W tym roku zrealizowaliśmy <strong>{liczba-listow}</strong> listów. Dziękujemy, że byłeś/aś częścią tej wyjątkowej akcji!</p>
<p>Zdjęcia i relacje z akcji znajdziesz na naszej stronie: <a href="{link-galerii}">Galeria</a></p>
<p>Do zobaczenia w kolejnym roku!<br/>Fundacja Święty Mikołaj dla Seniora</p>`,
    availableParams: [
      'imie-mikolaja',
      'rok-akcji',
      'liczba-listow',
      'link-galerii',
    ],
  },
  {
    id: 'tpl-thank-you',
    type: 'thank_you',
    name: 'Podziękowanie za udział',
    subject: 'Dziękujemy za Twoje serce, {imie-mikolaja}!',
    body: `<p>Drogi Mikołaju {imie-mikolaja},</p>
<p>Serdecznie dziękujemy za realizację listu <strong>{kod-listu}</strong> w ramach Akcji Listy {rok-akcji}.</p>
<p>Dzięki Tobie senior z <strong>{nazwa-placowki}</strong> poczuł, że ktoś o nim myśli w te wyjątkowe dni.</p>
<p>Mamy nadzieję zobaczyć Cię znowu w przyszłym roku!</p>
<p>Z wyrazami wdzięczności,<br/>Fundacja Święty Mikołaj dla Seniora</p>`,
    availableParams: [
      'imie-mikolaja',
      'kod-listu',
      'rok-akcji',
      'nazwa-placowki',
    ],
  },
];

// ============================================================
// UŻYTKOWNICY ADMINA
// ============================================================

export const adminUsers: AdminUser[] = [
  {
    id: 'admin-1',
    name: 'Marta Kowalczyk',
    email: 'marta@fundacja.pl',
    role: 'admin',
    facilityIds: [],
  },
  {
    id: 'admin-2',
    name: 'Bartosz Mazur',
    email: 'bartosz@fundacja.pl',
    role: 'volunteer',
    facilityIds: ['facility-1', 'facility-2'],
  },
  {
    id: 'admin-3',
    name: 'Ewa Szymańska',
    email: 'ewa@fundacja.pl',
    role: 'volunteer',
    facilityIds: ['facility-3'],
  },
];
