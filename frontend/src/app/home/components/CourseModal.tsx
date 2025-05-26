'use client';

import { useState } from "react";
import Select from "react-select";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  termId: number;
}

const daysOptions = [
  { value: "Monday", label: "Lunes" },
  { value: "Tuesday", label: "Martes" },
  { value: "Wednesday", label: "Miércoles" },
  { value: "Thursday", label: "Jueves" },
  { value: "Friday", label: "Viernes" },
];

const CourseModal = ({ isOpen, onClose, onSubmit, termId }: CourseModalProps) => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    credits: "",
    professor_name: "",
    room: "",
  });

  const [selectedDays, setSelectedDays] = useState<{ value: string; label: string }[]>([]);
  const [schedule, setSchedule] = useState<
    { day_of_week: string; start_time: string; end_time: string }[]
  >([]);

  const handleFormChange = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleScheduleChange = (
    day: string,
    key: "start_time" | "end_time",
    value: string
  ) => {
    setSchedule((prev) =>
      prev.map((slot) =>
        slot.day_of_week === day ? { ...slot, [key]: value } : slot
      )
    );
  };

  const handleDaysChange = (days: any) => {
    setSelectedDays(days);
    const newSchedule = days.map((d: any) => ({
      day_of_week: d.value,
      start_time: "08:00",
      end_time: "10:00",
    }));
    setSchedule(newSchedule);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      credits: Number(form.credits),
      term_id: termId,
      status: "in_progress",
      schedule_slots: schedule.length > 0 ? schedule : undefined,
    };

    console.log("📘 Payload enviado:", payload);
    onSubmit(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#39439f]/20 backdrop-blur-md backdrop-saturate-150 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-8 lg:py-12 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#39439f] mb-6 text-center">
          Añadir curso
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm text-[#1E1E2F]">
          <input
            type="text"
            placeholder="Nombre del curso"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:outline-none focus:ring-2 focus:ring-[#39439f]"
            value={form.name}
            onChange={(e) => handleFormChange("name", e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Código del curso"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:outline-none focus:ring-2 focus:ring-[#39439f]"
            value={form.code}
            onChange={(e) => handleFormChange("code", e.target.value)}
          />
          <input
            type="number"
            placeholder="Créditos"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:outline-none focus:ring-2 focus:ring-[#39439f]"
            value={form.credits}
            onChange={(e) => handleFormChange("credits", parseInt(e.target.value))}
          />
          <input
            type="text"
            placeholder="Profesor"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:outline-none focus:ring-2 focus:ring-[#39439f]"
            value={form.professor_name}
            onChange={(e) => handleFormChange("professor_name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Aula"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E5] focus:outline-none focus:ring-2 focus:ring-[#39439f]"
            value={form.room}
            onChange={(e) => handleFormChange("room", e.target.value)}
          />

          <div className="space-y-3">
            <Select
              isMulti
              options={daysOptions}
              value={selectedDays}
              onChange={handleDaysChange}
              className="text-sm"
            />
            {schedule.map((slot) => (
              <div key={slot.day_of_week} className="flex items-center gap-2">
                <span className="w-24 text-sm">{slot.day_of_week}</span>
                <TimePicker
                  onChange={(val) =>
                    handleScheduleChange(slot.day_of_week, "start_time", val!)
                  }
                  value={slot.start_time}
                  disableClock={true}
                  format="HH:mm"
                  className="border border-[#E0E0E5] rounded-lg px-4 py-2 text-sm"
                />
                <TimePicker
                  onChange={(val) =>
                    handleScheduleChange(slot.day_of_week, "end_time", val!)
                  }
                  value={slot.end_time}
                  disableClock={true}
                  format="HH:mm"
                  className="border border-[#E0E0E5] rounded-lg px-4 py-2 text-sm"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col-reverse lg:flex-row justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-[#39439f] border border-[#39439f] rounded-lg hover:bg-[#f1f1ff]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#39439f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2e336d] font-medium"
            >
              Crear curso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
