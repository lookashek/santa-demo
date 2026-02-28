# Zadanie: Strona ogólnodostępna (frontend)

## Cel

Zaimplementuj stronę publiczną aplikacji "Akcja Listy" — widoczną dla wszystkich odwiedzających. To jest „twarz" akcji i pierwsza rzecz, którą widzi użytkownik.

## Kontekst

- Przeczytaj `prod.md` — ogólny opis projektu.
- Przeczytaj `models.md` — interfejsy danych.
- Dane pobieraj z helperów w `src/data/db-helpers.ts` (patrz `db.md`).
- Projekt jest już zainicjalizowany (patrz `init.md`), routing skonfigurowany.

## Strony do zaimplementowania

### 1. Strona główna (`/`) — `HomePage.tsx`

Prosta, ciepła landing page z sekcjami:

- **Hero** — duży nagłówek "Akcja Listy 2025", krótki opis akcji (2-3 zdania), przycisk CTA "Zobacz listy".
- **Jak to działa?** — 3-4 kroki w prostych kartkach (ikony opcjonalne, mogą być emoji):
  1. Wybierz list seniora
  2. Przygotuj paczkę
  3. Wyślij lub dostarcz osobiście
  4. Podaruj radość!
- **Licznik listów** — duża liczba: "Zostało jeszcze **X** listów do realizacji!" (pobierz z danych — policz listy ze statusem `available`). Jeśli 0 — pokaż "Wszystkie listy zostały wybrane! Dziękujemy!"
- **Sekcja sponsorów** — kilka placeholderowych logotypów z szarym tłem i napisem "Logo sponsora". Wystarczy 4-6.
- **FAQ** — 3-4 pytania z odpowiedziami w formacie accordion (kliknij pytanie → rozwija się odpowiedź). Treści mockowane, np. "Jak wybrać list?", "Jak długo mam na realizację?", "Czy mogę wybrać więcej niż jeden list?".

### 2. Strona listów (`/listy`) — `LettersPage.tsx`

- **Filtr** — dropdown z listą placówek + opcja "Wszystkie". Filtruje widoczne listy.
- **Siatka listów** — karty (grid) z miniaturkami:
  - Miniaturka obrazka listu (placeholder).
  - Kod placówki / nazwa miasta.
  - Status (ikonka/badge): dostępny (zielony) / wybrany (szary, niedostępny).
  - Kliknięcie w dostępny list → modal z powiększonym listem + przycisk "Wybierz ten list".
- **Powiększenie listu** — modal/overlay z większym obrazkiem i przyciskiem "Wybierz ten list" (jeśli dostępny).

### 3. Flow wyboru listu (`/wybierz/:letterId`) — `LetterSelectFlow.tsx`

Prosty wielokrokowy formularz (stepper). Wszystko na jednej stronie, kroki można zmieniać przyciskami "Dalej" / "Wstecz".

**Krok 1 — Email:**
- Input: adres email.

**Krok 2 — Dane osobowe:**
- Imię, nazwisko.
- Checkbox: "Wybieram jako firma" → jeśli zaznaczony, pojawiają się pola: NIP, nazwa firmy, adres firmy.

**Krok 3 — Zgody:**
- Checkbox: zgoda marketingowa (opcjonalna).
- Checkbox: akceptacja regulaminu (wymagana).

**Krok 4 — Potwierdzenie:**
- Podsumowanie: dane Mikołaja, kod listu, nazwa placówki.
- Przycisk "Potwierdź wybór".
- Po kliknięciu: wywołaj `selectLetter()` z db-helpers, pokaż komunikat sukcesu z kodem listu i informacją o logowaniu do panelu.

### 4. Galeria (`/galeria`) — `GalleryPage.tsx`

- **Filtry:**
  - Dropdown: placówka (+ "Wszystkie").
  - Dropdown: rok akcji (+ "Wszystkie").
- **Siatka zdjęć** — proste karty ze zdjęciami (placeholdery). Pod każdym: nazwa placówki, rok.
- Kliknięcie w zdjęcie → powiększenie w modalu (lightbox). Wystarczy najprostsza wersja.

## Wytyczne wizualne

- **Kolorystyka:** ciepła, świąteczna ale elegancka. Sugestia:
  - Primary: `#C41E3A` (ciemnoczerwony).
  - Secondary: `#1B5E20` (ciemnozielony).
  - Akcent: `#D4AF37` (złoty).
  - Tło: `#FFF8F0` (ciepła biel).
  - Tekst: `#1A1A1A`.
- **Zaokrąglenia:** `rounded-lg` na kartach, `rounded-xl` na hero.
- **Cienie:** delikatne, `shadow-sm` lub `shadow-md`.
- **Typografia:** domyślne Tailwind, ale użyj `font-serif` dla nagłówków (świąteczny klimat).
- **Prostota:** żadnych skomplikowanych animacji. Wystarczy `hover:scale-105 transition` na kartach.

## Nawigacja

Na stronie publicznej nawigacja (w `Layout.tsx`) powinna zawierać linki:
- Strona główna
- Listy
- Galeria
- Moje listy (→ `/mikolaj`)
- Admin (→ `/admin`) — małym fontem lub ikonką, nie eksponować

## Ważne

- Wszystko ma być **proste i działające**. To jest PoC — klient ma zobaczyć flow i kliknąć interakcje.
- Nie przejmuj się edge case'ami, walidacją, error handlingiem. Jeśli coś nie pasuje — pokaż alert.
- Zdjęcia i obrazki listów to placeholdery (np. z placehold.co lub kolorowe divy).
- Formularze nie wysyłają niczego — zmieniają dane w pamięci (mock db).
