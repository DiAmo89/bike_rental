export const accessoriesSpec = {
  "/api/actions-accessory": {
    get: {
      tags: ["Accessories"],
      summary: "Get all accessories (All or by ID)",
      description: "Returns a list of available rental accessories like helmets, locks, etc.",
      parameters: [
        { 
          name: "id", 
          in: "query", 
          required: false, 
          description: "Accessory UUID", 
          schema: { type: "string" } 
        }
      ],
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: { type: "array", items: { $ref: "#/components/schemas/Accessory" } }
            }
          }
        }
      }
    },
    post: {
      tags: ["Accessories"],
      summary: "Add a new accessory",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: { $ref: "#/components/schemas/AccessoryInput" }
          }
        }
      },
      responses: { 201: { description: "Accessory created" } }
    },
    patch: {
      tags: ["Accessories"],
      summary: "Update accessory details",
      parameters: [
        { name: "id", in: "query", required: true, description: "Accessory UUID", schema: { type: "string" } }
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: { $ref: "#/components/schemas/AccessoryInput" }
          }
        }
      },
      responses: { 200: { description: "Accessory updated" } }
    },
    delete: {
      tags: ["Accessories"],
      summary: "Remove accessory",
      parameters: [
        { name: "id", in: "query", required: true, description: "Accessory UUID", schema: { type: "string" } }
      ],
      responses: { 200: { description: "Accessory deleted" } }
    }
  }
};

export const accessoriesSchemas = {
  Accessory: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      price: { type: "string" },
      stock: { type: "integer" },
      description: { type: "string" },
      createdAt: { type: "string", format: "date-time" }
    }
  },
  AccessoryInput: {
    type: "object",
    required: ["name", "price"],
    properties: {
      name: { type: "string", example: "Professional Helmet" },
      price: { type: "string", example: "5.00" },
      stock: { type: "integer", example: 10 },
      description: { type: "string", example: "Size L, safety certified" }
    }
  }
};