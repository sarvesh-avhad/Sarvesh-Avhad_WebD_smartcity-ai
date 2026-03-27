import { User } from 'lucide-react';
import './Profile.css';

const Profile = () => {
    return (
        <div className="page-container animate-fade-in">
            <h1 className="page-title">My Profile</h1>

            <div className="profile-layout">
                <div className="profile-avatar-section">
                    <div className="avatar-circle">
                        <User size={100} strokeWidth={1} />
                    </div>
                </div>

                <div className="profile-form-section">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" id="name" className="form-input" defaultValue="John Doe" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" className="form-input" defaultValue="johndoe@example.com" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
                            <div className="input-with-button">
                                <input type="tel" id="phone" className="form-input" defaultValue="555-123-4567" />
                                <button type="button" className="btn-edit">Edit</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" id="address" className="form-input" defaultValue="123 Main St, Springfield, IL" />
                        </div>

                        <button type="button" className="btn-save">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
