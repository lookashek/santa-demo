# Zadanie: Panel Administratora (frontend)

## Cel

Zaimplementuj Panel Administratora (backoffice) — widok dla pracowników i wolontariuszy Fundacji do zarządzania całą akcją.

## Kontekst

- Przeczytaj `prod.md` — ogólny opis projektu.
- Przeczytaj `models.md` — interfejsy danych.
- Dane pobieraj i mutuj przez helpery z `src/data/db-helpers.ts`.
- Projekt jest już zainicjalizowany, routing skonfigurowany.

## Zasada ogólna

Panel admina to **typowy CRUD backoffice**. Każda sekcja ma:
1. **Widok listy** — tabela z danymi, sortowanie, filtrowanie.
2. **Widok szczegółów / edycja** — po kliknięciu w wiersz lub przycisk "Edytuj".

Dla PoC nie musimy implementować wszystkiego idealnie. Wystarczy, że klient zobaczy strukturę i kliknie parę rzeczy.

## Nawigacja admina

Panel admina powinien mieć **własny layout** z bocznym menu (sidebar):

- 📊 Dashboard
- 🏥 Placówki
- ✉️ Listy
- 🎅 Mikołajowie
- ⚙️ Konfiguracja Akcji
- 📧 Maile
- 👤 Użytkownicy

W nagłówku: "Panel Administratora — Akcja Listy" + link "Wróć do strony" (→ `/`).

**Nie potrzeba logowania do admina w PoC** — wejście na `/admin` od razu pokazuje panel. Dla demo wystarczy.

## Strony do zaimplementowania

### 1. Dashboard (`/admin`) — `AdminDashboard.tsx`

Prosty dashboard z kafelkami/statystykami:

- **Aktywna akcja:** nazwa i daty.
- **Łączna liczba listów** w bieżącej akcji.
- **Listy wg statusu:** 4 kafelki z liczbami — dostępne, wybrane, potwierdzone, zwrócone.
- **Liczba placówek** (aktywnych, tj. niewykluczonych).
- **Liczba Mikołajów** w bieżącej akcji.

Dane pobieraj z mock-db i licz w locie.

### 2. Placówki (`/admin/placowki`) — `AdminFacilities.tsx`

**Widok listy (tabela):**

| Kod | Nazwa | Miasto | Telefon | Email | Wykluczona | Akcje |
|---|---|---|---|---|---|---|
| DPS-001 | DPS Słoneczny Dom | Warszawa | ... | ... | Nie | Edytuj |

- Sortowanie po kolumnach (kliknięcie w nagłówek).
- Filtrowanie: pole tekstowe — szukaj po nazwie/mieście.

**Widok edycji** (modal lub osobna sekcja pod tabelą):
- Formularz z polami placówki (name, city, address, phone, email, contactPerson).
- Checkbox: "Wyklucz z bieżącej Akcji".
- Przycisk "Zapisz" → wywołuje `updateFacility()`.
- Sekcja Galeria — lista miniaturek zdjęć (podgląd, bez uploadu — PoC).

### 3. Listy (`/admin/listy`) — `AdminLetters.tsx`

**Widok listy (tabela):**

| Kod | Placówka | Tura | Status | Mikołaj | Wybrano | Akcje |
|---|---|---|---|---|---|---|
| L-001 | DPS Słoneczny Dom | Tura I | Wybrany | Anna Kowalska | 2025-11-02 | Szczegóły |

- Sortowanie po kolumnach.
- Filtry:
  - Status (dropdown: Wszystkie / Dostępny / Wybrany / Potwierdzony / Zwrócony).
  - Placówka (dropdown).
  - Tura (dropdown).

**Widok szczegółów** (modal lub panel boczny):
- Miniaturka listu (obrazek).
- Wszystkie dane listu.
- Dane Mikołaja (jeśli przypisany) — imię, email, telefon.
- **Akcje admina:**
  - "Potwierdź list" (jeśli status = selected) → `confirmLetter()`.
  - "Wycofaj list" (jeśli status = selected/confirmed) → `returnLetter()`.
  - "Odepnij Mikołaja" (jeśli jest przypisany) → `detachSantaFromLetter()`.

**Przycisk "Eksport do Excela":**
- Dla PoC wystarczy: kliknięcie generuje alert/toast "Eksport do Excela — funkcja dostępna w pełnej wersji" lub opcjonalnie pobierz CSV z aktualnie wyfiltrowanymi danymi.

### 4. Mikołajowie (`/admin/mikolajowie`) — `AdminSantas.tsx`

**Widok listy (tabela):**

| Imię | Nazwisko | Email | Firma | Liczba listów | Zgoda marketingowa | Akcje |
|---|---|---|---|---|---|---|
| Anna | Kowalska | anna@... | Nie | 2 | Tak | Szczegóły |

- Filtr: pole tekstowe — szukaj po imieniu/emailu.

**Widok szczegółów:**
- Dane Mikołaja.
- Lista jego listów (z bieżącej i poprzednich akcji) — tabela wewnątrz: kod listu, placówka, status, rok.

