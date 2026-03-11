import { CurrentUser } from "@/types/CurrentUser";

type Props = {
  user: CurrentUser;
};

export default function UserProfileCard({ user }: Props) {
  const initials = user.full_name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-2xl font-semibold text-gray-600">
            {initials}
          </div>

          <div>
            <h2 className="text-xl font-semibold">{user.full_name}</h2>
            <p className="text-gray-500">Member</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
        <div>
          <p className="text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>

        <div>
          <p className="text-gray-500">Phone</p>
          <p className="font-medium">{user.telephone}</p>
        </div>
      </div>
    </div>
  );
}
