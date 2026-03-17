import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MapRestrictedToIndia from "../components/MapRestrictedToIndia"; // ✅ India map
import axiosInstance from "../api/axiosInstance";
import { auth } from "../firebase";

const ReportIssue = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const categoryFromState = location.state?.category || "";
  const [category, setCategory] = useState(categoryFromState);
  const [description, setDescription] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [position, setPosition] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Auto-fetch user location (no Jharkhand restriction)
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // ✅ Directly set anywhere in India (no bounds check)
        setPosition({ lat: latitude, lng: longitude });
      },
      () => {
        setError("Unable to retrieve your location");
      }
    );
  }, []);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
    }
  };

  const handleSubmit = async () => {
    setError("");
    if (!category) {
      setError("Please select a category");
      return;
    }
    if (!description.trim()) {
      setError("Please enter description");
      return;
    }
    if (!position) {
      setError("Location not set");
      return;
    }
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("user_id", auth.currentUser?.uid);
      formData.append("phone", auth.currentUser?.phoneNumber);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("lat", position.lat);
      formData.append("lng", position.lng);
      formData.append("timestamp", new Date().toISOString());
      if (mediaFile) {
        formData.append("media", mediaFile);
      }

      await axiosInstance.post("/api/reports/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Report submitted successfully");
      navigate("/my-reports");
    } catch (err) {
      setError("Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-white flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Report Issue</h2>

      <label className="mb-2 font-medium">Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        <option value="">Select Category</option>
        <option value="garbage">Garbage</option>
        <option value="road">Road</option>
        <option value="water">Water</option>
        <option value="streetlight">Streetlight</option>
        <option value="illegal_mining">Illegal Mining</option>
        <option value="water_scarcity">Water Scarcity</option>
      </select>

      <label className="mb-2 font-medium">Description</label>
      <textarea
        rows="4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded mb-4"
        placeholder="Describe the issue..."
      />

      <label className="mb-2 font-medium">Upload Image/Video</label>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleMediaChange}
        className="mb-4"
      />

      <label className="mb-2 font-medium">Location (Tap on map to change)</label>
      <MapRestrictedToIndia position={position} onPositionChange={setPosition} />

      {error && <p className="text-red-600 mt-2">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Report"}
      </button>
    </div>
  );
};

export default ReportIssue;
