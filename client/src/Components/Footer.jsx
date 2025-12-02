export default function Footer() {
  const year = new Date().getFullYear(); 
  return (
    <div
      style={{
        width: "100%",
        marginTop: "60px",
        paddingBottom: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          color: "#888888",
          opacity: 0.8,
          marginBottom: "8px",
        }}
      >
        Built by <span style={{ color: "#F6C644" }}>Rudra</span>
      </div>

      <div
        style={{
          width: "120px",
          height: "1px",
          backgroundColor: "#444444",
          marginBottom: "8px",
        }}
      />

      <div
        style={{
          fontSize: "14px",
          color: "#888888",
          opacity: 0.8,
        }}
      >
        © {year} ApeType. All rights reserved.
      </div>
    </div>
  );
}
