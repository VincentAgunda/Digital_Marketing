import React from "react";
import { PaystackButton } from "react-paystack";

const Paystack = ({ email, amount, blogId, onSuccess }) => {
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

  const handleSuccess = () => {
    onSuccess(); // Call the function to mark payment as complete
  };

  const handleClose = () => {
    alert("Payment process was closed. Try again.");
  };

  const paystackProps = {
    email,
    amount: amount * 100, // Paystack requires amount in kobo
    publicKey,
    text: "Pay Now",
    onSuccess: handleSuccess,
    onClose: handleClose,
  };

  return (
    <div className="flex justify-center mt-4">
      <PaystackButton {...paystackProps} className="bg-blue-600 text-white px-4 py-2 rounded-md" />
    </div>
  );
};

export default Paystack;

