import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MapPin, Building2, Users } from 'lucide-react';
import './Login.css';

const AddDetails = () => {
    const navigate = useNavigate();
    const [mobile, setMobile] = useState('+91 ');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);

    const handleComplete = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/auth/details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ mobile, district, city, role })
            });
            const data = await res.json();

            if (res.ok) {
                navigate('/dashboard');
            } else {
                setError(data.error || 'Failed to update details');
            }
        } catch (err) {
            setError('Network error syncing with API');
        }
    };

    return (
        <div className="auth-form-inner">
            <h3 className="auth-title">Complete Your Profile</h3>
            <p className="auth-subtitle">Just a few more details before we start</p>

            {error && <div style={{ color: '#ff4b4b', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

            <form onSubmit={handleComplete} className="auth-form">
                <div className="auth-input-group">
                    <label htmlFor="mobile">Mobile Number</label>
                    <div className="auth-input-icon-wrapper">
                        <Phone className="auth-input-icon" size={20} />
                        <input
                            type="tel"
                            id="mobile"
                            placeholder="+91 9876543210"
                            className="auth-input"
                            value={mobile}
                            onChange={e => setMobile(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="auth-input-group">
                    <label htmlFor="district">District</label>
                    <div className="auth-input-icon-wrapper">
                        <MapPin className="auth-input-icon" size={20} />
                        <input
                            type="text"
                            id="district"
                            placeholder="Enter your district"
                            className="auth-input"
                            value={district}
                            onChange={e => setDistrict(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="auth-input-group">
                    <label htmlFor="city">City</label>
                    <div className="auth-input-icon-wrapper">
                        <Building2 className="auth-input-icon" size={20} />
                        <input
                            type="text"
                            id="city"
                            placeholder="Enter your city"
                            className="auth-input"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="auth-input-group">
                    <label htmlFor="userType">Type of User</label>
                    <div className="auth-input-icon-wrapper">
                        <Users className="auth-input-icon" size={20} />
                        <select
                            id="userType"
                            className="auth-input"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            required
                            style={{ appearance: 'none' }}
                        >
                            <option value="" disabled>Select user type</option>
                            <option value="citizen">Citizen</option>
                            <option value="ngo">NGO Representative</option>
                            <option value="government">Government Official</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="auth-submit-btn" style={{ marginTop: '1rem' }}>
                    Continue to Dashboard
                </button>
            </form>
        </div>
    );
};

export default AddDetails;
