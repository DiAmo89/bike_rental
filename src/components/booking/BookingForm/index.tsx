"use client";

import { RentalPeriod } from "./components/RentalPeriod";
import { ContactInfo } from "./components/ContactInfo";
import { AdditionalOptions } from "./components/AdditionalOptions";

// src/components/booking/BookingForm/index.tsx
export default function BookingForm({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  options,
  setOptions,
  dbAccessories,
  contactData,
  setContactData,
  errors,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  return (
    <div className="space-y-6">
      <RentalPeriod
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <ContactInfo
        contactData={contactData}
        setContactData={setContactData}
        errors={errors}
      />

      <AdditionalOptions
        options={options}
        setOptions={setOptions}
        dbAccessories={dbAccessories}
      />
    </div>
  );
}
