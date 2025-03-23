import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addshift = () => {
    const seats = [...Array(60)].map((_, i) => `S${i + 1}`);
    const navigate = useNavigate();

    const [shift, setShift] = useState("morning");
    const [seat, setSeat] = useState("");
    const [timing, setTiming] = useState("7:00 AM - 12:00 PM");

    const handleSeatSelection = (selectedSeat) => {
        setSeat(selectedSeat);
    };

    const handleLcation = (e) => {
        e.preventDefault();

        const existingData = JSON.parse(localStorage.getItem("studentData")) || {};

        localStorage.setItem("studentData", JSON.stringify({ ...existingData, shift, seat, timing }));

        navigate("/addNewStudent");
    };


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex flex-col items-center space-y-6 bg-white p-6 rounded shadow-lg">
                <div className="flex justify-between w-full space-x-6">
                    <fieldset className="border border-gray-500 w-[40%] p-4 rounded">
                        <legend className="text-sm font-bold">Shift</legend>
                        <select
                            name="shift"
                            id="shift"
                            value={shift}
                            onChange={(e) => setShift(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="evening">Evening</option>
                            <option value="night">Night</option>
                            <option value="reserved">Reserved</option>
                        </select>
                    </fieldset>

                    <fieldset className="border border-gray-500 w-[40%] p-4 rounded">
                        <legend className="text-sm font-bold">Timing</legend>
                        <select
                            name="timing"
                            id="timing"
                            value={timing}
                            onChange={(e) => setTiming(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            <option value="7:00 AM - 12:00 PM">7:00 AM - 12:00 PM</option>
                            <option value="12:00 PM - 4:00 PM">12:00 PM - 4:00 PM</option>
                            <option value="4:00 PM - 8:00 PM">4:00 PM - 8:00 PM</option>
                            <option value="8:00 PM - 11:00 PM">8:00 PM - 11:00 PM</option>
                            <option value="Full Time">Full Time</option>
                        </select>
                    </fieldset>
                </div>

                <button
                    type="button"
                    className="w-[80%] bg-green-600 text-white p-3 rounded hover:bg-blue-700 transition font-bold focus:bg-red-500"
                    onClick={handleLcation}
                >
                    Next: Add Student
                </button>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {seats.map((seatItem, index) => (
                    <button
                        key={index}
                        className={`${
                            seat === seatItem ? "bg-red-400 ring-4 ring-yellow-500" : "bg-green-500"
                        } hover:bg-green-800 text-white font-medium p-5 text-xl rounded`}
                        onClick={() => handleSeatSelection(seatItem)}
                    >
                        {seatItem}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Addshift;