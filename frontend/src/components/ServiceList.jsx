import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "./common/ServiceCard";

export default function ServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/services/services")
      .then((res) => {
        setServices(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch services");
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>{error}</p>;

  return (
<>      {services.map((item) => (
        <ServiceCard
          key={item.id}
          image={`http://localhost:3000/uploads/${item.service_img}`}
          title={item.service_name}
          description={item.service_description}
        />
      ))}
</>

  );
}
