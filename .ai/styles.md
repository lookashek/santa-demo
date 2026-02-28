# Zadanie: Globalne style i design system

## Cel

Stwórz spójny system wizualny dla całej aplikacji "Akcja Listy". Zdefiniuj kolory, typografię, komponenty bazowe i utility classes w Tailwind. Wszystkie inne zadania frontendowe (`frontend-public.md`, `frontend-santa.md`, `frontend-admin.md`) powinny korzystać z tych wytycznych.

## Paleta kolorów

Motyw: **ciepły, zimowy, przytulny** — inspirowany ciepłym światłem lampek, złotem prezentów i zielenią choinki. Bez czerwieni — stawiamy na elegancję i ciepło zamiast klasycznego „mikołajowego" czerwonego.

### Kolory główne

| Nazwa | Tailwind custom | Hex | Zastosowanie |
|---|---|---|---|
| **Forest** | `forest` | `#2D5F4A` | Primary — przyciski, linki, akcenty nawigacji |
| **Forest Dark** | `forest-dark` | `#1A3C2E` | Hover na primary, nagłówki, sidebar admina |
| **Gold** | `gold` | `#C9A84C` | Akcenty — badge, ikony, podkreślenia, CTA hero |
| **Gold Light** | `gold-light` | `#E8D5A0` | Tło akcentowe, hover na złotych elementach |
| **Warm Cream** | `cream` | `#FDF8F0` | Główne tło strony publicznej |
| **Warm White** | `warm-white` | `#FEFCF9` | Tło kart, modali |
| **Sand** | `sand` | `#F0E6D3` | Tło sekcji, paski, dzielniki |

### Kolory neutralne

| Nazwa | Hex | Zastosowanie |
|---|---|---|
| **Text Primary** | `#1C1917` (stone-900) | Główny tekst |
| **Text Secondary** | `#57534E` (stone-600) | Tekst pomocniczy, opisy |
| **Text Muted** | `#A8A29E` (stone-400) | Placeholder, disabled |
| **Border** | `#E7E5E4` (stone-200) | Obramowania, linie |
| **Background Admin** | `#F5F5F4` (stone-100) | Tło panelu admina |

### Kolory statusów

| Status | Kolor | Tailwind | Zastosowanie |
|---|---|---|---|
| Dostępny | Zielony | `bg-emerald-100 text-emerald-800` | Badge "Dostępny" |
| Wybrany | Bursztynowy | `bg-amber-100 text-amber-800` | Badge "Wybrany / Oczekuje" |
| Potwierdzony | Niebieski | `bg-sky-100 text-sky-800` | Badge "Zrealizowany" |
| Zwrócony | Szary | `bg-stone-100 text-stone-600` | Badge "Zwrócony" |
| Błąd | Czerwony | `bg-red-100 text-red-700` | Walidacja, alerty błędów |
| Sukces | Zielony | `bg-emerald-50 text-emerald-700` | Toast sukcesu |

## Konfiguracja Tailwind

W pliku `src/index.css` dodaj custom theme przez `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-forest: #2D5F4A;
  --color-forest-dark: #1A3C2E;
  --color-gold: #C9A84C;
  --color-gold-light: #E8D5A0;
  --color-cream: #FDF8F0;
  --color-warm-white: #FEFCF9;
  --color-sand: #F0E6D3;
}
```

Dzięki temu w całym projekcie można używać: `bg-forest`, `text-gold`, `border-gold-light`, `hover:bg-forest-dark` itd.

## Typografia

Nie ładujemy custom fontów — używamy systemowych z Tailwind, ale z jedną modyfikacją:

```css
body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  color: #1C1917;
  background-color: #FDF8F0;
}
```

### Hierarchia nagłówków

| Element | Klasy Tailwind | Uwagi |
|---|---|---|
| H1 (hero) | `text-4xl md:text-5xl font-bold text-forest-dark` | Tylko na hero strony głównej |
| H1 (strona) | `text-3xl font-bold text-forest-dark` | Nagłówek każdej podstrony |
| H2 (sekcja) | `text-2xl font-semibold text-forest-dark` | Nagłówki sekcji |
| H3 (karta) | `text-lg font-semibold text-stone-900` | Nagłówki kart, modali |
| Body | `text-base text-stone-700` | Zwykły tekst |
| Small / Caption | `text-sm text-stone-500` | Etykiety, podpisy |

## Komponenty bazowe — klasy

### Przyciski

