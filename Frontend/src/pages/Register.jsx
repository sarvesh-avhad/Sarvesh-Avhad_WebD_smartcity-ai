import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import './Login.css';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        try {
<<<<<<< HEAD
            const res = await fetch((import.meta.env.VITE_API_BASE_URL || '') + '/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role: 'citizen' })
=======
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
>>>>>>> 603d14ae9636dbd9f8b5c542feca509374fce50f
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
<<<<<<< HEAD
                if (data.user && data.user.role) {
                    localStorage.setItem('userRole', data.user.role);
                }
=======
>>>>>>> 603d14ae9636dbd9f8b5c542feca509374fce50f
                navigate('/add-details');
            } else {
                setError(data.error || 'Registration failed');
            }
<<<<<<< HEAD
        } catch (_err) {
=======
        } catch (err) {
>>>>>>> 603d14ae9636dbd9f8b5c542feca509374fce50f
            setError('Network error syncing with API');
        }
    };

    return (
        <div className="auth-form-inner">
            <h3 className="auth-title">Create an Account</h3>
            <p className="auth-subtitle">Join the UrbanEye platform today</p>

            {error && <div style={{ color: '#ff4b4b', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

            <form onSubmit={handleRegister} className="auth-form">
                <div className="auth-input-group">
                    <label htmlFor="name">Full Name</label>
                    <div className="auth-input-icon-wrapper">
                        <User className="auth-input-icon" size={20} />
                        <input
                            type="text"
                            id="name"
                            placeholder="John Doe"
                            className="auth-input"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="auth-input-group">
                    <label htmlFor="email">Email Address</label>
                    <div className="auth-input-icon-wrapper">
                        <Mail className="auth-input-icon" size={20} />
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            className="auth-input"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="auth-input-group">
                    <label htmlFor="password">Password</label>
                    <div className="auth-input-icon-wrapper">
                        <Lock className="auth-input-icon" size={20} />
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="auth-input"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            minLength="6"
                        />
                    </div>
                </div>

                <button type="submit" className="auth-submit-btn" style={{ marginTop: '1rem' }}>
                    Create Account
                </button>
            </form>

            <div className="auth-footer">
                <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
            </div>
        </div>
    );
};

export default Register;
