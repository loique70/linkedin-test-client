import React, { useState, useEffect } from "react";
import SelectBox from "./SelectBox";
import { fetchSectors, createUser, updateUser } from "../api/users";

interface Sector {
  name: string;
  value: string;
}

const Form: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [terms, setTerms] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchSectors().then((data) => {
      setSectors(data);
    });
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate input data
    if (!name || selectedSectors.length === 0 || !terms) {
      alert("All fields are mandatory");
      return;
    }

    // Store all input data to database
    createUser({
      name,
      sectors: selectedSectors,
      terms,
    }).then((data) => {
      alert("Data saved successfully");
      // Refill the form using stored data
      setName(data.name);
      setSelectedSectors(data.sectors);
      setTerms(data.terms);
      setUserId(data._id); // Set the user ID
    });
  };

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate input data
    if (!name || selectedSectors.length === 0 || !terms) {
      alert("All fields are mandatory");
      return;
    }

    // Update user data in the database
    updateUser(userId, {
      name,
      sectors: selectedSectors,
      terms,
    }).then((data) => {
      alert("Data updated successfully");
      // Refill the form using updated data
      setName(data.name);
      setSelectedSectors(data.sectors);
      setTerms(data.terms);
    });
  };

  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="">
          <div className="mb-6">
            <label
              htmlFor="default-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sectors:
            </label>
            <SelectBox sectors={sectors} setSectors={setSelectedSectors} />
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              required
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300">
              Agree to terms
            </label>
          </div>

          <div className="flex justify-between mt-4 space-x-4">
            <button
              className="inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs 
          font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Save
            </button>

            <button
              onClick={handleUpdate}
              className="inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs 
        font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
