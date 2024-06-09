"use client";
import { SubscriptionModalProvider } from "@/lib/providers/subscription-modal-provider";
import { getActiveProductsWithPrice } from "@/lib/supabase/queries";
import React, { useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: any;
}

const Layout: React.FC<LayoutProps> = ({ children, params }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await getActiveProductsWithPrice();
        if (error) {
          setError(error);
        } else {
          setProducts(data);
        }
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    console.error("Error fetching products:", error);
    return <div>Error loading products</div>;
  }

  return (
    <main className="flex overflow-hidden h-screen">
      <SubscriptionModalProvider products={products}>
        {children}
      </SubscriptionModalProvider>
    </main>
  );
};

export default Layout;
