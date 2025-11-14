import React, { useEffect, useState } from "react";
import PlacementForm from "./PlacementForm";

const PlacementList = () => {
  const [placements, setPlacements] = useState([]);
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch all placements
  const fetchPlacements = async () => {
    try {
      const response = await fetch("http://localhost:8080/placement/getAll");
      const data = await response.json();
      setPlacements(data);
    } catch (error) {
      console.error("Error fetching placements:", error);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  // Delete placement
  const deletePlacement = async (id) => {
    if (window.confirm("Are you sure you want to delete this placement?")) {
      try {
        await fetch(`http://localhost:8080/placement/delete/${id}`, {
          method: "DELETE",
        });
        fetchPlacements();
      } catch (error) {
        console.error("Error deleting placement:", error);
      }
    }
  };

  // Edit placement
  const editPlacement = (placement) => {
    setSelectedPlacement(placement);
    setShowForm(true);
  };

  // Handle form close
  const handleFormClose = () => {
    setShowForm(false);
    setSelectedPlacement(null);
    fetchPlacements();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Placement Management</h1>

      {!showForm && (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowForm(true)}
        >
          Add New Placement
        </button>
      )}

      {showForm ? (
        <PlacementForm
          placement={selectedPlacement}
          onClose={handleFormClose}
        />
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">Student Name</th>
              <th className="border px-3 py-2">College Name</th>
              <th className="border px-3 py-2">Company Name</th>
              <th className="border px-3 py-2">Package</th>
              <th className="border px-3 py-2">Job Role</th>
              <th className="border px-3 py-2">Placement Date</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {placements.map((placement) => (
              <tr key={placement.placementId}>
                <td className="border px-3 py-2">{placement.placementId}</td>
                <td className="border px-3 py-2">{placement.studentName}</td>
                <td className="border px-3 py-2">{placement.collegeName}</td>
                <td className="border px-3 py-2">{placement.companyName}</td>
                <td className="border px-3 py-2">{placement.packageOffered}</td>
                <td className="border px-3 py-2">{placement.jobRole}</td>
                <td className="border px-3 py-2">{placement.placementDate}</td>
                <td className="border px-3 py-2 space-x-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => editPlacement(placement)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => deletePlacement(placement.placementId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {placements.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No placement records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlacementList;
