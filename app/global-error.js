"use client";
import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";
import { useEffect, useState } from "react";

export default function GlobalError({ error, reset }) {

  const [message, setMessage] = useState(null);

  useEffect(() => {
    setMessage(message);
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <h2>Global  Page Router</h2>
        <ErrorDisplay message={message} reset={reset} />
      </body>
    </html>
  );
}
