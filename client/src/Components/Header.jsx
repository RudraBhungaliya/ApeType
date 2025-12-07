export default function Header({ user, onSignIn, onSignOut }) {
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

      <div>
        {user ? (
          <img
            src={user.user_metadata.avatar_url}
            alt="profile"
            onClick={onSignOut}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              cursor: "pointer",
              border: "2px solid #F6C644",
            }}
          />
        ) : (
          <div
            onClick={onSignIn}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#333",
              cursor: "pointer",
              border: "2px solid #F6C644",
            }}
          ></div>
        )}
      </div>
    </div>
  );
}
