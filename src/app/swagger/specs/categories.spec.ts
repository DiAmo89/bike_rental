export const categoriesSpec = {
  "/api/actions-category": {
    get: {
      tags: ["Categories"],
      summary: "Get all bike categories",
      description: "Returns a list of all categories (e.g., Mountain, Road, Electric).",
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: { type: "array", items: { $ref: "#/components/schemas/Category" } }
            }
          }
        }
      }
    },
    post: {
      tags: ["Categories"],
      summary: "Create a new category",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: { $ref: "#/components/schemas/CategoryInput" }
          }
        }
      },
      responses: { 201: { description: "Category created" } }
    },
    patch: {
      tags: ["Categories"],
      summary: "Update category",
      parameters: [
        { name: "id", in: "query", required: true, description: "Category UUID", schema: { type: "string" } }
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: { $ref: "#/components/schemas/CategoryInput" }
          }
        }
      },
      responses: { 200: { description: "Category updated" } }
    },
    delete: {
      tags: ["Categories"],
      summary: "Delete category",
      parameters: [
        { name: "id", in: "query", required: true, description: "Category UUID", schema: { type: "string" } }
      ],
      responses: { 200: { description: "Category deleted" } }
    }
  }
};

export const categoriesSchemas = {
  Category: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      description: { type: "string" },
      createdAt: { type: "string", format: "date-time" }
    }
  },
  CategoryInput: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string", example: "Mountain Bikes" },
      description: { type: "string", example: "Bikes designed for off-road trails and rugged terrain" }
    }
  }
};