import { useSocket } from '../../hooks/useSocket';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useCinemas } from '../../hooks/useCinemas';
import { setMovie } from '../../store/slices/movieSlice';
import {
  addSeat,
  clearSelectedSeats,
  removeSeat,
  setUserName,
} from '../../store/slices/userSlice';
import Timer from '../components/Timer';

export default function Home() {
  const { socket, emit } = useSocket();
  const { isPending, error } = useCinemas();

  const [selectedMovie, setSelectedMovie] = useState(null);
  const dispatch = useAppDispatch();
  const [holdStartTime, setHoldStartTime] = useState<number | null>(null);

  const cinema = useAppSelector((state) => state.cinema);
  const selectedMovieTimeIndex = useAppSelector(
    (store) => store.movie.selectedMovie?.selectedTimeIndex
  );
  const [inputName, setInputName] = useState('');

  const selectedSeats = useAppSelector((store) => store.user.selectedSeats);
  const name = useAppSelector((store) => store.user.name);

  useEffect(() => {
    if (!holdStartTime) setHoldStartTime(Date.now());
  }, [holdStartTime]);

  useEffect(() => {
    if (selectedSeats.length === 0) return;

    const timeout = setTimeout(() => {
      dispatch(clearSelectedSeats());
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearTimeout(timeout); // clear if component unmounts or user reselects
  }, [selectedSeats.length, dispatch]);

  useEffect(() => {
    socket.emit('send-message', { message: 'Hello from user!' });
  }, [emit, socket]);


  function holdSeat(e, seatId, seatNumber) {
    e.preventDefault();

    const isAlreadySelected = selectedSeats.some((seat) => seat.id === seatId);

    if (isAlreadySelected) {
      dispatch(removeSeat(seatId));
    } else {
      if (selectedSeats.length >= 4) return;
      dispatch(addSeat({ id: seatId, number: seatNumber }));
    }
  }

  function handleSetName() {
    const trimmed = inputName.trim();
    if (trimmed) {
      dispatch(setUserName(trimmed));
    } else {
      alert('Please enter a valid name');
    }
  }

  if (!name)
    return (
      <div className="p-4 bg-white rounded shadow border mb-4 max-w-sm">
        <label htmlFor="name-input" className="block font-medium mb-2">
          Enter your name to continue:
        </label>
        <input
          id="name-input"
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="e.g. Itay"
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleSetName}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Set Name
        </button>
      </div>
    );

  if (isPending) return <p>Loading cinema...</p>;
  if (error) return <p>Error loading cinema.</p>;

  async function handleMovieClick(e, id) {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/movies/${id}`);
      if (!res.ok) throw new Error('Failed to fetch movie');

      const movie = await res.json();

      setSelectedMovie(movie);
    } catch (err) {
      console.error('❌ Error fetching movie:', err.message);
    }
  }

  async function handleReservation(e) {
    if (!selectedMovie || selectedMovieTimeIndex === null) return;

    try {
      const res = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId: selectedMovie._id,
          timeIndex: selectedMovieTimeIndex,
          seats: selectedSeats,
          reservedBy: name,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.code === 'SEAT_TAKEN' && result.seatId) {
          alert(`❌ Seat is already reserved.\nSeat number: ${result.seatId}`);
        } else {
          alert(`❌ Reservation failed: ${result.message}`);
        }
        return;
      }

      dispatch(clearSelectedSeats());
      alert('🎉 Reservation confirmed!');
      const updatedSeats = selectedMovie.times[
        selectedMovieTimeIndex
      ].seats.map((seat) => {
        const match = selectedSeats.find((s) => s.id === seat._id);
        if (match) {
          return {
            ...seat,
            status: 'reserved',
            reservedBy: name,
            reservedUntil: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          };
        }
        return seat;
      });

      const updatedMovie = {
        ...selectedMovie,
        times: selectedMovie?.times?.map((time, i) =>
          i === selectedMovieTimeIndex ? { ...time, seats: updatedSeats } : time
        ),
      };

      setSelectedMovie(updatedMovie);
    } catch (err) {
      console.error('❌ Network/Unhandled error:', err);
      alert('⚠️ Something went wrong. Please try again later.');
    }
  }

  return (
    <section className="grow grid sm:grid-cols-4 gap-2 grid-rows-4 sm:grid-rows-1">
      <div className="row-span-1 sm:col-span-1 bg-red-100 p-2">
        <div className="bg-white rounded p-2 text-sm shadow border">
          <h3 className="font-semibold mb-1">🎟️ Your Seats</h3>
          {selectedSeats.length > 0 ? (
            <ul className="space-y-1">
              {selectedSeats.map((seat) => (
                <li key={seat.id} className="text-blue-700">
                  Seat #{seat.number}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You haven’t selected any seats yet.</p>
          )}
          {selectedSeats.length >= 4 && (
            <p>You can select a maximum of 4 seats.</p>
          )}
          {selectedSeats.length > 0 && holdStartTime && (
            <Timer startTimestamp={holdStartTime} />
          )}
        </div>
      </div>

      <div className="row-span-3 sm:row-span-1 sm:col-span-3 bg-gray-300 p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-2">Now Showing at {cinema.name}</h2>
        <div className="overflow-y-auto max-h-72 space-y-2 border rounded bg-white p-2">
          {cinema.movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-blue-100 px-3 py-2 rounded shadow text-sm cursor-pointer"
              onClick={(e) => handleMovieClick(e, movie.id)}
            >
              <button>🎬 {movie.title}</button>
            </div>
          ))}
        </div>
        {selectedMovie && (
          <div className="mt-4 p-3 bg-white rounded shadow border space-y-2">
            <h3 className="text-lg font-semibold mb-1">
              Select a screening time for:
              <span className="text-blue-600">{selectedMovie.title}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedMovie.times?.map((slot) => (
                <button
                  key={slot._id}
                  className="bg-blue-200 hover:bg-blue-300 text-sm px-3 py-1 rounded"
                  onClick={() =>
                    dispatch(
                      setMovie({
                        ...selectedMovie,
                        selectedTimeIndex: slot.index,
                      })
                    )
                  }
                >
                  {new Date(slot.time).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedMovie && selectedMovieTimeIndex !== null && (
          <>
            <div className="mt-4 p-3 bg-white rounded shadow border">
              <h3 className="text-md font-semibold mb-2">Available Seats</h3>
              <div className="grid grid-cols-10 gap-2 text-sm">
                {selectedMovie.times[selectedMovieTimeIndex]?.seats?.map(
                  (seat) => {
                    const isSelected = selectedSeats.some(
                      (s) => s.id === seat._id
                    );
                    const isReservedByUser = seat.reservedBy === name;

                    let bgColor = 'bg-white';
                    let cursor = 'cursor-pointer';

                    if (seat.status === 'reserved') {
                      if (isReservedByUser) {
                        bgColor = 'bg-green-300';
                      } else {
                        bgColor = 'bg-red-300';
                        cursor = 'cursor-not-allowed';
                      }
                    }

                    return (
                      <div
                        key={seat._id}
                        onClick={(e) =>
                          seat.status === 'available'
                            ? holdSeat(e, seat._id, seat.number)
                            : null
                        }
                        className={`px-2 py-1 border rounded text-center text-sm ${bgColor} ${cursor} ${
                          isSelected ? 'ring-2 ring-blue-500' : ''
                        }`}
                      >
                        {seat.number}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            {selectedSeats.length > 0 ? (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
                onClick={handleReservation}
              >
                🎟️ Make Reservation
              </button>
            ) : (
              <p className="text-gray-500 text-sm italic">No seats selected.</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
