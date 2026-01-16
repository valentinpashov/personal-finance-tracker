import { useState, useEffect } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const userId = userLocal ? userLocal.id : null;
  
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

  const handleEditClick = () => {
    setNewName(userData.username);
    setIsEditing(true);
  };

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
      } else {
        alert("Грешка при обновяване на името!");
      }
    } catch (err) {
      console.error(err);
      alert("Сървърна грешка!");
    }
  };

  if (!userData) return <div className="loading-text">Зареждане на профила...</div>;

  const joinDate = userData.created_at 
    ? new Date(userData.created_at).toLocaleDateString("bg-BG", { year: 'numeric', month: 'long', day: 'numeric' })
    : "Неизвестна";

  const currentName = isEditing ? newName : userData.username;
  const initials = currentName && currentName.length >= 2 
    ? currentName.slice(0, 2).toUpperCase() 
    : "US";

  return (
    <div className="profile-page-container">
      <div className="profile-content-card">
        
        {/* Main */}
        <div className="profile-header">
            <div className="profile-avatar-large"> {initials}</div>
            
            
            <span className="profile-role">Pro Member 🚀</span>
        </div>

        {/* User's Info */}
        <div className="profile-info-grid">
            <div className="info-item">
                <span className="info-label">📧 Имейл</span>
                <span className="info-value">{userData.email || "Няма имейл"}</span>
            </div>

            <div className="info-item">
                <span className="info-label">📅 Дата на регистрация</span>
                <span className="info-value">{joinDate}</span>
            </div>

            <div className="info-item">
                <span className="info-label">🆔 Потребителско ID</span>
                <span className="info-value">#{userId}</span>
            </div>
            
            <div className="info-item">
                <span className="info-label">🔐 Парола</span>
                <span className="info-value">********</span> 
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;