### 5. Konfiguracja Akcji (`/admin/akcje`) — `AdminActions.tsx`

**Lista akcji:**

| Rok | Nazwa | Status | Daty | Tury | Akcje |
|---|---|---|---|---|---|
| 2025 | Akcja Listy 2025 | Aktywna | 01.11-30.11 | 3 | Edytuj |
| 2024 | Akcja Listy 2024 | Zakończona | ... | 3 | Podgląd |

**Widok edycji:**
- Nazwa, rok.
- Checkbox: "Aktywna".
- Data rozpoczęcia, data zakończenia (inputy date).
- **Tury** — lista z polami:
  - Nazwa tury.
  - Data rozpoczęcia.
  - Termin potwierdzenia (deadline).
  - (Nie trzeba dodawać/usuwać tur w PoC — wystarczy edycja istniejących.)
- Przycisk "Zapisz".

### 6. Maile (`/admin/maile`) — `AdminEmails.tsx`

**Lista szablonów:**

| Typ | Nazwa | Temat | Akcje |
|---|---|---|---|
| letter_selected | Potwierdzenie wyboru listu | Wybrałeś list {kod-listu} | Edytuj · Wyślij testowo |

**Widok edycji:**
- Typ (nieedytowalny).
- Nazwa.
- Temat (input tekstowy).
- Treść (textarea — wystarczy plain text/prosty HTML).
- **Dostępne parametry** — lista parametrów wyświetlona obok, np. `{imie-mikolaja}`, `{kod-listu}`, `{termin-potwierdzenia}`. Kliknięcie w parametr wstawia go do pola treści (opcjonalnie — wystarczy wylistować).
- Przycisk "Zapisz".

**Wyślij na żądanie:**
- Przycisk przy szablonie → modal:
  - Dropdown: wybierz Mikołaja.
  - Dropdown: wybierz list (tego Mikołaja).
  - Przycisk "Wyślij" → alert/toast: "Wiadomość wysłana (symulacja)".

### 7. Użytkownicy (`/admin/uzytkownicy`) — `AdminUsers.tsx`

**Widok listy:**

| Imię | Email | Rola | Placówki | Akcje |
|---|---|---|---|---|
| Maria Admin | maria@... | Admin | Wszystkie | Edytuj |
| Tomek Wolontariusz | tomek@... | Wolontariusz | DPS Słoneczny Dom | Edytuj |

**Widok edycji:**
- Imię, email.
- Rola (dropdown: Admin / Wolontariusz).
- Powiązane placówki (multi-select / checkboxy) — pusty = dostęp do wszystkich.
- Przycisk "Zapisz".

## Layout admina

Stwórz oddzielny `AdminLayout.tsx`:

```
┌──────────────────────────────────────────┐
│  Panel Administratora    [Wróć do strony]│
├────────────┬─────────────────────────────┤
│            │                             │
│  Sidebar   │     Zawartość               │
│  (menu)    │     (Outlet)                │
│            │                             │
│            │                             │
│            │                             │
└────────────┴─────────────────────────────┘
```

- Sidebar: ciemne tło (np. `bg-gray-800 text-white`), linki z ikonkami (emoji wystarczą).
- Zawartość: jasne tło, padding.
- Responsywność: na mobile sidebar może się chować (hamburger) — ale to niskopriorytetowe w PoC.

## Komponenty współdzielone (sugestia)

Żeby nie powtarzać kodu, warto stworzyć:

- **`DataTable.tsx`** — generyczna tabela z sortowaniem (klik w nagłówek). Props: columns, data, onSort.
- **`FilterBar.tsx`** — pasek z filtrami (inputy, dropdowny).
- **`Modal.tsx`** — prosty modal (overlay + centered box).
- **`StatusBadge.tsx`** — badge ze statusem listu (kolorowy).

Ale jeśli to za dużo — kopiuj kod między stronami. Prostota > DRY w PoC.

## Wytyczne wizualne

- Admin panel: **czysto, funkcjonalnie** — nie musi być „ładny", musi być czytelny.
- Kolorystyka: neutralna (szarości, biel) z akcentami kolorystycznymi na statusach.
- Tabele: `border`, `hover:bg-gray-50`, czytelne nagłówki.
- Przyciski: `bg-blue-600 text-white` (główny), `bg-gray-200` (drugorzędny), `bg-red-500` (destrukcyjny).

## Ważne

- **Prostota ponad wszystko.** To jest PoC do pokazania klientowi. Klient ma zobaczyć, że panel zawiera odpowiednie sekcje i dane, i że można kliknąć "Edytuj".
- **Nie implementuj pełnej funkcjonalności CRUD.** Wystarczy:
  - Widok listy z danymi z mock-db.
  - Otwarcie formularza edycji z wypełnionymi danymi.
  - Przycisk "Zapisz" który zmienia dane w pamięci i pokazuje toast/alert.
- **Eksport do Excela** — wystarczy symulacja (alert) lub prosty CSV.
- **Dane w pamięci** — po odświeżeniu wracają do stanu początkowego.