```
/* Primary */
bg-forest hover:bg-forest-dark text-white font-medium px-6 py-2.5 rounded-lg transition-colors

/* Secondary */
bg-sand hover:bg-gold-light text-forest-dark font-medium px-6 py-2.5 rounded-lg border border-stone-200 transition-colors

/* Gold / CTA */
bg-gold hover:bg-yellow-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors

/* Danger */
bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors

/* Ghost */
text-forest hover:text-forest-dark hover:bg-sand px-4 py-2 rounded-lg transition-colors

/* Disabled (dodaj do dowolnego) */
opacity-50 cursor-not-allowed pointer-events-none
```

### Karty

```
/* Karta standardowa */
bg-warm-white rounded-xl shadow-sm border border-stone-200 p-6

/* Karta z hoverem (np. lista listów) */
bg-warm-white rounded-xl shadow-sm border border-stone-200 p-4 hover:shadow-md hover:border-gold-light transition-all cursor-pointer

/* Karta wyróżniona (np. statystyki admina) */
bg-white rounded-xl shadow-sm border-l-4 border-l-forest p-6
```

### Inputy formularzy

```
/* Input / Select / Textarea */
w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors

/* Label */
block text-sm font-medium text-stone-700 mb-1.5
```

### Badge statusu

```
/* Bazowy */
inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium

/* + klasy statusowe z tabeli powyżej */
```

### Modal

```
/* Overlay */
fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center

/* Content */
bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 p-6 max-h-[90vh] overflow-y-auto
```

### Tabele (admin)

```
/* Table */
w-full text-left border-collapse

/* Thead */
bg-stone-50 border-b border-stone-200

/* Th */
px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider

/* Td */
px-4 py-3 text-sm text-stone-700 border-b border-stone-100

/* Tr hover */
hover:bg-stone-50 transition-colors
```

### Nawigacja (strona publiczna)

```
/* Navbar */
bg-forest-dark text-white px-6 py-4 shadow-md

/* Link aktywny */
text-gold font-semibold

/* Link nieaktywny */
text-white/80 hover:text-gold transition-colors
```

### Sidebar (admin)

```
/* Sidebar */
bg-forest-dark text-white w-64 min-h-screen p-4

/* Link aktywny */
bg-forest text-gold-light rounded-lg px-4 py-2.5 font-medium

/* Link nieaktywny */
text-white/70 hover:bg-forest hover:text-white rounded-lg px-4 py-2.5 transition-colors
```

## Efekty i animacje

Minimalne — PoC nie potrzebuje wow-efektów:

- **Hover na kartach:** `hover:shadow-md transition-all duration-200`
- **Hover na przyciskach:** zmiana koloru tła z `transition-colors`
- **Modal wejście:** wystarczy natychmiastowe pojawienie (bez animacji) — prostota.
- **Accordion FAQ:** `transition-all duration-300` na rozwijaniu.

## Ikony

Nie instalujemy żadnej biblioteki ikon. Używamy **emoji** jako ikon:
- 🎄 Akcja / Strona główna
- ✉️ Listy
- 📸 Galeria
- 🎅 Mikołaj / Panel
- 🏥 Placówki
- ⚙️ Konfiguracja
- 📧 Maile
- 👤 Użytkownicy
- 📊 Dashboard
- ✅ Potwierdzone
- ⏳ Oczekujące
- ↩️ Zwrócone

## Spacing i layout

- **Max-width strony publicznej:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Odstępy między sekcjami:** `py-16` (strona publiczna), `py-8` (panele)
- **Gap w gridach:** `gap-6`
- **Grid listów:** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
- **Grid statystyk admina:** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`

## Plik docelowy

Wszystkie custom kolory wpisz do `src/index.css` (blok `@theme`).

Opcjonalnie stwórz plik `src/styles/tokens.ts` z eksportowanymi stałymi, jeśli agenci frontendowi potrzebują odwoływać się do kolorów w kodzie JS:

```ts
export const colors = {
  forest: '#2D5F4A',
  forestDark: '#1A3C2E',
  gold: '#C9A84C',
  goldLight: '#E8D5A0',
  cream: '#FDF8F0',
  warmWhite: '#FEFCF9',
  sand: '#F0E6D3',
} as const;
```

## Rezultat

Po wykonaniu tego zadania:
1. `src/index.css` zawiera import Tailwind + blok `@theme` z custom kolorami + style bazowe body.
2. Opcjonalnie `src/styles/tokens.ts` z kolorami jako stałe JS.
3. Reszta agentów używa powyższych klas i konwencji — **ten plik jest ich referencją**.
