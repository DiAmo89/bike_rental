"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { bookingsSpec, bookingsSchemas } from "./specs/bookings.spec";
import { bikesSpec, bikesSchemas } from "./specs/bikes.spec";
import { categoriesSpec, categoriesSchemas } from "./specs/categories.spec";
import { accessoriesSpec, accessoriesSchemas } from "./specs/accessories.spec";

export default function AdminSwaggerPage() {
  const fullSpec = {
    openapi: "3.0.0",
    info: {
      title: "Bike Rental Management System",
      version: "1.0.0",
      description: "Unified API Console for Fleet, Categories, Accessories, and Bookings",
    },
   
    paths: {
      
      ...accessoriesSpec,
      ...bikesSpec,
      ...bookingsSpec,
      ...categoriesSpec,
      
    },
    
    components: {
      schemas: {
        ...accessoriesSchemas,
        ...bikesSchemas,
        ...bookingsSchemas,
        ...categoriesSchemas,
        
      }
    }
  };

  return (
    <main style={{ 
      padding: "20px", 
      backgroundColor: "#f8f9fa", 
      minHeight: "100vh",
      fontFamily: "sans-serif"
    }}>
     
      <header style={{ 
        marginBottom: "10px", 
        marginTop: "60px", 
        borderBottom: "2px solid #eaeaea", 
        paddingBottom: "10px" 
      }}>
        <h1 style={{ fontSize: "32px", color: "#1a1a1a", margin: "0" }}>
          Fleet Control Center
        </h1>
        <p style={{ color: "#666", marginTop: "8px", fontSize: "16px" }}>
          Full administrative access to rental system database.
        </p>
      </header>
           
      <div style={{ 
        backgroundColor: "#fff", 
        borderRadius: "16px", 
        overflow: "hidden", 
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        border: "1px solid #eee"
      }}>
        <SwaggerUI spec={fullSpec} />
      </div>
    </main>
  );
}