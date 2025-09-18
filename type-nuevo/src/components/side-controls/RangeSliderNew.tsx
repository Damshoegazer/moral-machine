'use client';

import { useState } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  label: string;
  onChange?: (value: number) => void;
}

const RangeSliderNew: React.FC<SliderProps> = ({ 
  min, 
  max, 
  step = 1, 
  label, 
  onChange 
}) => {
  const [value, setValue] = useState(min);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="w-full">
      <label 
        htmlFor={`slider-${label}`} 
        className="block text-sm font-medium text-white mb-2"
      >
        {label}: {value}
      </label>
      <input
        id={`slider-${label}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default RangeSliderNew;