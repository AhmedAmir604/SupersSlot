import ConfirmLocation from "@/_components/ConfirmLocation";
import React, { useEffect, useState } from "react";
import SelectDateTime from "@/_components/SelectDateTime";
import VisitingReason from "@/_components/VisitingReason";
import PatientDetails from "@/_components/PatientDetails";
import { useParams, useNavigate } from "react-router-dom";
import {
  getBookedSlots,
  getServicesForBooking,
} from "@/handlers/servicesHandlers";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState({ name: "", id: "" });
  const [category, setCategory] = useState();
  const [service, setService] = useState({ services: [], service: null });
  const [bookedSlots, setBookedSlots] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Initially set to today
  const [time, setTime] = useState();
  const [openingHours, setOpeningHours] = useState({
    open: "",
    close: "",
  });

  useEffect(() => {
    (async () => {
      try {
        // Fetch services for booking
        const res = await getServicesForBooking(id);
        if (res?.data?.service) {
          setService({
            services: res.data.serviceTypes || [],
            service: res.data.service,
          });
          setSelection({
            name: res.data.service.name || "",
            id: res.data.service._id || "",
          });
          setTime(res.data.service.time);
          const day = res.data.service.openingHours.split(":")[0].split("-");
          setOpeningHours({
            open: day[0],
            close: day[1],
          });
        }
      } catch (err) {
        if (err?.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full px-20 mt-10 flex justify-around">
      <div className="flex flex-col gap-4">
        <ConfirmLocation
          services={service.services}
          service={service.service}
          selection={selection}
          setSelection={setSelection}
        />
        {service.service?.categories && (
          <VisitingReason
            categories={service.service.categories}
            category={category}
            setCategory={setCategory}
          />
        )}
        <SelectDateTime
          id={id} // Pass the id to SelectDateTime
          bookedSlots={bookedSlots}
          setBookedSlots={setBookedSlots}
          date={date}
          setDate={setDate}
          time={time}
          openingHours={openingHours}
        />
        <PatientDetails />
      </div>
      {/* <img src="map.png" className="w-[25rem] h-[20rem]" alt="Map" /> */}
    </section>
  );
}
