import { Action, Facility, Letter, LetterStatus, Santa, EmailTemplate } from './models';
import { actions, facilities, letters, santas, emailTemplates } from './mock-db';

// ============================================================
// Helpery — pobieranie
// ============================================================

export function getActiveAction(): Action | undefined {
  return actions.find((a) => a.isActive);
}

export function getFacilities(): Facility[] {
  return facilities;
}

export function getActiveFacilities(): Facility[] {
  return facilities.filter((f) => !f.isExcluded);
}

export function getFacilityById(id: string): Facility | undefined {
  return facilities.find((f) => f.id === id);
}

export function getAvailableLetters(facilityId?: string): Letter[] {
  return letters.filter(
    (l) =>
      l.status === 'available' &&
      (facilityId === undefined || l.facilityId === facilityId),
  );
}

export function getLettersByStatus(status: LetterStatus): Letter[] {
  return letters.filter((l) => l.status === status);
}

export function getLettersBySanta(santaId: string): Letter[] {
  return letters.filter((l) => l.santaId === santaId);
}

export function getLetterByCode(code: string): Letter | undefined {
  return letters.find((l) => l.code === code);
}

export function getLetterById(id: string): Letter | undefined {
  return letters.find((l) => l.id === id);
}

export function getSantaByEmail(email: string): Santa | undefined {
  return santas.find((s) => s.email.toLowerCase() === email.toLowerCase());
}

export function getSantaById(id: string): Santa | undefined {
  return santas.find((s) => s.id === id);
}

export function getEmailTemplates(): EmailTemplate[] {
  return emailTemplates;
}

// ============================================================
// Helpery — mutacje (działają na danych w pamięci)
// ============================================================

function findLetterOrThrow(letterId: string): Letter {
  const letter = letters.find((l) => l.id === letterId);
  if (!letter) throw new Error(`Letter not found: ${letterId}`);
  return letter;
}

/** Przypisuje list do Mikołaja. Tworzy Mikołaja jeśli nie istnieje. */
export function selectLetter(letterId: string, santa: Santa): Letter {
  const letter = findLetterOrThrow(letterId);
  if (letter.status !== 'available') {
    throw new Error(`Letter ${letterId} is not available (status: ${letter.status})`);
  }

  // Dodaj Mikołaja do listy jeśli jeszcze nie istnieje
  const exists = santas.find((s) => s.id === santa.id);
  if (!exists) {
    santas.push(santa);
  }

  letter.status = 'selected';
  letter.santaId = santa.id;
  letter.selectedAt = new Date().toISOString();
  return letter;
}

/** Mikołaj potwierdza realizację listu. */
export function confirmLetter(letterId: string, estimatedValue: number): Letter {
  const letter = findLetterOrThrow(letterId);
  if (letter.status !== 'selected') {
    throw new Error(`Letter ${letterId} cannot be confirmed (status: ${letter.status})`);
  }
  letter.status = 'confirmed';
  letter.confirmedAt = new Date().toISOString();
  letter.estimatedValue = estimatedValue;
  return letter;
}

/** Zwraca list do puli (Mikołaj zrezygnował lub upłynął termin). */
export function returnLetter(letterId: string): Letter {
  const letter = findLetterOrThrow(letterId);
  letter.status = 'returned';
  letter.santaId = null;
  letter.selectedAt = null;
  letter.confirmedAt = null;
  letter.estimatedValue = null;
  letter.trackingLink = null;
  letter.deliveryMethod = null;
  return letter;
}

/** Aktualizuje dane dostawy listu. */
export function updateLetterTracking(
  letterId: string,
  trackingLink: string | null,
  deliveryMethod: 'shipping' | 'personal',
): Letter {
  const letter = findLetterOrThrow(letterId);
  letter.trackingLink = trackingLink;
  letter.deliveryMethod = deliveryMethod;
  return letter;
}

// ============================================================
// Admin — mutacje
// ============================================================

/** Aktualizuje dane placówki. */
export function updateFacility(id: string, data: Partial<Facility>): Facility {
  const facility = facilities.find((f) => f.id === id);
  if (!facility) throw new Error(`Facility not found: ${id}`);
  Object.assign(facility, data);
  return facility;
}

/** Aktualizuje szablon maila. */
export function updateEmailTemplate(
  id: string,
  data: Partial<EmailTemplate>,
): EmailTemplate {
  const tpl = emailTemplates.find((t) => t.id === id);
  if (!tpl) throw new Error(`EmailTemplate not found: ${id}`);
  Object.assign(tpl, data);
  return tpl;
}

/** Odpina Mikołaja od listu i przywraca go do statusu available. */
export function detachSantaFromLetter(letterId: string): Letter {
  const letter = findLetterOrThrow(letterId);
  letter.status = 'available';
  letter.santaId = null;
  letter.selectedAt = null;
  letter.confirmedAt = null;
  letter.estimatedValue = null;
  letter.trackingLink = null;
  letter.deliveryMethod = null;
  return letter;
}
