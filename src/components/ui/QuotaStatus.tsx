import React, { useEffect, useState } from "react";

export default function QuotaStatus() {
  const [quota, setQuota] = useState<string>("Loading…");

  useEffect(() => {
    fetch("/api/quota")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setQuota(`Error: ${data.error}`);
        } else {
          setQuota(data.message);
        }
      })
      .catch((err) => setQuota(`Fetch error: ${err.message}`));
  }, []);

  return (
    <div className="text-xs font-mono text-stone-400 bg-surface/50 px-3 py-1 rounded-lg mr-2">
      {quota}
    </div>
  );
}
