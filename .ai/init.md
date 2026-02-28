# Zadanie: Inicjalizacja projektu

## Cel

Zainicjalizuj pusty projekt React + TypeScript + Tailwind CSS z użyciem Vite. Projekt będzie proof of concept aplikacji "Akcja Listy" (szczegóły w `prod.md`).

## Kroki

### 1. Stwórz projekt Vite + React + TypeScript

```bash
npm create vite@latest akcja-listy -- --template react-ts
cd akcja-listy
npm install
```

### 2. Zainstaluj i skonfiguruj Tailwind CSS

```bash
npm install -D tailwindcss @tailwindcss/vite
```

W pliku `vite.config.ts` dodaj plugin Tailwind:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

W pliku `src/index.css` na samej górze dodaj:

```css
@import "tailwindcss";
```

### 3. Zainstaluj React Router

```bash
npm install react-router-dom
```

### 4. Stwórz strukturę katalogów

```
src/
├── components/          # Współdzielone komponenty UI
│   ├── Layout.tsx       # Główny layout z nawigacją
│   └── ...
├── pages/
│   ├── public/          # Strona ogólnodostępna
│   │   ├── HomePage.tsx
│   │   ├── LettersPage.tsx
│   │   ├── GalleryPage.tsx
│   │   └── LetterSelectFlow.tsx
│   ├── santa/           # Panel Mikołaja
│   │   ├── SantaLogin.tsx
│   │   ├── SantaDashboard.tsx
│   │   └── ...
│   └── admin/           # Panel Administratora
│       ├── AdminDashboard.tsx
│       ├── AdminFacilities.tsx
│       ├── AdminLetters.tsx
│       ├── AdminSantas.tsx
│       ├── AdminActions.tsx
│       ├── AdminEmails.tsx
│       └── AdminUsers.tsx
├── data/                # Mockowane dane (baza danych)
│   ├── models.ts        # Definicje typów/interfejsów
│   └── mock-db.ts       # Mockowane dane
├── hooks/               # Custom hooks
├── utils/               # Helpery
├── App.tsx              # Routing
├── main.tsx             # Entry point
└── index.css            # Tailwind + globalne style
```

### 5. Skonfiguruj routing w `App.tsx`

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importy stron (na razie placeholder komponenty)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Strona publiczna */}
        <Route path="/" element={<HomePage />} />
        <Route path="/listy" element={<LettersPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/wybierz/:letterId" element={<LetterSelectFlow />} />

        {/* Panel Mikołaja */}
        <Route path="/mikolaj" element={<SantaLogin />} />
        <Route path="/mikolaj/panel" element={<SantaDashboard />} />

        {/* Panel Administratora */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/placowki" element={<AdminFacilities />} />
        <Route path="/admin/listy" element={<AdminLetters />} />
        <Route path="/admin/mikolajowie" element={<AdminSantas />} />
        <Route path="/admin/akcje" element={<AdminActions />} />
        <Route path="/admin/maile" element={<AdminEmails />} />
        <Route path="/admin/uzytkownicy" element={<AdminUsers />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 6. Stwórz komponent `Layout.tsx`

Główny layout z:
- **Nagłówek** — logo "Święty Mikołaj dla Seniora", nawigacja (Strona główna, Listy, Galeria, Moje listy, Admin).
- **Zawartość** — `{children}` lub `<Outlet />`.
- **Stopka** — prosta stopka z informacją o fundacji.

Użyj Tailwind. Kolorystyka ciepła, świąteczna (czerwień, zieleń, złoto, biel) ale subtelna i elegancka — to nie jest strona dla dzieci, to akcja dla seniorów.

### 7. Stwórz placeholder dla każdej strony

Każda strona powinna renderować `<Layout>` i wewnątrz prostą treść np. `<h1>Nazwa strony</h1>` żeby można było potwierdzić, że routing działa.

### 8. Wyczyść domyślne pliki Vite

- Usuń `src/App.css` (style przeniesione do Tailwind).
- Usuń domyślną zawartość `App.tsx`.
- Usuń `public/vite.svg` i `src/assets/react.svg`.

### 9. Sprawdź czy działa

```bash
npm run dev
```

Upewnij się, że:
- Strona się odpala bez błędów.
- Tailwind działa (klasy utility się renderują).
- Routing działa — każda ścieżka wyświetla odpowiedni placeholder.

## Rezultat

Gotowy szkielet projektu z routingiem, layoutem i placeholderami — gotowy do implementacji poszczególnych widoków przez kolejnych agentów.
