// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ContactInfo = ({ contactData, setContactData, errors }: any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactData(e);
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={contactData?.firstName || ""}
            onChange={handleChange}
            className={`w-full rounded-lg border p-3 bg-zinc-50/50 outline-none transition-all ${
              errors?.firstName
                ? "border-red-500 ring-1 ring-red-500"
                : "border-zinc-300 focus:ring-2 focus:ring-[#e6ff2a]"
            }`}
          />
          {errors?.firstName && (
            <p className="text-[10px] text-red-500 ml-1 italic">
              {errors.firstName[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={contactData?.lastName || ""}
            onChange={handleChange}
            className={`w-full rounded-lg border p-3 bg-zinc-50/50 outline-none transition-all ${
              errors?.lastName
                ? "border-red-500 ring-1 ring-red-500"
                : "border-zinc-300 focus:ring-2 focus:ring-[#e6ff2a]"
            }`}
          />
          {errors?.lastName && (
            <p className="text-[10px] text-red-500 ml-1 italic">
              {errors.lastName[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={contactData?.email || ""}
            onChange={handleChange}
            className={`w-full rounded-lg border p-3 bg-zinc-50/50 outline-none transition-all ${
              errors?.email
                ? "border-red-500 ring-1 ring-red-500"
                : "border-zinc-300 focus:ring-2 focus:ring-[#e6ff2a]"
            }`}
          />
          {errors?.email && (
            <p className="text-[10px] text-red-500 ml-1 italic">
              {errors.email[0]}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={contactData?.phone || ""}
            onChange={handleChange}
            className={`w-full rounded-lg border p-3 bg-zinc-50/50 outline-none transition-all ${
              errors?.phone
                ? "border-red-500 ring-1 ring-red-500"
                : "border-zinc-300 focus:ring-2 focus:ring-[#e6ff2a]"
            }`}
          />
          {errors?.phone && (
            <p className="text-[10px] text-red-500 ml-1 italic">
              {errors.phone[0]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
