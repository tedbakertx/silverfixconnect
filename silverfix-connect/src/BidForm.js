import React, { useState } from 'react';

const BidForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    const val = Number(amount);
    if (!Number.isFinite(val) || val <= 0) {
      setErr('Enter a valid positive number.');
      return;
    }
    setBusy(true);
    try {
      await onSubmit(val);
      setAmount(''); // clear on success
    } catch (e) {
      setErr('Failed to place bid. Try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <label style={{ display: 'none' }} htmlFor="bid-amount">Bid amount</label>
      <input
        id="bid-amount"
        type="number"
        min="1"
        step="1"
        placeholder="Bid amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        aria-invalid={!!err}
      />
      <button type="submit" disabled={busy}>Place Bid</button>
      {err && <span role="alert" style={{ color: 'crimson' }}>{err}</span>}
    </form>
  );
};

export default BidForm;