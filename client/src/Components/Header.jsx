import { useState, useMemo } from "react";

const defaultAvatar = "/assets/default-avatar.jpeg";

export default function Header({ user, onSignIn, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const avatarUrl = useMemo(() => {
    return (
      user?.user_metadata?.picture ||
      user?.user_metadata?.avatar_url ||
      defaultAvatar
    );
  }, [user]);

  const handleAvatarClick = () => {
    if (!user) return onSignIn();
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    onSignOut();
    setMenuOpen(false);
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "20px 40px",
        backgroundColor: "#141414",
        color: "#F6C644",
        fontFamily: "monospace",
        fontSize: "clamp(24px, 4vw, 36px)",
        fontWeight: "bold",
        letterSpacing: "2px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "48px" }} />

      <div>
        Ape<span style={{ color: "#ffffff" }}>Type</span>
      </div>

      <div style={{ position: "relative" }}>
        <button
          onClick={handleAvatarClick}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "#333",
            border: "2px solid #F6C644",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <img
            src={avatarUrl}
            alt="avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultAvatar;
            }}
          />
        </button>

        {menuOpen && user && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "60px",
              background: "#2c2f33",
              border: "1px solid #444",
              borderRadius: "8px",
              minWidth: "120px",
              overflow: "hidden",
              boxShadow: "0 0 8px rgba(0,0,0,0.4)",
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "10px 14px",
                textAlign: "left",
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#3a3d42")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
