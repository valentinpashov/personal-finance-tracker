import { useState, useEffect } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const userId = userLocal ? userLocal.id : null;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${userId}`);
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  if (!userData) return <div className="loading-text">Зареждане на профила...</div>;

  const joinDate = userData.created_at 
    ? new Date(userData.created_at).toLocaleDateString("bg-BG", { year: 'numeric', month: 'long', day: 'numeric' })
    : "Неизвестна";

  const initials = userData.username ? userData.username.slice(0, 2).toUpperCase() : "US";

  return (
    <div className="profile-page-container">
      <div className="profile-content-card">
        
        

      </div>
    </div>
  );
};

export default ProfilePage;