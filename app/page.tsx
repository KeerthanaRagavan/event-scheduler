 "use client"
import EventScheduler from './component/EventScheduler';

export default function Home() {
  return (
    <main className="p-4 min-h-screen bg-gray-50">
      <EventScheduler />
    </main>
  );
}