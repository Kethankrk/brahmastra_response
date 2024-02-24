import React from "react";
import { useNavigate } from "react-router-dom";

function EventCard({ title, count, reg }) {
  const navigate = useNavigate();
  return (
    <div className="card w-72 bg-base-300 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-primary">{title}</h2>
        <p>
          Total registration:{" "}
          <span className="text-lg font-semibold">{count}</span>
        </p>
        <div className="card-actions justify-start">
          <button
            className="btn btn-outline btn-sm btn-info"
            onClick={() => navigate("/event", { state: { reg, name: title } })}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
