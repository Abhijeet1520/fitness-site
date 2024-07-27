// StripeProvider.tsx
import React, { useState, useEffect, ReactNode } from "react";
import { Appearance, loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./payment.css";
import { useParams } from "react-router-dom";
import { createPaymentIntent } from "@services/apiService";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface StripeProviderProps {
  children: ReactNode;
}

const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  const [clientSecret, setClientSecret] = useState<string | undefined>(undefined);
  const courseID = useParams().courseID;

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        if (courseID) {
          const data = await createPaymentIntent(courseID);
          setClientSecret(data.clientSecret);
        }
      } catch (error) {
        console.error("Error creating PaymentIntent:", error);
      }
    };

    fetchPaymentIntent();
  }, [courseID]);

  const appearance: Appearance = {
    theme: "stripe",
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {children}
        </Elements>
      )}
    </div>
  );
};

export default StripeProvider;
