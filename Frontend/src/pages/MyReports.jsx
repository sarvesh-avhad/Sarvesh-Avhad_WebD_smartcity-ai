import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import './MyReports.css';

const MyReports = () => {
    const [filter, setFilter] = useState('all');
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:5000/api/issues/my-reports', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setReports(data);
                }
            } catch (error) {
                console.error('Error fetching reports:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const filterOptions = [
        { label: 'All', value: 'all' },
        { label: 'Pending', value: 'pending' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Resolved', value: 'resolved' },
    ];

    const filteredReports = reports.filter(r => {
        if (filter === 'all') return true;
        if (filter === 'pending' && r.status === 'Pending') return true;
        if (filter === 'in-progress' && r.status === 'In Progress') return true;
        if (filter === 'resolved' && (r.status === 'Resolved' || r.status === 'Rejected')) return true;
        return false;
    });

    return (
        <div className="page-container animate-fade-in">
            <h1 className="page-title">My Reports</h1>

            <div className="filter-bar">
                {filterOptions.map(option => (
                    <button
                        key={option.value}
                        className={`filter-btn ${filter === option.value ? 'active' : ''}`}
                        onClick={() => setFilter(option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <div className="reports-container">
                <div className="table-container">
                    {loading ? (
                        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>Loading reports...</p>
                    ) : filteredReports.length === 0 ? (
                        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>No reports found.</p>
                    ) : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Issue Details</th>
                                    <th>Date Reported</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th>Upvotes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReports.map((report) => (
                                    <tr key={report._id}>
                                        <td>
                                            <strong>{report.title}</strong>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>{report.category}</div>
                                        </td>
                                        <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                                        <td>{report.location}</td>
                                        <td>
                                            <span className={`status-badge ${report.status.toLowerCase().replace(' ', '-')}`}>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td>{report.upvotes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyReports;
