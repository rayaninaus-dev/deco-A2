import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import DatePicker from "../components/DatePicker";

const Appointment: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const appointmentTypes = [
    { value: "individual", label: t("appointment.individual") },
    { value: "group", label: t("appointment.group") },
    { value: "family", label: t("appointment.family") },
    { value: "crisis", label: t("appointment.crisis") }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime && selectedType) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{t("appointment.confirmed")}</h2>
          <p className="text-gray-600 mb-4">{t("appointment.confirmationMessage")}</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
            <p className="text-sm text-gray-700"><strong>{t("appointment.date")}:</strong> {selectedDate}</p>
            <p className="text-sm text-gray-700"><strong>{t("appointment.time")}:</strong> {selectedTime}</p>
            <p className="text-sm text-gray-700"><strong>{t("appointment.type")}:</strong> {appointmentTypes.find(t => t.value === selectedType)?.label}</p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            {t("appointment.backToHome")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">{t("appointment.title")}</h1>
          <button
            onClick={() => window.history.back()}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("appointment.selectDate")}
            </label>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("appointment.selectTime")}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-3 text-sm rounded-lg border ${
                    selectedTime === time
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Appointment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("appointment.selectType")}
            </label>
            <div className="space-y-2">
              {appointmentTypes.map((type) => (
                <label key={type.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="appointmentType"
                    value={type.value}
                    checked={selectedType === type.value}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="ml-3 text-sm text-gray-700">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("appointment.additionalNotes")}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("appointment.notesPlaceholder")}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedDate || !selectedTime || !selectedType}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("appointment.schedule")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
