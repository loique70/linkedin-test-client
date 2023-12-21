import React, { useState, useEffect } from "react";
import SelectBox from "./SelectBox";
import { fetchSectors, createUser, updateUser } from "../api/users";
import { toast } from "react-toastify";

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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [sectorsError, setSectorsError] = useState<boolean>(false);
  const [termsError, setTermsError] = useState<boolean>(false);

  useEffect(() => {
    fetchSectors().then((data) => {
      setSectors(data);
    });
  }, []);

  const handleEdit = () => {
    // fill form with actual user data
    setName(name);
    setSelectedSectors(selectedSectors);
    setTerms(terms);

    // Set edition
    setIsEditing(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Ensure selectedSectors contains only unique values
    const uniqueSectors = Array.from(new Set(selectedSectors));

    // Validate input data
    let nameError = false;
    let sectorsError = false;
    let termsError = false;

    if (!name) {
      nameError = true;
    }
    if (selectedSectors.length === 0) {
      sectorsError = true;
    }
    if (!terms) {
      termsError = true;
    }

    // Update error states
    setNameError(nameError);
    setSectorsError(sectorsError);
    setTermsError(termsError);

    // Only create a new user if there are no errors
    if (!nameError && !sectorsError && !termsError) {
      createUser({
        name,
        sectors: uniqueSectors,
        terms,
      }).then((data) => {
        toast.success("Data saved successfully");
        setUserId(data._id); // Set the user ID
      });
    }
  };

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate input data
    if (!name || selectedSectors.length === 0 || !terms) {
      toast.error("All fields are mandatory");
      return;
    }

    // Update user data in the database
    updateUser(userId, {
      name,
      sectors: selectedSectors,
      terms,
    }).then((data) => {
      // Refill the form using updated data
      setName(data.name);
      setSelectedSectors(data.sectors);
      setTerms(data.terms);
      setIsEditing(false);
      toast.success("Data updated successfully");
    });
  };

  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                nameError ? "border-red-500" : "border-gray-300"
              }`}
            />

            {nameError && (
              <p className="text-red-500 text-xs">This field is mandatory.</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sectors:
            </label>
            <SelectBox sectors={sectors} setSectors={setSelectedSectors} />
            {sectorsError && (
              <p className="text-red-500 text-md mt-2 ">
                This field is mandatory.
              </p>
            )}
          </div>

          <div className="flex items-center mb-6">
            <div className="">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                required
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                className={`ms-2 text-md font-medium text-gray-900 dark:text-gray-300 ${
                  nameError ? "border-red-500" : "border-gray-300"
                }`}
              >
                Agree to terms
              </label>
              {termsError && (
                <p className="text-red-500 text-md mt-2 ">
                  This field is mandatory.
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-6 space-x-4">
            <button
              className="inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-md 
              font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Save
            </button>
          </div>
        </form>
        <div className="flex justify-end mt-4 space-x-4">
          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-md 
      font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-md 
      font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
