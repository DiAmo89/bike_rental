export const bikesSpec = {
  "/api/actions-bike": {
    get: {
      tags: ["Bikes"],
      summary: "Get bikes (All, by ID or Category ID)",
      description: "Returns a list of all bikes or a specific bike if ID is provided.",
      parameters: [
        { 
          name: "id", 
          in: "query", 
          required: false, 
          description: "Bike UUID", 
          schema: { type: "string" } 
        },
        { 
          name: "categoryId", 
          in: "query", 
          required: false, 
          description: "Filter bikes by category UUID", 
          schema: { type: "string" } 
        }
      ],
      responses: { 
        200: { 
          description: "Success",
          content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Bike" } } } }
        } 
      }
    },
    post: {
      tags: ["Bikes"],
      summary: "Add a new bike to fleet",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: { $ref: "#/components/schemas/BikeInput" }
          }
        }
      },
      responses: { 201: { description: "Bike created successfully" } }
    },
    patch: {
      tags: ["Bikes"],
      summary: "Update bike details",
      parameters: [
        { name: "id", in: "query", required: true, description: "Bike UUID", schema: { type: "string" } }
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: { $ref: "#/components/schemas/BikeInput" }
          }
        }
      },
      responses: { 200: { description: "Bike updated successfully" } }
    },
    delete: {
      tags: ["Bikes"],
      summary: "Remove bike from fleet",
      parameters: [
        { name: "id", in: "query", required: true, description: "Bike UUID", schema: { type: "string" } }
      ],
      responses: { 200: { description: "Bike deleted successfully" } }
    }
  }
};

export const bikesSchemas = {
  Bike: {
    type: "object",
    properties: {
      id: { type: "string" },
      brand: { type: "string" },
      model: { type: "string" },
      pricePerHour: { type: "string" },
      status: { type: "string", enum: ["available", "rented", "maintenance"] },
      categoryId: { type: "string" },
      imageUrl: { type: "string" },
      createdAt: { type: "string", format: "date-time" }
    }
  },
  BikeInput: {
    type: "object",
    required: ["brand", "model", "pricePerHour", "categoryId"],
    properties: {
      brand: { type: "string", example: "Specialized" },
      model: { type: "string", example: "Rockhopper Elite" },
      pricePerHour: { type: "string", example: "15.50" },
      categoryId: { type: "string", example: "category-uuid-here" },
      status: { type: "string", enum: ["available", "rented", "maintenance"], default: "available" },
      description: { type: "string", example: "Excellent mountain bike for trails" },
      imageUrl: { type: "string", example: "https://example.com/bike.jpg" }
    }
  }
};