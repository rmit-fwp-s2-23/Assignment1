import React from 'react';

function ReservationPopup({ trigger, setTrigger, selectedSessionTime, handleReserveSeats }) {
  const [seats, setSeats] = React.useState(1);

  return (
    trigger && (
      <div className="reservation-popup">
        <div className="reservation-popup-inner">
          <h2>Reserve seats for {selectedSessionTime}</h2>
          <label>
            Number of seats:
            <input 
              type="number" 
              value={seats}
              onChange={e => setSeats(e.target.value)}
            />
          </label>
          <button onClick={() => {
                console.log('Sending to handleReserveSeats:', selectedSessionTime, seats);
                handleReserveSeats(selectedSessionTime, seats);
                setTrigger(false);
            }}>
                Confirm Reservation
            </button>
          <button onClick={() => setTrigger(false)}>Close</button>
        </div>
      </div>
    )
  );
}

export default ReservationPopup;
