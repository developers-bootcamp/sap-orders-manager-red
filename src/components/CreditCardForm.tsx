import React, { useState } from 'react';

const CreditCardForm = () => {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = () => {
    // e.preventDefault();
    console.log('מספר כרטיס האשראי:', creditCardNumber);
    console.log('תאריך תפוגה:', expirationDate);
    console.log('CVV:', cvv);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        מספר כרטיס האשראי:
        <input
          type="text"
          value={creditCardNumber}
          onChange={(e) => setCreditCardNumber(e.target.value)}
        />
      </label>
      <br />
      <label>
        תאריך תפוגה:
        <input
          type="text"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
      </label>
      <br />
      <label>
        CVV:
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">שמור</button>
    </form>
  );
};

export default CreditCardForm;