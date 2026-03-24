export const bookingsSpec = {
  "/api/actions-booking": {
    get: {
      tags: ["Bookings"],
      summary: "Get bookings (Filter by User, ID or All)",
      description: "Default returns nothing. Use 'mode=all' for admin list, 'userId' for user history, or 'id' for a single record.",
      parameters: [
        { name: "mode", in: "query", schema: { type: "string", enum: ["all"] } },
        { name: "userId", in: "query", schema: { type: "string" } },
        { name: "id", in: "query", schema: { type: "string" } }
      ],
      responses: { 200: { description: "Success" } }
    },
    post: {
      tags: ["Bookings"],
      summary: "Create a new booking",
      requestBody: {
        content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/BookingInput" } } }
      },
      responses: { 201: { description: "Created" } }
    },
    patch: {
      tags: ["Bookings"],
      summary: "Update existing booking",
      parameters: [{ name: "id", in: "query", required: true, schema: { type: "string" } }],
      requestBody: {
        content: { "multipart/form-data": { schema: { $ref: "#/components/schemas/BookingInput" } } }
      },
      responses: { 200: { description: "Updated" } }
    },
    delete: {
      tags: ["Bookings"],
      summary: "Delete booking",
      parameters: [{ name: "id", in: "query", required: true, schema: { type: "string" } }],
      responses: { 200: { description: "Deleted" } }
    }
  }
};

export const bookingsSchemas = {
  Booking: {
    type: "object",
    properties: {
      id: { type: "string" },
      userId: { type: "string" },
      bikeId: { type: "string" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string" },
      phone: { type: "string" },
      startDate: { type: "string" },
      endDate: { type: "string" },
      totalPrice: { type: "string" }
    }
  },
  BookingInput: {
    type: "object",
    required: ["userId", "bikeId", "firstName", "lastName", "email", "phone", "startDate", "endDate", "totalPrice"],
    properties: {
      userId: { type: "string", example: "user-uuid" },
      bikeId: { type: "string", example: "bike-uuid" },
      firstName: { type: "string", example: "John" },
      lastName: { type: "string", example: "Doe" },
      email: { type: "string", example: "john@example.com" },
      phone: { type: "string", example: "+123456789" },
      startDate: { type: "string", example: "2026-05-01" },
      endDate: { type: "string", example: "2026-05-10" },
      totalPrice: { type: "string", example: "150.00" }
    }
  }
};