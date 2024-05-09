import React, { useState } from "react";
import Calendar from "react-calendar";
import "./ReservationForm.css";
import "react-calendar/dist/Calendar.css";

function ReservationForm() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [reservedSlots, setReservedSlots] = useState([]);
    const [selectedSlots, setSelectedSlots] = useState([]);

    const handleDateChange = (date) => {
        const selectedDateString = selectedDate
            ? selectedDate.toDateString()
            : null;
        const newDateString = date ? date.toDateString() : null;

        if (selectedDateString === newDateString) {
            setSelectedDate(null);
        } else {
            setSelectedDate(date);
            fetchReservedSlots(date);
            setSelectedSlots([]);
        }
    };

    const fetchReservedSlots = (date) => {
        const fakeReservedSlots = [
            { time: "12:00 PM", reserved: true },
            { time: "1:00 PM", reserved: false },
            { time: "2:00 PM", reserved: true },
        ];
        setReservedSlots(fakeReservedSlots);
    };

    const handleTimeSlotClick = (time) => {
        const isReserved = reservedSlots.some(
            (slot) => slot.time === time && slot.reserved
        );
        const isSelected = selectedSlots.includes(time);
        if (!isReserved & !isSelected) {
            setSelectedSlots([...selectedSlots, time]);
        } else if (!isReserved & isSelected) {
            setSelectedSlots(selectedSlots.filter((item) => item !== time));
        }
    };

    const handleReservationSubmit = (event) => {
        // Handle form submission logic here
        event.preventDefault();
        setSelectedSlots([]);
    };
    console.log(selectedSlots);
    return (
        <div className="Sample">
            <header>
                <h1>Andar</h1>
            </header>
            <div className="Sample__container">
                <main className="Sample__container__content">
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                    />
                    {selectedDate && (
                        <div className="TimeSlots">
                            {Array.from({ length: 13 }, (_, i) => i + 11).map(
                                (hour) => {
                                    const time = `${hour % 12 || 12}:00 ${
                                        hour >= 12 ? "PM" : "AM"
                                    }`;
                                    const isReserved = reservedSlots.some(
                                        (slot) =>
                                            slot.time === time && slot.reserved
                                    );

                                    const isSelected =
                                        selectedSlots.includes(time);
                                    return (
                                        <div
                                            key={time}
                                            className={`TimeSlot ${
                                                isReserved
                                                    ? "reserved"
                                                    : isSelected
                                                    ? "selected"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleTimeSlotClick(time)
                                            }
                                        >
                                            <div className="TimeSlot__text">
                                                {time}
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    )}
                    {selectedDate && (
                        <div className="ReservationForm">
                            <form onSubmit={handleReservationSubmit}>
                                <input type="text" placeholder="이름" />
                                <input type="text" placeholder="단체명" />
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default ReservationForm;
