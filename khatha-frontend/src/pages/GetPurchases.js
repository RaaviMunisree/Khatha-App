import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import '../styles/GetPurchases.css'; // Ensure this CSS file exists and is linked properly

const GetPurchases = () => {
  const { customerId } = useParams() || {};
  const _id = customerId;
  const [purchases, setPurchases] = useState([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    handlePurchases();
  }, []);

  const handlePurchases = async () => {
    try {
      const res = await api.post('/purchases/getPurchases', { _id });
      setPurchases(res.data || []);
    } catch (err) {
      alert(err?.response?.data?.message || "Error fetching purchases");
    }
  };

  useEffect(() => {
    const total = purchases.reduce((acc, item) => acc + item.cost, 0);
    setSum(total);
  }, [purchases]);

  return (
    <div className="purchases-container">
      {purchases.length > 0 ? (
        <table className="purchases-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.date).toLocaleDateString('en-GB')}</td>
                <td>{item.name}</td>
                <td>₹{item.cost}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="2"><strong>Total</strong></td>
              <td><strong>₹{sum}</strong></td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="no-purchases">No Purchases</p>
      )}
    </div>
  );
};

export default GetPurchases;
