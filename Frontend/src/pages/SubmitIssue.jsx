import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Zap, Trash2, Droplet, AlertTriangle, MoreHorizontal, ArrowLeft, Wrench, AlertCircle } from 'lucide-react';
import './SubmitIssue.css';

const SubmitIssue = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [isUrgent, setIsUrgent] = useState(false);
    const [fileName, setFileName] = useState('No file chosen');
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const categories = [
        { id: 'roads', label: 'Roads & Potholes', icon: MapPin, color: '#d97706', bg: '#fef3c7' },
        { id: 'streetlight', label: 'Streetlights', icon: Zap, color: '#0284c7', bg: '#e0f2fe' },
        { id: 'sanitation', label: 'Sanitation', icon: Trash2, color: '#059669', bg: '#dcfce7' },
        { id: 'water', label: 'Water & Plumbing', icon: Droplet, color: '#2563eb', bg: '#dbeafe' },
        { id: 'vandalism', label: 'Vandalism', icon: AlertTriangle, color: '#dc2626', bg: '#fee2e2' },
        { id: 'public-toilet', label: 'Public Toilet', icon: Wrench, color: '#8b5cf6', bg: '#f3e8ff' },
        { id: 'sweeping', label: 'Sweeping Pending', icon: AlertCircle, color: '#ec4899', bg: '#fce7f3' },
        { id: 'other', label: 'Other', icon: MoreHorizontal, color: '#64748b', bg: '#f1f5f9' },
    ];

    const handleCategorySelect = (id) => {
        setCategory(id);
        setStep(2);
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('No file chosen');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/issues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    category,
                    location,
                    description,
                    isUrgent
                })
            });

            if (res.ok) {
                navigate('/my-reports');
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to submit issue');
            }
        } catch (err) {
            setError('Network error speaking to server');
        }
    };

    if (step === 1) {
        return (
            <div className="page-container animate-fade-in">
                <h1 className="page-title">Report an Issue</h1>
                <p className="step-subtitle">Select the category that best describes your issue:</p>

                <div className="category-grid">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className="category-tile"
                            onClick={() => handleCategorySelect(cat.id)}
                            type="button"
                        >
                            <div className="tile-icon-wrapper" style={{ backgroundColor: cat.bg, color: cat.color }}>
                                <cat.icon size={36} strokeWidth={2.5} />
                            </div>
                            <h3>{cat.label}</h3>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="page-container animate-fade-in">
            <div className="form-header-row">
                <button className="btn-back" onClick={() => setStep(1)} type="button">
                    <ArrowLeft size={20} /> Back
                </button>
                <h1 className="page-title no-border">Issue Details</h1>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    {error && <div style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</div>}

                    <div className="form-group">
                        <label htmlFor="issueTitle" className="form-label">Issue Title:</label>
                        <input type="text" id="issueTitle" className="form-input" placeholder="Enter a descriptive title" value={title} onChange={e => setTitle(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category" className="form-label">Category:</label>
                        <select id="category" className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="roads">Roads & Potholes</option>
                            <option value="streetlight">Streetlight</option>
                            <option value="sanitation">Sanitation</option>
                            <option value="water">Water & Plumbing</option>
                            <option value="vandalism">Vandalism</option>
                            <option value="public-toilet">Public Toilet</option>
                            <option value="sweeping">Sweeping Pending</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="location" className="form-label">Location:</label>
                        <input type="text" id="location" className="form-input" placeholder="Enter Location" value={location} onChange={e => setLocation(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea id="description" className="form-textarea" placeholder="Describe the issue..." value={description} onChange={e => setDescription(e.target.value)} required></textarea>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Attach Image:</label>
                        <div className="file-upload-wrapper">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                accept="image/*"
                            />
                            <button type="button" className="btn-upload" onClick={handleFileClick}>
                                Upload Image
                            </button>
                            <span className="file-name">{fileName}</span>
                        </div>
                    </div>

                    <div className="checkbox-wrapper">
                        <input type="checkbox" id="urgent" className="checkbox-input" checked={isUrgent} onChange={e => setIsUrgent(e.target.checked)} />
                        <label htmlFor="urgent" className="checkbox-label">Mark as Urgent</label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">Submit Report</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitIssue;
