import ConfirmLocation from "@/_components/ConfirmLocation";
import React, { useEffect, useState } from "react";
import SelectDateTime from "@/_components/SelectDateTime";
import VisitingReason from "@/_components/VisitingReason";
import BookingNotForYou from "@/_components/BookingNotForYou";
import { useParams, useNavigate } from "react-router-dom";
import {
  bookSlot,
  getBookedSlots,
  getServicesForBooking,
} from "@/handlers/servicesHandlers";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState({ name: "", id: "" });
  const [category, setCategory] = useState();
  const [service, setService] = useState({ services: [], service: null });
  const [bookedSlots, setBookedSlots] = useState([]);
  const [date, setDate] = useState(); // Initially set to today
  const [time, setTime] = useState();
  const [slot, setSlot] = useState();
  const [loader, setLoader] = useState(false);
  const [openingHours, setOpeningHours] = useState({
    open: "",
    close: "",
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const clickHandler = async () => {
    // Extract hour and minute from slot
    if (!selection || !form || !slot) {
      alert("please confirm details");
      return;
    }
    setLoader(true);
    const hour = parseInt(slot.split(":")[0], 10);
    const minute = parseInt(slot.split(":")[1] || 0, 10);

    // Use the date object and then set hour and minute
    const formattedDate = dayjs(date).hour(hour).minute(minute);
    const endTime = formattedDate.add("1", "hour");
    const data = {
      service: id,
      startTime: formattedDate.format("YYYY-MM-DD HH:mm"),
      endTime: endTime.format("YYYY-MM-DD HH:mm"),
      categories: category,
      price: service.service.price,
      bookingFor: {
        name: form.name,
        email: form.email,
        phone: form.phone,
      },
    };

    try {
      const res = await bookSlot(data);
      if (res) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

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
    <section className=" mt-10 px-8 flex justify-center">
      <div className="flex flex-col items-center gap-4 sm:w-[90vw] md:w-1/2">
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
          slot={slot}
          setSlot={setSlot}
        />
        <BookingNotForYou form={form} setForm={setForm} />
        <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 items-center">
          <Button
            disabled={loader}
            onClick={() => clickHandler()}
            className={`w-fit px-7 bg-blue-600 hover:bg-blue-500 mt-4 `}
          >
            {!loader ? "Confirm Booking" : "Loading..."}
          </Button>
          <span className="mt-4 text-sm px-3 py-1 border-[2px] border-blue-400 rounded-lg">
            ${service.service.price}/Hr
          </span>
        </div>
      </div>
      {/* <img src="map.png" className="w-[25rem] h-[20rem]" alt="Map" /> */}
    </section>
  );
}
