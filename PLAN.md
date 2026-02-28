# Plan wykonania — krok po kroku

## Przegląd plików

| Plik | Rola | Zależności |
|---|---|---|
| `prod.md` | Kontekst biznesowy — każdy agent powinien go przeczytać | brak |
| `styles.md` | Design system — referencja dla agentów frontendowych | brak |
| `init.md` | Inicjalizacja projektu | brak |
| `models.md` | Definicje typów TS | `prod.md` |
| `db.md` | Mockowana baza danych | `models.md` |
| `frontend-public.md` | Strona publiczna | `db.md`, `styles.md` |
| `frontend-santa.md` | Panel Mikołaja | `db.md`, `styles.md` |
| `frontend-admin.md` | Panel Administratora | `db.md`, `styles.md` |

---

## Kolejność odpalania

### Krok 1: Inicjalizacja projektu

**Agent:** Coding agent (Claude Code / Cursor / Copilot)
**Pliki do podania:** `prod.md` + `init.md` + `styles.md`
**Prompt:**

> Przeczytaj pliki prod.md, init.md i styles.md. Zainicjalizuj projekt zgodnie z instrukcjami w init.md. Skonfiguruj globalne style zgodnie z styles.md. Na koniec upewnij się, że `npm run dev` działa i routing pokazuje placeholdery.

**Oczekiwany rezultat:**
- Projekt Vite + React + TS + Tailwind działa.
- Struktura katalogów zgodna z init.md.
- Custom kolory z styles.md skonfigurowane w `index.css`.
- Routing działa — każda ścieżka renderuje placeholder.
- `npm run dev` startuje bez błędów.

**Weryfikacja:** Odpal `npm run dev`, otwórz przeglądarkę, poklikaj po routach — wszędzie powinien być placeholder z nazwą strony.

---

### Krok 2: Modele i baza danych

**Agent:** Coding agent
**Pliki do podania:** `prod.md` + `models.md` + `db.md`
**Prompt:**

> Przeczytaj pliki prod.md, models.md i db.md. Wygeneruj pliki src/data/models.ts, src/data/mock-db.ts i src/data/db-helpers.ts zgodnie z instrukcjami. Dane muszą być spójne — poprawne relacje i referencje między encjami.

**Oczekiwany rezultat:**
- `src/data/models.ts` — wyeksportowane interfejsy.
- `src/data/mock-db.ts` — mockowane dane (20 listów, 5 Mikołajów, 4 placówki itd.).
- `src/data/db-helpers.ts` — helpery CRUD.
- Brak błędów TypeScript (`npx tsc --noEmit` przechodzi).

**Weryfikacja:** Otwórz pliki, sprawdź czy relacje się zgadzają (np. letter.facilityId wskazuje na istniejącą placówkę). Opcjonalnie zaimportuj helpery w jakimś komponencie i sprawdź w konsoli czy zwracają dane.

---

### Krok 3: Strona publiczna

**Agent:** Coding agent
**Pliki do podania:** `prod.md` + `styles.md` + `frontend-public.md`
**Prompt:**

> Przeczytaj pliki prod.md, styles.md i frontend-public.md. Zaimplementuj stronę publiczną: HomePage, LettersPage, LetterSelectFlow i GalleryPage. Dane pobieraj z src/data/db-helpers.ts. Stosuj kolory i klasy ze styles.md.

**Oczekiwany rezultat:**
- Strona główna z hero, licznikiem, FAQ, sponsorami.
- Lista listów z filtrem po placówce, modal z powiększeniem, przycisk "Wybierz".
- Flow wyboru listu (4 kroki) — działa end-to-end (po potwierdzeniu list zmienia status w pamięci).
- Galeria z filtrami i lightboxem.

**Weryfikacja:** Odpal apkę, przejdź cały flow: strona główna → listy → klik w list → wybierz → wypełnij formularz → potwierdź. Sprawdź czy list zniknął z dostępnych.

---

### Krok 4: Panel Mikołaja

**Agent:** Coding agent
**Pliki do podania:** `prod.md` + `styles.md` + `frontend-santa.md`
**Prompt:**

> Przeczytaj pliki prod.md, styles.md i frontend-santa.md. Zaimplementuj Panel Mikołaja: logowanie (z demo shortcuts), dashboard z bieżącymi listami i akcjami (potwierdź, zrezygnuj, tracking) oraz archiwum. Dane pobieraj i mutuj przez src/data/db-helpers.ts.

**Oczekiwany rezultat:**
- Logowanie działa (email + kod lub demo shortcut).
- Dashboard pokazuje listy Mikołaja z poprawnymi statusami.
- Kliknięcie "Potwierdź realizację" zmienia status na confirmed.
- Kliknięcie "Zrezygnuj" zmienia status na returned.
- Archiwum pokazuje listy z poprzedniej akcji (2024).

