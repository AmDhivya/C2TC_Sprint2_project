import React, { useState, useEffect } from "react";

const PlacementForm = ({ placement, onClose }) => {
  const [formData, setFormData] = useState({
    placementId: "",
    studentName: "",
    collegeName: "",
    companyName: "",
    packageOffered: "",
    jobRole: "",
    placementDate: "",
  });

  useEffect(() => {
    if (placement) {
      setFormData(placement);
    }
  }, [placement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = placement ? "PUT" : "POST";
      const url = placement
        ? "http://localhost:8080/placement/update"
        : "http://localhost:8080/placement/add";

      await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      alert(placement ? "Placement updated!" : "Placement added!");
      onClose();
    } catch (error) {
      console.error("Error saving placement:", error);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md bg-gray-50">
      <h2 className="text-xl font-bold mb-4">
        {placement ? "Edit Placement" : "Add New Placement"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="number"
          name="placementId"
          placeholder="Placement ID"
          value={formData.placementId}
          onChange={handleChange}
          className="border p-2 w-full"
          required
          disabled={!!placement}
        />

        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={formData.studentName}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          type="text"
          name="collegeName"
          placeholder="College Name"
          value={formData.collegeName}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          type="number"
          step="0.01"
          name="packageOffered"
          placeholder="Package Offered (LPA)"
          value={formData.packageOffered}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          type="text"
          name="jobRole"
          placeholder="Job Role"
          value={formData.jobRole}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          type="date"
          name="placementDate"
          placeholder="Placement Date"
          value={formData.placementDate}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {placement ? "Update" : "Add"}
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlacementForm;