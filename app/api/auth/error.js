"use client";
import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";
import { useEffect, useState } from "react";

export default function Error({ error, reset }) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setMessage(message);
    console.error(error);
  }, [error]);

  return (
    <>
      <h3>Something went wrong during authentication</h3>
      {/* <ErrorDisplay message={message} reset={reset} /> */}
    </>
  );
}


