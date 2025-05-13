import React, { useState } from "react";
import axios from "axios";
import "./ExportPage.css"; // (Optional: for spinner styling)

export default function ExportPage() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/export`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const fileName = `LeetCode_Export_${new Date().toISOString().split("T")[0]}.xlsx`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      alert("✅ Export successful!");
    } catch (error) {
      console.error("Export failed:", error);
      alert("❌ Export failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="export-page">
      <h2>📤 Export LeetCode Stats</h2>
      <button onClick={handleExport} disabled={loading} className="export-button">
        {loading ? "⏳ Exporting..." : "Download Excel"}
      </button>
    </div>
  );
}
