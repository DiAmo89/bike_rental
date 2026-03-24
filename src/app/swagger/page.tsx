'use client';

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const spec = {
  openapi: "3.0.0",
  info: {
    title: "Blablabike API Docs 🚲",
    description: "Internal API documentation for managing the bike fleet. Simplified version for developers and QA.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "/",
      description: "Root Server"
    }
  ],
  paths: {
    // 1. ПОЛУЧЕНИЕ ВСЕХ БАЙКОВ 
    "/api/actions-bike/read-all-bikes": {
      get: {
        tags: ["Bikes"],
        summary: "Get all bikes",
        description: "Returns a complete list of bikes from the database. No date filters required.",
        responses: {
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Bike" } }
              }
            }
          }
        }
      }
    },
    // 2. ПОЛУЧЕНИЕ БАЙКА ПО ID
    "/api/actions-bike/read-id-bike": {
      get: {
        tags: ["Bikes"],
        summary: "Get bike by ID",
        parameters: [
          {
            name: "id",
            in: "query",
            required: true,
            description: "The unique identifier of the bike",
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": {
            description: "Bike found",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Bike" } }
            }
          },
          "404": { description: "Bike not found" }
        }
      }
    },
    // 3. ПОЛУЧЕНИЕ КАТЕГОРИЙ
    "/api/categories": {
      get: {
        tags: ["Categories"],
        summary: "Get all categories",
        responses: {
          "200": {
            description: "List of bike categories",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Category" } }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Category: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string", example: "Mountain" },
          description: { type: "string", nullable: true }
        }
      },
      Bike: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          brand: { type: "string", example: "Specialized" },
          model: { type: "string", example: "Rockhopper" },
          pricePerDay: { type: "number", example: 45 },
          image: { type: "string", nullable: true },
          description: { type: "string", nullable: true },
          bikeCategoryId: { type: "string" }
        }
      }
    }
  }
};

export default function SwaggerPage() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8 border-b pb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            API Playground
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Interactive documentation for Blablabike backend services.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <SwaggerUI spec={spec} />
        </div>
      </div>
    </div>
  );
}