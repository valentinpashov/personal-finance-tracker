import { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useLanguage } from "../LanguageContext";

const ProfilePage = () => {
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const userId = userLocal ? userLocal.id : null;
  const { t } = useLanguage(); 
  
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${userId}`);
        const data = await response.json();
        setUserData(data);
        setNewName(data.username);
      } catch (err) {
        console.error(err.message);
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newName })
      });
      if (response.ok) {
        setUserData({ ...userData, username: newName });
        setIsEditing(false);
      }
    } catch (err) { console.error(err); }
  };

  if (!userData) return <div className="loading-text">Loading...</div>;

  const joinDate = userData.created_at 
    ? new Date(userData.created_at).toLocaleDateString("bg-BG", { year: 'numeric', month: 'long', day: 'numeric' })
    : "Unknown";

  const currentName = isEditing ? newName : userData.username;
  const initials = currentName && currentName.length >= 2 ? currentName.slice(0, 2).toUpperCase() : "US";

  return (
    <div className="profile-page-container">
      <div className="profile-content-card">
        <div className="profile-header">
            <div className="profile-avatar-large"> {initials}</div>
            {isEditing ? (
                <div className="edit-name-container">
                    <input type="text" className="edit-name-input" value={newName} onChange={(e) => setNewName(e.target.value)} autoFocus />
                    <div className="edit-actions">
                        <button onClick={handleSaveClick} className="btn-save">💾 {t.save}</button>
                        <button onClick={() => setIsEditing(false)} className="btn-cancel">❌ {t.cancel}</button>
                    </div>
                </div>
            ) : (
                <div className="name-display-container">
                    <h1 className="profile-title">
                        {userData.username} 
                        <span onClick={() => {setNewName(userData.username); setIsEditing(true);}} className="edit-icon"> ✏️</span>
                    </h1>
                </div>
            )}
            <span className="profile-role">{t.pro_member} 🚀</span>
        </div>

        <div className="profile-info-grid">
            <div className="info-item">
                <span className="info-label">📧 Email</span>
                <span className="info-value">{userData.email}</span>
            </div>
            <div className="info-item">
                <span className="info-label">📅 {t.reg_date}</span>
                <span className="info-value">{joinDate}</span>
            </div>
            <div className="info-item">
                <span className="info-label">🆔 {t.user_id}</span>
                <span className="info-value">#{userId}</span>
            </div>
            <div className="info-item">
                <span className="info-label">🔐 {t.password}</span>
                <span className="info-value">********</span> 
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;