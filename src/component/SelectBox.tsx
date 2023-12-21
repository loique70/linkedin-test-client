// SelectBox.tsx
import React, { useEffect, useState } from "react";
import { fetchSectors } from "../api/sectors";
import { toast } from "react-toastify";

interface Sector {
  name: string;
  value: string;
}

interface SelectBoxProps {
  sectors: Sector[];
  setSectors: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectBox: React.FC<SelectBoxProps> = ({ setSectors }) => {
  const [options, setOptions] = useState<Sector[]>([]);

  useEffect(() => {
    fetchSectors().then((data) => {
      setOptions(data);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.selectedOptions.length > 5) {
      toast.error("You could choose 5 options only.");
      event.target.selectedOptions[5].selected = false;
    }
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSectors(selectedOptions);
  };

  return (
    <select
      multiple
      size={5}
      required
      onChange={handleChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
