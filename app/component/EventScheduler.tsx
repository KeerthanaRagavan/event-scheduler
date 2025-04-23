"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  Views,
  momentLocalizer,
  SlotInfo,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { stringOrDate } from "react-big-calendar";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./CustomInput";
import CustomToolbar from "./CustomToolbar";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop<Event>(Calendar);

type Event = {
  title: string;
  address: string;
  start: Date;
  end: Date;
};

export default function EventScheduler() {
  const [events, setEvents] = useState<Event[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<null | (() => void)>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Event>({
    title: "",
    address: "",
    start: new Date(),
    end: new Date(),
  });
  const [drag, setDrag] = useState<Event[]>([]);
  useEffect(() => {
    // Initialize with a default event in the local time zone
    const localStart = moment().local().toDate();
    const localEnd = moment().local().add(1, "hour").toDate();
    setEvents([
      {
        title: "Team Meeting",
        address: "Main Office",
        start: localStart,
        end: localEnd,
      },
    ]);
    setDrag([
      {
        title: "Induction Program",
        address: "Coimbatore",
        start: localStart,
        end: localEnd,
      },
    ]);
  }, []);

  const openNewEventForm = () => {
    const localStart = moment().local().toDate();
    const localEnd = moment().local().add(1, "hour").toDate();
    setFormData({ title: "", address: "", start: localStart, end: localEnd });
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setFormData({ title: "", address: "", start: slotInfo.start, end: slotInfo.end });
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleSelectEvent = (event: Event) => {
    setFormData(event);
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (selectedEvent) {
      setEvents(events.map((evt) => (evt === selectedEvent ? { ...formData } : evt)));
    } else {
      setEvents([...events, { ...formData }]);
    }
    setModalOpen(false);
  };

  const handleConfirm = (action: () => void) => {
    setConfirmAction(() => action);
    setConfirmOpen(true);
    setModalOpen(false);
  };

  const handleConfirmYes = () => {
    confirmAction?.();
    setConfirmAction(null);
    setConfirmOpen(false);
    setModalOpen(false);
  };

  const handleDiscard = () => {
    handleConfirm(() => {
      const localStart = moment().local().toDate();
      const localEnd = moment().local().add(1, "hour").toDate();
      setFormData({ title: "", address: "", start: localStart, end: localEnd });
      setModalOpen(false);
    });
  };

  const handleDelete = () => {
    handleConfirm(() => {
      setEvents(events.filter((evt) => evt !== selectedEvent));
    });
  };

  const handleEventDrop = useCallback(
    ({
      event,
      start,
      end,
    }: {
      event: Event;
      start: stringOrDate;
      end: stringOrDate;
    }) => {
      const updated = {
        ...event,
        start: new Date(start),
        end: new Date(end),
      };
      setEvents((prevEvents) =>
        prevEvents.map((evt) => (evt === event ? updated : evt))
      );
    },
    []
  );

  const handleEventResize = useCallback(
    ({
      event,
      start,
      end,
    }: {
      event: Event;
      start: stringOrDate;
      end: stringOrDate;
    }) => {
      const updated = {
        ...event,
        start: new Date(start),
        end: new Date(end),
      };
      setEvents((prevEvents) =>
        prevEvents.map((evt) => (evt === event ? updated : evt))
      );
    },
    []
  );



  return (
    <div>
      <div className="flex place-content-between py-4 bg-gray-200 rounded-sm px-2 "> 
          <div className="text-base font-bold font-[Poppins]  align-middle">Event Scheduler</div>
        <div>
          <Button className="font-[Poppins] text-base" onClick={openNewEventForm}>  <span ><CalendarTodayIcon /></span> <span className="align-middle pl-2">New Event</span> </Button>
        </div></div>

      <div className="grid grid-cols-6 gap-4 pt-4">
        <div className="col-span-1 bg-gray-100 rounded ">
          <div className="p-2 text-base font-bold font-[Poppins]">
            To Drag the event
          </div>
          <div className="p-4">
            {drag?.map((value, i) => (
              <div
                className="font-[Poppins] align-middle  text-xs p-2 mb-2 bg-[#3174ad] text-white shadow rounded cursor-move"
                draggable
                onDragStart={() => setDraggedEvent(value)}
                key={i}
              >
                <div className="font-poppins"> <span><GroupsIcon sx={{fontSize:14}}  /></span> {value.title}</div>
                <div> <span> <LocationOnIcon  sx={{fontSize:14}}  /></span> {value.address}</div>
                <div className="flex align-middle"><span className="pr-1 "><AccessTimeIcon  sx={{fontSize:14}} /></span> {moment(value.start).format("h:mm A")}
                  {" to "}  {moment(value.end).format("h:mm A")}</div>
              </div>
            ))}
          </div>

        </div>
        <div className="col-span-5">
          {/* Calendar */}
          <DnDCalendar className="font-[Poppins] text-base"
            components={{
              toolbar: CustomToolbar,
            }}
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            selectable
            resizable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            views={[Views.MONTH, Views.WEEK, Views.AGENDA]}
            defaultView={Views.MONTH}
            draggableAccessor={() => true}
            // dragFromOutsideItem={() => {
            //   return () => draggedEvent?.start ?? new Date(); // this works without type error
            // }}
            onDropFromOutside={({ start, end }) => {
              if (draggedEvent) {
                const dropped: Event = {
                  ...draggedEvent,
                  start: new Date(draggedEvent?.start),
                  end: new Date(draggedEvent?.end),
                };

                setEvents((prevEvents) =>
                  [...prevEvents, dropped].sort((a, b) => +a.start - +b.start)
                );
                setDraggedEvent(null);
              }
            }}
          />
        </div>

      </div>

      {/* Event Form Modal */}
      <Modal height="48" isOpen={modalOpen || confirmOpen}>
        <div className="space-y-4 font-[Poppins]">
          {modalOpen ? (
            <>
              <div className="flex justify-between font-bold ">
                <div className="align-middle  text-base">   {selectedEvent ? "Update the event?" : "Add New Event?"}</div>
              
                <Button
                  variant="discard"
                  base="discard"
                  className="border-gray-100 border "
                  onClick={() =>setModalOpen(false)}
                >
                  <span><DeleteOutlineIcon/></span>
                  <span className="align-middle">  Discard</span>
                
                </Button>
              </div>
              <Input
                type="text"
                placeholder="Event Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Event Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <Input
                type="datetime-local"
                value={moment(formData.start).format("YYYY-MM-DDTHH:mm")}
                onChange={(e) => setFormData({ ...formData, start: new Date(e.target.value) })}
              />
              <Input
                type="datetime-local"
                value={moment(formData.end).format("YYYY-MM-DDTHH:mm")}
                onChange={(e) => setFormData({ ...formData, end: new Date(e.target.value) })}
              />
              <div className="flex justify-between">
             

                {selectedEvent && (
                  <Button variant="destructive" onClick={handleDelete}>
                    Delete
                  </Button>
                )}

                <Button onClick={handleSave}>
                  {selectedEvent ? "Update" : "Add"} Event
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold">Are you sure?</p>
              <div className="flex justify-end gap-4">
                <Button
                  variant="discard"
                  base="discard"
                  className="border-black border"
                  onClick={() => { setConfirmOpen(false), setModalOpen(true) }}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleConfirmYes}>
                  Yes, Confirm
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>

    </div>
  );
}
