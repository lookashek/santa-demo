# Zadanie: Panel Mikołaja (frontend)

## Cel

Zaimplementuj Panel Mikołaja — widok zalogowanego użytkownika, który wybrał list(y) do realizacji.

## Kontekst

- Przeczytaj `prod.md` — ogólny opis projektu.
- Przeczytaj `models.md` — interfejsy danych.
- Dane pobieraj z helperów w `src/data/db-helpers.ts`.
- Projekt jest już zainicjalizowany, routing skonfigurowany.
- Strona publiczna jest zaimplementowana oddzielnie.

## Strony do zaimplementowania

### 1. Logowanie Mikołaja (`/mikolaj`) — `SantaLogin.tsx`

Prosty formularz logowania:

- **Email** — input tekstowy.
- **Kod listu** — input tekstowy (kod z bieżącej akcji).
- Przycisk **„Zaloguj się"**.

**Logika (symulowana):**
1. Znajdź Mikołaja po emailu (`getSantaByEmail`).
2. Sprawdź czy istnieje list z podanym kodem, przypisany do tego Mikołaja, z bieżącej akcji.
3. Jeśli ok → przekieruj do `/mikolaj/panel` (zapisz santaId w React state / Context — nie potrzeba localStorage).
4. Jeśli nie → pokaż komunikat błędu "Nieprawidłowy email lub kod listu".

**Uwaga PoC:** Aby ułatwić testowanie, pod formularzem logowania dodaj sekcję **"Szybki dostęp (demo)"** z klikalnymi przyciskami/linkami, np.:
- "Zaloguj jako Anna Kowalska" → automatycznie loguje jako pierwszy Mikołaj z mock-db.
- "Zaloguj jako Firma Dobro Sp. z o.o." → automatycznie loguje jako Mikołaj-firma.

### 2. Dashboard Mikołaja (`/mikolaj/panel`) — `SantaDashboard.tsx`

Po zalogowaniu Mikołaj widzi:

#### a) Sekcja: Moje dane

Prosta karta z danymi Mikołaja:
- Imię, nazwisko (lub nazwa firmy + NIP jeśli firma).
- Email.
- Przycisk "Wyloguj" → wraca do `/mikolaj`.

#### b) Sekcja: Moje bieżące listy

Lista kart — po jednej na każdy list z **aktywnej akcji** przypisany do tego Mikołaja.

Każda karta zawiera:
- **Kod listu** (pogrubiony).
- **Placówka** — nazwa + miasto.
- **Status** — badge kolorowy:
  - `selected` → żółty, "Oczekuje na realizację"
  - `confirmed` → zielony, "Zrealizowany"
  - `returned` → szary, "Zwrócony"
- **Miniaturka listu** — mały obrazek (placeholder).
- **Termin potwierdzenia** — data z tury.

**Akcje na karcie** (w zależności od statusu):

Jeśli status = `selected`:
- **Potwierdź realizację** → otwiera mały formularz:
  - Input: szacunkowa kwota paczki (PLN), pole numeryczne, bez walidacji.
  - Przycisk "Potwierdź" → wywołuje `confirmLetter()`.
- **Zrezygnuj z listu** → confirm dialog → wywołuje `returnLetter()`.
- **Dodaj śledzenie** → mały formularz:
  - Radio: "Wyślę kurierem/pocztą" / "Dostarczę osobiście".
  - Jeśli kurierem → input na link do śledzenia.
  - Przycisk "Zapisz" → wywołuje `updateLetterTracking()`.

Jeśli status = `confirmed`:
- Tylko podgląd — kwota paczki, sposób dostarczenia, link do śledzenia.

Jeśli status = `returned`:
- Tylko informacja — "Ten list wrócił do puli."

#### c) Sekcja: Archiwum

Lista listów z **poprzednich akcji** (identyfikacja po emailu Mikołaja).

Prostsze karty — tylko:
- Kod listu, nazwa placówki, rok akcji, status.
- Bez akcji (tylko podgląd).

Jeśli brak archiwalnych listów → tekst "Brak archiwalnych listów."

## Zarządzanie stanem logowania

Użyj React Context lub prostego `useState` w komponencie nadrzędnym:

```tsx
// Prosty kontekst
interface SantaContextType {
  currentSanta: Santa | null;
  login: (santaId: string) => void;
  logout: () => void;
}
```

- Po zalogowaniu: ustaw `currentSanta`.
- Po wylogowaniu: wyczyść i przekieruj na `/mikolaj`.
- Jeśli ktoś wejdzie na `/mikolaj/panel` bez zalogowania → przekieruj na `/mikolaj`.

## Wytyczne wizualne

- Ta sama kolorystyka co strona publiczna (patrz `frontend-public.md`).
- Layout: użyj tego samego `Layout.tsx` co strona publiczna, ale w nawigacji podświetl "Moje listy".
- Dashboard — czytelne karty, wyraźne statusy (badge kolorowy), jasne CTA.
- Formularze inline — nie otwieraj nowych stron, użyj rozwijanych sekcji lub małych modali.

## Ważne

- **Prostota.** To jest PoC. Nie komplikuj — jeśli coś jest niejasne, zrób najprostszą wersję.
- **Interakcja.** Klient ma móc: zalogować się (demo), zobaczyć listy, kliknąć "potwierdź", zobaczyć zmianę statusu.
- **Dane w pamięci.** Po odświeżeniu strony dane wracają do stanu początkowego — to OK.
- Nie implementuj prawdziwej autentykacji — wystarczy prosty Context z santaId.
