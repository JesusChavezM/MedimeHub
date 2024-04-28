import React, { FC, useState } from "react";
import ReactCalendar from "react-calendar";
import { add, format } from "date-fns";
import Image from "next/image";
import ImgConfirm from "../assets/img_confirm.svg";
import ImgCancel from "../assets/img_delete.svg";

interface CalendarProps {
    onDateTimeSelect?: (dateTime: Date) => void;
}

interface DateType {
    justDate: Date | null;
    dateTime: Date | null;
}

const Calendar: FC<CalendarProps> = ({ onDateTimeSelect }) => {
    const [date, setDate] = useState<DateType>({
        justDate: null,
        dateTime: null,
    });
    const [appointmentBooked, setAppointmentBooked] = useState(false);

    const getTimes = () => {
        if (!date.justDate) return;
        const { justDate } = date;
        const beginning = add(justDate, { hours: 8 });
        const end = add(justDate, { hours: 19 });
        const interval = 30;
        const times = [];
        for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
            times.push(i);
        }
        return times;
    };
    const times = getTimes();

    const handleTimeSelect = (time: Date) => {
        setDate((prev) => ({ ...prev, dateTime: time }));
        if (onDateTimeSelect) {
            onDateTimeSelect(time);
        }
        setAppointmentBooked(true);
    };

    const handleCancel = () => {
        setAppointmentBooked(false);
    };

    const handleBack = () => {
        setDate((prev) => ({ ...prev, justDate: null }));
    };

    return (
        <div className="flex items-center justify-center h-full">
            {appointmentBooked ? (
                <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-200 rounded-2xl border border-800">
                    <Image src={ImgConfirm} width={96} height={96} alt="Confirm" />
                    <span className="text-lg font-bold mt-2">Cita Agendada</span>
                    <button onClick={handleCancel} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Cambiar la hora</button>
                </div>
            ) : date.justDate ? (
                <div className="p-4 bg-200 rounded-2xl border border-800">
                    <span className="text-lg font-bold mb-2 block">Seleccione una Hora:</span>
                    <div className="grid grid-cols-4 gap-4">
                        {times?.map((time, i) => (
                            <div key={`time-${i}`}>
                                <button type="button" className="rounded-full bg-gray-50 p-2 border border-950 w-full text-center text-blue-600 font-semibold hover:text-200 hover:bg-500" onClick={() => handleTimeSelect(time)}>
                                    {format(time, "kk:mm")}
                                </button>
                            </div>
                        ))}
                        <button onClick={handleBack} className="flex items-center justify-center rounded-full bg-red-200 p-2 border border-950 w-full hover:bg-500">
                            <Image
                                src={ImgCancel}
                                width={24}
                                height={24}
                                alt="Back"
                            />
                        </button>

                    </div>
                </div>
            ) : (
                <ReactCalendar
                    minDate={new Date()}
                    className="REACT-CALENDAR p-2"
                    view="month"
                    onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
                />
            )}
        </div>
    );
};

export default Calendar;
