# Modele danych

## Cel

Zdefiniuj interfejsy TypeScript dla wszystkich encji w projekcie. Plik docelowy: `src/data/models.ts`.

Przeczytaj `prod.md` aby zrozumieć kontekst biznesowy.

---

## Encje i relacje

### 1. `Action` (Akcja)

Reprezentuje jedną edycję roczną Akcji Listy.

```ts
interface Action {
  id: string;
  year: number;               // np. 2025
  name: string;               // np. "Akcja Listy 2025"
  isActive: boolean;          // czy ta akcja jest aktualnie aktywna
  startDate: string;          // ISO date — start akcji
  endDate: string;            // ISO date — koniec akcji
  turns: Turn[];              // tury w ramach akcji
}
```

### 2. `Turn` (Tura)

Każda akcja składa się z kilku tur. Mikołaj musi potwierdzić realizację listu do końca tury, inaczej list wraca do puli.

```ts
interface Turn {
  id: string;
  actionId: string;
  name: string;               // np. "Tura I"
  startDate: string;          // ISO date
  confirmByDate: string;      // ISO date — deadline potwierdzenia
}
```

### 3. `Facility` (Placówka / DPS)

```ts
interface Facility {
  id: string;
  code: string;               // stały kod placówki (ten sam w kolejnych akcjach)
  name: string;               // np. "DPS Słoneczny Dom"
  city: string;
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  contactPerson: string;      // osoba kontaktowa
  isExcluded: boolean;        // czy wykluczona z bieżącej akcji
  galleryPhotos: GalleryPhoto[];
}
```

### 4. `GalleryPhoto` (Zdjęcie w galerii)

```ts
interface GalleryPhoto {
  id: string;
  facilityId: string;
  year: number;               // rok akcji, do filtrowania
  url: string;                // URL/ścieżka do zdjęcia
  caption?: string;
}
```

### 5. `Letter` (List)

Centralny element systemu — list seniora do św. Mikołaja.

```ts
type LetterStatus = 'available' | 'selected' | 'confirmed' | 'returned';

interface Letter {
  id: string;
  code: string;               // unikalny kod listu (używany przy logowaniu Mikołaja)
  facilityId: string;         // powiązanie z placówką
  actionId: string;           // powiązanie z akcją
  turnId: string;             // powiązanie z turą
  imageUrls: string[];        // skan(y) listu — minimum 1
  status: LetterStatus;
  santaId: string | null;     // powiązanie z Mikołajem (null = dostępny)
  selectedAt: string | null;  // ISO datetime — kiedy wybrany
  confirmedAt: string | null; // ISO datetime — kiedy potwierdzony
  estimatedValue: number | null;  // szacunkowa kwota paczki (PLN)
  trackingLink: string | null;    // link do śledzenia paczki
  deliveryMethod: 'shipping' | 'personal' | null; // sposób dostarczenia
}
```

### 6. `Santa` (Mikołaj)

Użytkownik, który wybiera list(y) do realizacji.

```ts
interface Santa {
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
  createdAt: string;          // ISO datetime
}
```

### 7. `EmailTemplate` (Szablon maila)

```ts
type EmailTemplateType =
  | 'letter_selected'         // po wybraniu listu
  | 'confirmation_reminder'   // przypomnienie o potwierdzeniu
  | 'action_finale'           // informacja o finale akcji
  | 'thank_you';              // podziękowanie za udział

interface EmailTemplate {
  id: string;
  type: EmailTemplateType;
  name: string;               // wyświetlana nazwa, np. "Potwierdzenie wyboru listu"
  subject: string;            // temat maila (może zawierać parametry)
  body: string;               // treść HTML (może zawierać parametry)
  availableParams: string[];  // np. ['termin-potwierdzenia', 'data-konca-akcji', 'kod-listu', 'imie-mikolaja']
}
```

### 8. `AdminUser` (Użytkownik panelu admina)

```ts
type AdminRole = 'admin' | 'volunteer';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  facilityIds: string[];      // puste = dostęp do wszystkich; niepuste = tylko te placówki
}
```

---

## Diagram relacji

```
Action 1 ──── N Turn
Action 1 ──── N Letter
Facility 1 ──── N Letter
Facility 1 ──── N GalleryPhoto
Santa 1 ──── N Letter
Letter N ──── 1 Turn
AdminUser N ──── N Facility  (opcjonalne ograniczenie dostępu)
```

---

## Uwagi

- Wszystkie `id` to stringi (UUID-like, np. `"facility-1"`, `"letter-001"`).
- Daty w formacie ISO string (`"2025-11-01"`).
- W PoC nie ma prawdziwej bazy — te interfejsy będą używane przez mock DB (patrz `db.md`).
- Statusy listu:
  - `available` — dostępny do wyboru.
  - `selected` — wybrany przez Mikołaja, czeka na potwierdzenie.
  - `confirmed` — Mikołaj potwierdził realizację.
  - `returned` — list wrócił do puli (Mikołaj zrezygnował lub upłynął termin tury).
- Eksport do modelu: plik `src/data/models.ts` powinien eksportować wszystkie interfejsy i typy.
