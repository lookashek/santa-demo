# Zadanie: Mockowana baza danych

## Cel

Stwórz plik `src/data/mock-db.ts`, który zawiera mockowane dane dla całej aplikacji. Dane muszą być spójne między sobą (poprawne relacje, referencje po `id`). Nie potrzebujemy backendu — wszystko działa w pamięci przeglądarki.

## Zależności

- **Przeczytaj najpierw `models.md`** — tam są zdefiniowane wszystkie interfejsy TypeScript. Użyj ich jako typów dla danych.
- Przeczytaj `prod.md` aby rozumieć kontekst.

## Co wygenerować

### Plik: `src/data/models.ts`

Wyeksportuj wszystkie interfejsy i typy opisane w `models.md`.

### Plik: `src/data/mock-db.ts`

Importuj typy z `models.ts` i wyeksportuj mockowane dane:

```ts
import { Action, Turn, Facility, GalleryPhoto, Letter, Santa, EmailTemplate, AdminUser } from './models';

export const actions: Action[] = [...];
export const facilities: Facility[] = [...];
export const letters: Letter[] = [...];
export const santas: Santa[] = [...];
export const emailTemplates: EmailTemplate[] = [...];
export const adminUsers: AdminUser[] = [...];
```

### Ilość danych

| Encja | Ilość | Uwagi |
|---|---|---|
| Action | 2 | 1 aktywna (2025), 1 archiwalna (2024) |
| Turn | 3 | Dla aktywnej akcji: Tura I, II, III z różnymi datami |
| Facility | 4 | Różne miasta, 1 wykluczona |
| GalleryPhoto | 8 | Po 2 na placówkę, różne lata |
| Letter | 20 | Mieszane statusy: ~10 available, ~5 selected, ~3 confirmed, ~2 returned. Różne placówki i tury. |
| Santa | 5 | 2 firmy, 3 osoby prywatne. Przynajmniej 1 z historycznymi listami z 2024. |
| EmailTemplate | 4 | Po jednym na typ: letter_selected, confirmation_reminder, action_finale, thank_you |
| AdminUser | 3 | 1 admin, 2 wolontariuszy (1 powiązany z placówką) |

### Wymagania dotyczące danych

1. **Spójność relacji** — `letter.facilityId` musi wskazywać na istniejącą `facility.id`, `letter.santaId` na istniejącego `santa.id` (lub null), itd.
2. **Realistyczne dane** — polskie imiona, nazwy, adresy. Przykłady:
   - Placówki: "DPS Słoneczny Dom" w Warszawie, "DPS Pod Kasztanami" w Krakowie itd.
   - Mikołaje: Anna Kowalska, Jan Nowak, Firma "Dobro Sp. z o.o." itd.
3. **Obrazki listów** — użyj placeholder URL-i, np. `https://placehold.co/400x600?text=List+001`. W PoC nie mamy prawdziwych skanów.
4. **Zdjęcia galerii** — analogicznie, placeholder URL-i, np. `https://placehold.co/800x600?text=Galeria+DPS+1`.
5. **Szablony maili** — realistyczne treści w HTML z parametrami w klamrach, np.:
   ```
   Drogi Mikołaju {imie-mikolaja},
   Dziękujemy za wybranie listu o kodzie {kod-listu}.
   Pamiętaj, że masz czas do {termin-potwierdzenia} na potwierdzenie realizacji.
   ```
6. **Tury** — realistyczne daty, np. Tura I: 1-10.11.2025, Tura II: 11-20.11.2025, Tura III: 21-30.11.2025.

### Plik: `src/data/db-helpers.ts`

Stwórz prosty „store" z helperami do operacji CRUD (wszystko w pamięci):

```ts
// Przykładowe helpery:

// Pobieranie
export function getAvailableLetters(facilityId?: string): Letter[];
export function getLettersByStatus(status: LetterStatus): Letter[];
export function getLettersBySanta(santaId: string): Letter[];
export function getFacilities(): Facility[];
export function getSantaByEmail(email: string): Santa | undefined;
export function getActiveAction(): Action | undefined;

// Mutacje (modyfikują dane w pamięci)
export function selectLetter(letterId: string, santa: Santa): Letter;
export function confirmLetter(letterId: string, estimatedValue: number): Letter;
export function returnLetter(letterId: string): Letter;
export function updateLetterTracking(letterId: string, trackingLink: string | null, deliveryMethod: 'shipping' | 'personal'): Letter;

// Admin
export function updateFacility(id: string, data: Partial<Facility>): Facility;
export function updateEmailTemplate(id: string, data: Partial<EmailTemplate>): EmailTemplate;
export function detachSantaFromLetter(letterId: string): Letter;
```

**Ważne:** Mutacje powinny modyfikować dane w wyeksportowanych tablicach (w pamięci). Po odświeżeniu strony dane wracają do stanu początkowego — to jest ok dla PoC.

## Rezultat

Trzy pliki:
- `src/data/models.ts` — eksportowane interfejsy
- `src/data/mock-db.ts` — mockowane dane
- `src/data/db-helpers.ts` — helpery do pobierania i mutowania danych
