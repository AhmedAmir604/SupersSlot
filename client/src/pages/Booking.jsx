import ConfirmLocation from "@/_components/ConfirmLocation";
import React, { useEffect, useState } from "react";
import SelectDateTime from "@/_components/SelectDateTime";
import VisitingReason from "@/_components/VisitingReason";
import PatientDetails from "@/_components/PatientDetails";
import { useParams, useNavigate } from "react-router-dom";
import { getServicesForBooking } from "@/handlers/servicesHandlers";

export default function Booking() {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState({
    services: [],
    service: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getServicesForBooking(id);
        if (res && res.data) {
          setService({
            services: res.data.serviceTypes,
            service: res.data.service,
          });
        }
      } catch (err) {
        if (err.data.error.statusCode === 401) {
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
      <div className="w-[60%] flex flex-col gap-4">
        <ConfirmLocation
          services={service.services}
          selectedService={service.service}
        />
        <VisitingReason />
        <SelectDateTime />
        <PatientDetails />
      </div>
      <img src="map.png" className="w-[25rem] h-[20rem]" />
    </section>
  );
}
