 "use client"
import EventScheduler from "./component/ EventScheduler";
import './styles/global.scss'

export default function Home() {
  return (
    <main className="p-4 min-h-screen bg-gray-50">
      <EventScheduler />
    </main>
  );
}