import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

type Room = {
  floor: number;
  roomNumber: number;
  position: number;
  isAvailable: boolean;
};

export default function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [count, setCount] = useState(1);
  const [error, setError] = useState<string | null>(null);

const fetchRooms = async () => {
  try {
    setError(null);

    const res = await axios.get(`${API_URL}/hotel/rooms`);

    // SAFETY CHECK
    if (Array.isArray(res.data)) {
      setRooms(res.data);
    } else if (Array.isArray(res.data.data)) {
      setRooms(res.data.data);
    } else {
      setRooms([]);
    }

  } catch (err) {
    setError("Unable to fetch rooms. Is backend running?");
    setRooms([]);
  }
};



  useEffect(() => {
    fetchRooms();
  }, []);

  const bookRooms = async () => {
    await axios.post(`${API_URL}/hotel/book`, { count });
    fetchRooms();
  };

  const randomize = async () => {
    await axios.post(`${API_URL}/hotel/randomize`);
    fetchRooms();
  };

  const reset = async () => {
    await axios.post(`${API_URL}/hotel/reset`);
    fetchRooms();
  };

  // group rooms by floor
  const grouped = rooms.reduce<Record<number, Room[]>>((acc, room) => {
    acc[room.floor] = acc[room.floor] || [];
    acc[room.floor].push(room);
    return acc;
  }, {});


  return (
    <div className="app">
      <header className="header">
        <h1>Hotel Room Reservation</h1>
      </header>

      <div className="controls">
        <input
          type="number"
          min="1"
          max="5"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button className="btn primary" onClick={bookRooms}>
          Book Rooms
        </button>
        <button className="btn warning" onClick={reset}>
          Reset
        </button>
        <button className="btn secondary" onClick={randomize}>
          Random
        </button>
      </div>
{error && <div className="error">{error}</div>}

      <div className="legend">
        <span className="available">Available</span>
        <span className="booked">Booked</span>
      </div>

<div className="floors-wrapper">
  <div className="floors">
    {Object.entries(grouped)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([floor, rooms]) => (
        <div key={floor} className="floor-row">
          <div className="floor-label">Floor {floor}</div>

          <div className="rooms">
            {rooms
              .sort((a, b) => a.position - b.position)
              .map((room) => (
                <div
                  key={room.roomNumber}
                  className={`room ${
                    room.isAvailable ? "available" : "booked"
                  }`}
                >
                  {room.roomNumber}
                </div>
              ))}
          </div>
        </div>
      ))}
  </div>
</div>

    </div>
  );
}