**Weryfikacja:** Zaloguj się przez demo shortcut. Sprawdź czy widzisz listy. Potwierdź jeden list, zrezygnuj z drugiego. Wyloguj i zaloguj ponownie — statusy powinny być zmienione (do odświeżenia strony).

---

### Krok 5: Panel Administratora

**Agent:** Coding agent
**Pliki do podania:** `prod.md` + `styles.md` + `frontend-admin.md`
**Prompt:**

> Przeczytaj pliki prod.md, styles.md i frontend-admin.md. Zaimplementuj Panel Administratora z własnym layoutem (sidebar). Sekcje: Dashboard ze statystykami, Placówki, Listy, Mikołajowie, Konfiguracja Akcji, Maile, Użytkownicy. Wszystko CRUD z danymi z mock-db. Stosuj klasy ze styles.md.

**Oczekiwany rezultat:**
- Admin layout z sidebarowym menu.
- Dashboard z kafelkami statystyk.
- Każda sekcja ma tabelę z danymi i możliwość edycji (modal/formularz).
- Listy: filtry po statusie/placówce/turze, akcje admina (potwierdź, wycofaj, odepnij).
- Maile: edycja szablonów, symulacja wysyłki.

**Weryfikacja:** Wejdź na `/admin`, poklikaj po sekcjach. Sprawdź czy tabele mają dane. Otwórz edycję placówki, zmień coś, zapisz. Wejdź w listy, przefiltruj, otwórz szczegóły listu.

---

### Krok 6: Integracja i przegląd

**Agent:** Ty (ręcznie) lub coding agent
**Prompt (jeśli agent):**

> Przejrzyj cały projekt. Upewnij się, że nawigacja między stroną publiczną, panelem Mikołaja i panelem admina działa płynnie. Popraw ewentualne niespójności wizualne. Sprawdź czy nie ma błędów w konsoli.

**Checklist:**
- [ ] Strona główna → Listy → Wybór listu → Panel Mikołaja — cały flow działa.
- [ ] Panel Mikołaja — logowanie, podgląd, akcje.
- [ ] Panel Admina — nawigacja, tabele, edycja.
- [ ] Nawigacja globalna — linki między częściami działają.
- [ ] Brak błędów w konsoli przeglądarki.
- [ ] Kolorystyka spójna (forest/gold/cream) we wszystkich częściach.
- [ ] `npm run build` przechodzi bez błędów (gotowe do deploymentu).

---

### Krok 7: Deploy (później)

Kiedy PoC będzie gotowy:

```bash
npm run build
```

Wynik (`dist/`) wrzuć na darmowy hosting:
- **Vercel:** `npx vercel` (najprościej, zero konfiguracji)
- **Netlify:** drag & drop folderu `dist` na app.netlify.com/drop
- **GitHub Pages:** push na repo + GitHub Actions

---

## Diagram kolejności

```
Krok 1: init.md + styles.md
    │
    ▼
Krok 2: models.md + db.md
    │
    ├──────────────┬──────────────┐
    ▼              ▼              ▼
Krok 3         Krok 4         Krok 5
frontend-      frontend-      frontend-
public.md      santa.md       admin.md
    │              │              │
    └──────────────┴──────────────┘
                   │
                   ▼
            Krok 6: Integracja
                   │
                   ▼
            Krok 7: Deploy
```

**Kroki 3, 4 i 5 mogą być odpalane równolegle** jeśli masz wielu agentów / sesje. Nie mają między sobą zależności — każdy korzysta tylko z mock-db.

---

## Wskazówki praktyczne

1. **Dawaj agentowi kontekst.** Zawsze podawaj `prod.md` + odpowiedni plik zadania. Agent bez kontekstu biznesowego będzie zgadywał.

2. **Jeden agent = jedno zadanie.** Nie każ jednemu agentowi robić wszystkiego naraz. Lepiej mniejsze, kontrolowane kroki.

3. **Weryfikuj po każdym kroku.** Odpal `npm run dev`, poklikaj. Jeśli coś nie działa — napraw zanim przejdziesz dalej. Błędy się kumulują.

4. **Jeśli agent się gubi** — podaj mu konkretny plik, który ma edytować, i konkretny błąd do naprawy. Nie powtarzaj całego zadania.

5. **Styles.md jest referencją, nie zadaniem.** Agent frontendowy powinien go przeczytać i stosować klasy, ale nie musi go „wykonywać" — kolory są już skonfigurowane po kroku 1.

6. **Po kroku 2 zrób commit.** Modele i dane to fundament — jeśli coś pójdzie nie tak w frontendzie, możesz wrócić do tego punktu.
