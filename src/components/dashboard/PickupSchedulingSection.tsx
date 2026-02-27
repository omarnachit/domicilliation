"use client";

import { JSX, useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Clock3, QrCode, RefreshCw, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Appointment = {
  id: string;
  date: Date;
  slot: string;
  status: "scheduled" | "canceled";
  qrPayload: string;
};

const slotOptions = ["09:00 - 10:00", "10:30 - 11:30", "12:00 - 13:00", "14:00 - 15:00", "16:00 - 17:00"];

const weekDays = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

export function PickupSchedulingSection(): JSX.Element {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1));
  const [selectedSlot, setSelectedSlot] = useState(slotOptions[1]);
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "pickup-1",
      date: addDays(new Date(), 2),
      slot: "10:30 - 11:30",
      status: "scheduled",
      qrPayload: "PICKUP-2026-0001",
    },
    {
      id: "pickup-2",
      date: addDays(new Date(), 5),
      slot: "14:00 - 15:00",
      status: "scheduled",
      qrPayload: "PICKUP-2026-0002",
    },
  ]);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const upcomingAppointments = useMemo(
    () =>
      appointments
        .filter((item) => item.status === "scheduled" && !isBefore(startOfDay(item.date), startOfDay(new Date())))
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    [appointments]
  );

  const bookPickup = () => {
    const id = `pickup-${Date.now()}`;
    setAppointments((prev) => [
      ...prev,
      {
        id,
        date: selectedDate,
        slot: selectedSlot,
        status: "scheduled",
        qrPayload: `PICKUP-${format(selectedDate, "yyyyMMdd")}-${selectedSlot.replaceAll(" ", "").replaceAll(":", "")}`,
      },
    ]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) => prev.map((item) => (item.id === id ? { ...item, status: "canceled" } : item)));
    if (rescheduleId === id) {
      setRescheduleId(null);
    }
  };

  const startReschedule = (appointment: Appointment) => {
    setRescheduleId(appointment.id);
    setSelectedDate(appointment.date);
    setSelectedSlot(appointment.slot);
  };

  const applyReschedule = (id: string) => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              date: selectedDate,
              slot: selectedSlot,
              qrPayload: `PICKUP-${format(selectedDate, "yyyyMMdd")}-${selectedSlot.replaceAll(" ", "").replaceAll(":", "")}`,
            }
          : item
      )
    );
    setRescheduleId(null);
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Planning & Rendez-vous</h2>
        <p className="text-sm text-zinc-600">Planifiez un retrait, recevez un QR code et gerez vos rendez-vous pickup.</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        <Card className="border-zinc-200 shadow-sm xl:col-span-3">
          <CardHeader className="space-y-3">
            <CardTitle className="flex items-center gap-2 text-zinc-900">
              <Calendar className="h-5 w-5 text-indigo-600" />
              Reserver un creneau de pickup
            </CardTitle>
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => setCurrentMonth((month) => subMonths(month, 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <p className="text-sm font-medium text-zinc-800">{format(currentMonth, "MMMM yyyy")}</p>
              <Button variant="outline" size="sm" onClick={() => setCurrentMonth((month) => addMonths(month, 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-zinc-500">
              {weekDays.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {days.map((day) => {
                const isDisabled = isBefore(startOfDay(day), startOfDay(new Date()));
                const isSelected = isSameDay(day, selectedDate);
                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => !isDisabled && setSelectedDate(day)}
                    disabled={isDisabled}
                    className={`h-10 rounded-md border text-sm transition-colors ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : isSameMonth(day, currentMonth)
                        ? "border-zinc-200 bg-white text-zinc-800 hover:border-indigo-300"
                        : "border-zinc-100 bg-zinc-50 text-zinc-400"
                    } ${isDisabled ? "cursor-not-allowed opacity-40" : ""}`}
                  >
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Date selectionnee</label>
                <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800">
                  {format(selectedDate, "dd MMM yyyy")}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Creneau horaire</label>
                <select
                  value={selectedSlot}
                  onChange={(event) => setSelectedSlot(event.target.value)}
                  className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none focus:border-indigo-500"
                >
                  {slotOptions.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button className="w-full md:w-auto" onClick={bookPickup}>
              Confirmer le pickup
            </Button>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 shadow-sm xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-zinc-900">Rendez-vous a venir</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.length === 0 && (
              <p className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-500">
                Aucun rendez-vous programme pour le moment.
              </p>
            )}

            {upcomingAppointments.map((appointment) => {
              const isEditing = rescheduleId === appointment.id;
              const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=92x92&data=${encodeURIComponent(
                appointment.qrPayload
              )}`;

              return (
                <div key={appointment.id} className="rounded-xl border border-zinc-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{format(appointment.date, "dd MMM yyyy")}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-zinc-600">
                        <Clock3 className="h-3.5 w-3.5" />
                        {appointment.slot}
                      </p>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={qrUrl} alt="QR pickup" className="h-[72px] w-[72px] rounded-md border border-zinc-200" />
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => startReschedule(appointment)}>
                      <RefreshCw className="h-3.5 w-3.5" />
                      Reprogrammer
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => cancelAppointment(appointment.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                      Annuler
                    </Button>
                  </div>

                  {isEditing && (
                    <div className="mt-3 rounded-lg border border-indigo-200 bg-indigo-50 p-3">
                      <p className="mb-2 text-xs font-medium text-indigo-700">Mise a jour du rendez-vous</p>
                      <Button size="sm" onClick={() => applyReschedule(appointment.id)}>
                        Valider la reprogrammation
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-600">
              <p className="flex items-center gap-1 font-medium text-zinc-700">
                <QrCode className="h-4 w-4 text-indigo-600" />
                QR code
              </p>
              Presentez votre QR code a l&apos;accueil pour retirer vos courriers et colis plus rapidement.
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
