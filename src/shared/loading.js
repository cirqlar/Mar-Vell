import React, { useState, useEffect } from 'react';

export default function Loading() {
  const [loading, setLoading] = useState("...");

  useEffect(() => {
    const timeout = setTimeout(() => {
      let length = loading.length;
      if (loading.length >= 3) length = 0;
      const newL = "...".substr(0, length + 1);
      setLoading(newL);
    }, 300);
    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <div style={{ 
      "gridColumn": "1 / -1", 
      "textAlign": "center", 
      width: "100%", 
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      Loading{loading}
    </div>
  );
}