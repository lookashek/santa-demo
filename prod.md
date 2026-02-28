# Akcja Listy — Opis Projektu (Proof of Concept)

## Kontekst biznesowy

Fundacja **Święty Mikołaj dla Seniora** co roku organizuje akcję, w której każdy może zrealizować list do św. Mikołaja napisany przez seniora z Domu Pomocy Społecznej (DPS).

### Przebieg akcji

1. Placówki (DPS-y) rejestrują się jesienią do programu.
2. Zbierają listy od podopiecznych i przekazują je cyfrowo do Fundacji.
3. Fundacja wgrywa listy na platformę i łączy je z placówkami.
4. W dniu startu akcji (koniec października / początek listopada) listy są publikowane.
5. Użytkownicy (Mikołaje) wybierają listy do realizacji.
6. Mikołaj ma ~1 miesiąc na przygotowanie i wysłanie paczki.
7. Mikołaj raportuje status realizacji w swoim panelu.
8. System wysyła automatyczne maile (po wybraniu listu, przypomnienie, finał, podziękowanie).

### Akcja składa się z **tur**

Każda akcja ma kilka tur z datami. Jeśli Mikołaj nie potwierdzi realizacji listu do końca tury, list wraca do puli.

## Trzy główne części systemu

### 1. Strona ogólnodostępna (`/`)

- Statyczne treści (FAQ, sponsorzy) — edytowalne przez admina.
- **Listy** — miniaturki listów z możliwością powiększenia i wyboru. Filtrowanie po placówce.
- **Licznik listów** — ile listów zostało do wyboru.
- **Galeria** — zdjęcia z akcji, filtrowane po placówce i roku.
- **Moje listy** — przejście do Panelu Mikołaja.

**Flow wyboru listu:**

1. Mikołaj klika „Wybierz list".
2. Podaje adres email.
3. Wpisuje dane (imię, nazwisko). Opcjonalnie „Wybór jako firma" → NIP + dane firmy.
4. Zgoda marketingowa (opcjonalna).
5. Akceptacja regulaminu + potwierdzenie.
6. List przypisany — Mikołaj może się zalogować emailem + kodem listu.

### 2. Panel Mikołaja (`/mikolaj`)

- Widok swoich danych.
- Bieżące listy z aktualnej akcji.
- Archiwalne listy z poprzednich akcji (identyfikacja po emailu).
- Akcje: potwierdzenie realizacji (+ szacunkowa kwota), rezygnacja z listu, link do śledzenia paczki lub „dostarczę osobiście".

### 3. Panel Administratora (`/admin`)

- **Placówki** — CRUD, galeria zdjęć, wykluczenie z akcji.
- **Listy** — status, powiązanie z placówką i Mikołajem, potwierdzenie/wycofanie, odpięcie Mikołaja.
- **Mikołaje** — dane kontaktowe, zgody, wybrane listy.
- **Eksport do Excela** (z uwzględnieniem filtrów).
- **Konfiguracja akcji** — aktywna akcja, daty, tury.
- **Maile** — edycja treści szablonów (z parametrami), wysyłka „na żądanie".
- **Użytkownicy admina** — role, powiązanie z placówkami (wolontariusze widzą tylko swoje).

## Stack technologiczny (PoC)

| Warstwa | Technologia |
|---|---|
| Frontend | **React 18** + **TypeScript** |
| Styling | **Tailwind CSS 3** |
| Routing | **React Router v6** |
| Build tool | **Vite** |
| Baza danych | **Mock** — pliki TypeScript z danymi w pamięci |
| Hosting (później) | Darmowy host (Vercel / Netlify / podobny) |

## Zasady PoC

- **Maksymalna prostota** — celem jest pokazanie klientowi wyglądu i interakcji, nie produkcyjny system.
- **Brak backendu** — wszystko działa w przeglądarce, dane mockowane w plikach TS.
- **Brak autentykacji** — logowanie symulowane (email + kod listu dla Mikołaja, dowolne wejście dla admina).
- **Brak wysyłki maili** — widok szablonów i symulacja wysyłki (toast/alert).
- **Responsywność** — podstawowa (mobile-first nie jest priorytetem, ale strona ma wyglądać ok).
- **Język interfejsu** — polski.
