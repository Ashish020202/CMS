import React from 'react';

const PaymentSection: React.FC = () => {
  const paymentDetails = {
    discount: {
      amount: 2560,
      currency: '₹',
      message: 'you are saving this',
    },
    formFields: {
      cardNo: {
        label: 'Card Number *',
        placeholder: 'XXXX XXXX XXXX XXXX',
        maxLength: 16,
        error: 'Please enter your card number',
      },
      expiryMonth: {
        label: 'Expiration date *',
        placeholder: 'Month',
        maxLength: 2,
        error: 'Please enter your card expiration month',
      },
      expiryYear: {
        placeholder: 'Year',
        maxLength: 4,
        error: 'Please enter your card expiration year',
      },
      cvv: {
        label: 'CVV / CVC *',
        placeholder: 'xxx',
        maxLength: 3,
        error: 'Please enter your card CVV number',
      },
      cardHolderName: {
        label: 'Name on Card *',
        placeholder: 'Enter card holder name',
        error: 'Please enter card holder name',
      },
    },
    acceptedCards: [
      { type: 'Visa', image: 'path/to/visa.svg' },
      { type: 'MasterCard', image: 'path/to/mastercard.svg' },
      { type: 'Express Card', image: 'path/to/expresscard.svg' },
    ],
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
      
      <p className="text-green-600 mb-4">
        {paymentDetails.discount.currency} {paymentDetails.discount.amount} - {paymentDetails.discount.message}
      </p>

      <form className="space-y-6">
        {/* Card Number */}
        <div>
          <label className="block font-semibold">{paymentDetails.formFields.cardNo.label}</label>
          <input
            type="text"
            placeholder={paymentDetails.formFields.cardNo.placeholder}
            maxLength={paymentDetails.formFields.cardNo.maxLength}
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{paymentDetails.formFields.cardNo.error}</p>
        </div>

        {/* Expiration Date */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block font-semibold">{paymentDetails.formFields.expiryMonth.label}</label>
            <input
              type="text"
              placeholder={paymentDetails.formFields.expiryMonth.placeholder}
              maxLength={paymentDetails.formFields.expiryMonth.maxLength}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500 text-sm">{paymentDetails.formFields.expiryMonth.error}</p>
          </div>
          <div className="w-1/2">
            <label className="block font-semibold">&nbsp;</label>
            <input
              type="text"
              placeholder={paymentDetails.formFields.expiryYear.placeholder}
              maxLength={paymentDetails.formFields.expiryYear.maxLength}
              className="w-full p-2 border rounded"
            />
            <p className="text-red-500 text-sm">{paymentDetails.formFields.expiryYear.error}</p>
          </div>
        </div>

        {/* CVV */}
        <div>
          <label className="block font-semibold">{paymentDetails.formFields.cvv.label}</label>
          <input
            type="text"
            placeholder={paymentDetails.formFields.cvv.placeholder}
            maxLength={paymentDetails.formFields.cvv.maxLength}
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{paymentDetails.formFields.cvv.error}</p>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block font-semibold">{paymentDetails.formFields.cardHolderName.label}</label>
          <input
            type="text"
            placeholder={paymentDetails.formFields.cardHolderName.placeholder}
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{paymentDetails.formFields.cardHolderName.error}</p>
        </div>

        {/* Accepted Cards */}
        <div className="mt-6 flex space-x-4">
          {paymentDetails.acceptedCards.map((card, index) => (
            <img key={index} src={card.image} alt={card.type} className="w-12 h-auto" />
          ))}
        </div>

        <button type="submit" className="w-full mt-4 bg-blue-600 text-white py-2 rounded">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentSection;
