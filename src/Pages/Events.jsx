import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

function Events() {
  const [regEntry, setRegEntry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("Name");
  const location = useLocation();

  useEffect(() => {
    if (location.state.reg) {
      const data = location.state.reg;
      if (data.length != 0 && data[0]["Team Name"]) {
        setName("Team Name");
      }
      setRegEntry(location.state.reg);
      setIsLoading(false);
    }
  }, []);
  if (!location.state.reg) {
    return (
      <div>
        <div role="alert" className="alert alert-error mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! No Data Provided</span>
        </div>
        <div className="flex justify-center mt-10">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-20 min-h-screen">
        <div className="overflow-x-auto w-[1200px] px-1 sm:px-5 md:px-10 lg:px-14">
          <table className="table table-xs md:table-md bg-base-200">
            {/* head */}
            <thead>
              <tr>
                <th>Time</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Payment Proof</th>
              </tr>
            </thead>
            <tbody>
              {regEntry.map((item) => (
                <tr>
                  <th>{item.Timestamp.split("T")[0]}</th>
                  <td>{item[name]}</td>
                  <td>{item["Phone Number"]}</td>
                  <td>
                    <a
                      href={item.Payment}
                      className="cursor-pointer text-info underline"
                    >
                      Click here
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Events;
