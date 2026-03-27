import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

const AuthLayout = () => {
    return (
        <div className="auth-layout">
            {/* Background visual elements */}
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>

            <main className="auth-container">
                <div className="auth-brand">
                    <h2>SmartCity</h2>
                    <p>Login to access the citizen platform</p>
                </div>
                <div className="auth-form-wrapper">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AuthLayout;
