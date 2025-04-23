// components/CustomToolbar.tsx
import { ToolbarProps } from 'react-big-calendar';
type Event = {
    title: string;
    address: string;
    start: Date;
    end: Date;
  };
  const CustomToolbar: React.FC<ToolbarProps<Event>> = ({ label, onNavigate, onView }) => {
  return (
    <div className="flex justify-between items-center p-2 bg-gray-100 rounded mb-2">
      <div className="space-x-2">
        <button onClick={() => onNavigate('TODAY')} className="bg-blue-500 text-white px-3 py-1 rounded">
          Today
        </button>
     
       
      </div>

      <div className="text-xl font-semibold">    <button onClick={() => onNavigate('PREV')} className=" px-3 py-1 text-2xl align-middle rounded">
          {"<"}
        </button>
        {label}
        <button onClick={() => onNavigate('NEXT')} className=" px-3 py-1 text-2xl align-middle rounded">
        {">"}
        </button></div>

      <div className="space-x-2">
        <button onClick={() => onView('month')} className="bg-green-500 text-white px-3 py-1 rounded">Month</button>
        <button onClick={() => onView('week')} className="bg-purple-500 text-white px-3 py-1 rounded">Week</button>
        <button onClick={() => onView('agenda')} className="bg-pink-500 text-white px-3 py-1 rounded">Agenda</button>
      </div>
    </div>
  );
}
export default CustomToolbar;
