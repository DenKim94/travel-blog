import { notFound } from 'next/navigation';

export default function CatchAllPage() {
  notFound(); // Triggert die Anzeige von not-found.tsx
}