import { MapPin } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const issues = [
        { id: 1, title: 'Pothole on Main St', category: 'Roads', status: 'Pending', priority: 'High' },
        { id: 2, title: 'Broken Streetlight', category: 'Electricity', status: 'Resolved', priority: 'Low' },
        { id: 3, title: 'Garbage Dumping', category: 'Sanitation', status: 'Pending', priority: 'Medium' },
    ];

    const feedback = [
        "The pothole on Main St is getting bigger.",
        "Streetlights on 5th avenue are out again.",
        "Great job fixing the park bench!"
    ];

    const announcements = [
        "Water supply maintenance this weekend.",
        "New recycling bins deployed downtown.",
        "Town hall meeting on Thursday."
    ];

    return (
        <div className="page-container animate-fade-in">
            <h1 className="page-title">Citizen Dashboard</h1>

            <div className="dashboard-grid">
                {/* Top Stats */}
                <div className="stats-container">
                    <div className="stat-card">
                        <span className="stat-title">Total Reports</span>
                        <span className="stat-value">120</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Pending Issues</span>
                        <span className="stat-value">15</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-title">Resolved Issues</span>
                        <span className="stat-value">85</span>
                    </div>
                </div>

                {/* Issue Overview */}
                <div className="overview-section">
                    <div className="section-header">
                        <h2 className="section-title">Issue Overview</h2>
                        <select className="filter-select" aria-label="Filter by Category">
                            <option value="">Filter by Category</option>
                            <option value="roads">Roads</option>
                            <option value="electricity">Electricity</option>
                            <option value="sanitation">Sanitation</option>
                        </select>
                    </div>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Issue</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                </tr>
                            </thead>
                            <tbody>
                                {issues.map(issue => (
                                    <tr key={issue.id}>
                                        <td>{issue.title}</td>
                                        <td>{issue.category}</td>
                                        <td>
                                            <span className={`status-badge ${issue.status.toLowerCase()}`}>
                                                {issue.status}
                                            </span>
                                        </td>
                                        <td>{issue.priority}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Map View Placeholder */}
                <div className="map-section">
                    <h2 className="section-title">Map View</h2>
                    <div className="map-placeholder">
                        <MapPin className="map-pin" size={32} style={{ top: '30%', left: '40%' }} />
                        <MapPin className="map-pin" size={32} style={{ top: '60%', left: '20%' }} />
                        <MapPin className="map-pin" size={32} style={{ top: '45%', left: '70%' }} />
                    </div>
                </div>

                {/* Feedback Section */}
                <div className="feedback-section">
                    <h2 className="section-title" style={{ marginBottom: '1rem' }}>Recent Feedback</h2>
                    <ul>
                        {feedback.map((item, idx) => (
                            <li key={idx} className="list-item">
                                <span className="list-item-text">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Announcements Section */}
                <div className="announcements-section">
                    <h2 className="section-title" style={{ marginBottom: '1rem' }}>Announcements</h2>
                    <ul>
                        {announcements.map((item, idx) => (
                            <li key={idx} className="list-item">
                                <span className="list-item-text">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
