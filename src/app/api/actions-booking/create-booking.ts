// "use server";

// import { bookings } from "@/db/tables/bookings";
// import { bikes } from "@/db/tables/bikes";
// import { users } from "@/db/tables/users";
// import { db } from "@/db/db";
// import { eq } from "drizzle-orm";
// import { getServerSession } from "next-auth";

// import { revalidatePath } from "next/cache";
// import { authOptions } from "@/lib/auth/auth-options";

// export default async function createBooking(formData: FormData) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) throw new Error("Unauthorized!");

//   const user = await db
//     .select()
//     .from(users)
//     .where(eq(users.email, session.user.email))
//     .limit(1);
//   if (!user[0]) throw new Error("User not found!");

//   const bikeId = formData.get("bike_id") as string;
//   const startDate = formData.get("start_date") as string;
//   const endDate = formData.get("end_date") as string;

//   if (new Date(startDate) >= new Date(endDate)) {
//     throw new Error("Start date must be before end date!");
//   }

//   const bike = await db
//     .select()
//     .from(bikes)
//     .where(eq(bikes.id, bikeId))
//     .limit(1);
//   if (!bike[0]) throw new Error("Bike not found!");

//   const days =
//     (new Date(endDate).getTime() - new Date(startDate).getTime()) /
//     (1000 * 60 * 60 * 24);

//   const totalPrice = (parseFloat(bike[0].pricePerDay) * days).toFixed(2);

//   await db.insert(bookings).values({
//     userId: user[0].id,
//     bikeId,
//     startDate,
//     endDate,
//     totalPrice,
//   });

//   revalidatePath("/bookings");
// }
