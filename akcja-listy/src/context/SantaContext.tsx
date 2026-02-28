import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { getSantaById } from '../data/db-helpers';
import type { Santa } from '../data/models';

interface SantaContextType {
  currentSanta: Santa | null;
  login: (santaId: string) => void;
  logout: () => void;
}

const SantaContext = createContext<SantaContextType | null>(null);

export function SantaProvider({ children }: { children: ReactNode }) {
  const [currentSanta, setCurrentSanta] = useState<Santa | null>(null);

  const login = (santaId: string) => {
    const santa = getSantaById(santaId);
    if (santa) setCurrentSanta(santa);
  };

  const logout = () => setCurrentSanta(null);

  return (
    <SantaContext.Provider value={{ currentSanta, login, logout }}>
      {children}
    </SantaContext.Provider>
  );
}

export function useSanta(): SantaContextType {
  const ctx = useContext(SantaContext);
  if (!ctx) throw new Error('useSanta must be used within SantaProvider');
  return ctx;
}
