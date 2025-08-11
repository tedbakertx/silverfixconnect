import React, { useState, useEffect } from 'react';
import { useRole, useUser } from './RoleContext';
import { db } from './firebase';
import { collection, query, getDocs, updateDoc, doc, Timestamp, addDoc } from 'firebase/firestore';
import './WorkRequestCard.css';
import BidForm from './BidForm'; // Import the new component

const WorkRequestCard = () => {
  const { role } = useRole();
  const { userId } = useUser();
  const [workRequests, setWorkRequests] = useState([]);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('dueDate'); // Default sort by due date

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const workRequestsQuery = query(collection(db, 'workRequests'));
        const workRequestsSnapshot = await getDocs(workRequestsQuery);
        let requests = workRequestsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        requests = requests.sort((a, b) => {
          if (sortBy === 'dueDate' && a.dueDate instanceof Timestamp && b.dueDate instanceof Timestamp) {
            return a.dueDate.toDate() - b.dueDate.toDate();
          }
          if (sortBy === 'priority') {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          }
          return 0;
        });

        const bidsQuery = query(collection(db, 'bids'));
        const bidsSnapshot = await getDocs(bidsQuery);
        const allBids = bidsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setWorkRequests(requests);
        setBids(allBids);
        console.log('Data fetched successfully');
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please check your Firestore setup.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortBy]);

  const handleEdit = async (id, newStatus) => {
    try {
      const requestRef = doc(db, 'workRequests', id);
      await updateDoc(requestRef, { status: newStatus });
      setWorkRequests(prev =>
        prev.map(request =>
          request.id === id ? { ...request, status: newStatus } : request
        )
      );
      console.log('Work request updated successfully');
    } catch (error) {
      console.error('Error updating work request:', error);
    }
  };

  const handleBid = async (workRequestId, bidAmount) => {
    const amount = Number(bidAmount);
    if (!Number.isFinite(amount) || amount <= 0) return;
    try {
      await addDoc(collection(db, 'bids'), {
        workRequestId,
        userId,
        bidAmount: amount,
        bidDate: Timestamp.fromDate(new Date())
      });
      const snap = await getDocs(query(collection(db, 'bids')));
      setBids(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  const formatDueDate = (dueDate) => {
    if (dueDate instanceof Timestamp) {
      return dueDate.toDate().toLocaleDateString();
    }
    return dueDate;
  };

  if (loading) return <div>Loading work requests...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="work-request-card">
      <h1>Work Request Dashboard</h1>
      <div>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      {role === 'admin' ? (
        <div>
          <h2>Admin View</h2>
          <p>Manage work requests here.</p>
          {workRequests.length === 0 ? (
            <p>No work requests available. Please add some in Firestore.</p>
          ) : (
            <ul>
              {workRequests.map((request) => {
                const requestBids = bids.filter(bid => bid.workRequestId === request.id);
                return (
                  <li key={request.id}>
                    <div>
                      <strong>Title:</strong> {request.title}
                    </div>
                    <div>
                      <strong>Description:</strong> {request.description}
                    </div>
                    <div>
                      <strong>Due Date:</strong> {formatDueDate(request.dueDate)}
                    </div>
                    <div>
                      <strong>Assigned To:</strong> {request.assignedTo}
                    </div>
                    <div>
                      <strong>Priority:</strong> {request.priority}
                    </div>
                    <div>
                      <strong>Status:</strong> 
                      <select
                        value={request.status}
                        onChange={(e) => handleEdit(request.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                    <div>
                      <strong>Bids:</strong>
                      <ul>
                        {requestBids.map(bid => (
                          <li key={bid.id}>
                            User {bid.userId} bid ${bid.bidAmount}
                            {bid.bidDate?.toDate ? ` on ${bid.bidDate.toDate().toLocaleDateString()}` : ''}
                          </li>
                        ))}
                      </ul>
                      <BidForm onSubmit={(amount) => handleBid(request.id, amount)} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : (
        <div>
          <h2>User View</h2>
          <p>View your work requests.</p>
          {workRequests.length === 0 ? (
            <p>No work requests available. Please add some in Firestore.</p>
          ) : (
            <ul>
              {workRequests.map((request) => {
                const requestBids = bids.filter(bid => bid.workRequestId === request.id);
                return (
                  <li key={request.id}>
                    <div>
                      <strong>Title:</strong> {request.title}
                    </div>
                    <div>
                      <strong>Description:</strong> {request.description}
                    </div>
                    <div>
                      <strong>Due Date:</strong> {formatDueDate(request.dueDate)}
                    </div>
                    <div>
                      <strong>Assigned To:</strong> {request.assignedTo}
                    </div>
                    <div>
                      <strong>Priority:</strong> {request.priority}
                    </div>
                    <div>
                      <strong>Status:</strong> {request.status}
                    </div>
                    <div>
                      <strong>Bids:</strong>
                      <ul>
                        {requestBids.map(bid => (
                          <li key={bid.id}>
                            User {bid.userId} bid ${bid.bidAmount}
                            {bid.bidDate?.toDate ? ` on ${bid.bidDate.toDate().toLocaleDateString()}` : ''}
                          </li>
                        ))}
                      </ul>
                      <BidForm onSubmit={(amount) => handleBid(request.id, amount)} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkRequestCard;