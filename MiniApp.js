import React, { useState, useEffect } from "react";

// Loading animation component with spinning trophy icon
const LoadingIcon = () => (
  <div style={{ textAlign: "center", margin: 30 }}>
    <span
      style={{ fontSize: 50, animation: "spin 2s linear infinite", display: "inline-block" }}
      role="img"
      aria-label="trophy"
    >
      🏆
    </span>
    <style>{
      @keyframes spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }
    }</style>
  </div>
);

// Menu buttons with hover effects and theme colors
function MenuButton({ label, onClick }) {
  const colors = {
    Games: "#FF8E53",
    Balance: "#4CAF50",
    Rewards: "#2196F3",
    Deposit: "#FFB74D",
    Withdraw: "#E57373",
    Invite: "#BA68C8",
    Support: "#26A69A",
  }
  const [bgColor, setBgColor] = useState(colors[label] || "#666");
  const baseStyle = {
    padding: "15px 30px", margin: 10, width: "calc(50% - 20px)", fontSize: 18,
    borderRadius: 15, border: "none", color: "white", cursor: "pointer",
    boxShadow: "0 3px 10px rgba(0,0,0,0.3)", transition: "background-color 0.3s ease",
    backgroundColor: bgColor,
  }
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setBgColor("#555")}
      onMouseLeave={() => setBgColor(colors[label] || "#666")}
      style={baseStyle}
    >
      {label}
    </button>
  )
}

// Cashback information display component
function CashbackInfo({ cashbackPercent }) {
  return (
    <div style={{
      marginTop: 30, padding: 15,
      background: "linear-gradient(90deg, #FFC107, #FFEB3B)",
      borderRadius: 12,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
    }}>
      Daily {cashbackPercent}% cashback on lost money in 24 hours! 🎉
    </div>
  );
}

// Screen header with back button
function HeaderWithBack({ title, onBack }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
      <button onClick={onBack} style={{
        background: "none", border: "none", fontSize: 24,
        color: "#FFFFFF", cursor: "pointer", marginRight: 10
      }}>←</button>
      <h2 style={{ margin: 0 }}>{title}</h2>
    </div>
  );
}

// Generic list screen component
function ListScreen({ title, items, onBack }) {
  return (
    <>
      <HeaderWithBack title={title} onBack={onBack} />
      <ul style={{ paddingLeft: 20 }}>
        {items.map((item, i) => (
          <li key={i} style={{ color: "#FAFAFA", padding: 8, borderBottom: "1px solid #333" }}>{item}</li>
        ))}
      </ul>
    </>
  )
}

// Balance screen with placeholder balance
function BalanceScreen({ balance, onBack }) {
  return (
    <>
      <HeaderWithBack title="Balance" onBack={onBack} />
      <p>Your current balance is <b>ETB {balance}</b></p>
      {/* Extend here with transaction history etc. */}
    </>
  )
}

// Deposit screen with list of methods
function DepositScreen({ methods, onBack }) {
  return (
    <>
      <HeaderWithBack title="Deposit" onBack={onBack} />
      <p>Select a deposit method:</p>
      <ul>{methods.map((m, i) => <li key={i}>{m}</li>)}</ul>
      {/* Extend with deposit form and processing */}
    </>
  )
}

// Withdraw screen with list of methods
function WithdrawScreen({ methods, onBack }) {
  return (
    <>
      <HeaderWithBack title="Withdraw" onBack={onBack} />
      <p>Select a withdrawal method:</p>
      <ul>{methods.map((m, i) => <li key={i}>{m}</li>)}</ul>
      {/* Extend with withdraw form and processing */}
    </>
  )
}

// Invite screen with invite link placeholder
function InviteScreen({ onBack }) {
  return (
    <>
      <HeaderWithBack title="Invite your friends" onBack={onBack} />
      <p>Share this invite link and earn rewards when friends join and deposit:</p>
      <p><code>https://winnergame.example/invite?user=1234</code></p>
    </>
  )
}

// Support screen linking to telegram
function SupportScreen({ onBack }) {
  return (
    <>
      <HeaderWithBack title="Support" onBack={onBack} />
      <p>Contact us on Telegram:</p>
      <p><a href="https://t.me/Winnergamehelp" target="_blank" rel="noopener noreferrer">@Winnergamehelp</a></p>
    </>
  )
}

// Main component to handle screens and loading
export default function MiniApp() {
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState("home");
  const [balance] = useState(1000);
  const [depositWithdrawMethods] = useState(["Telebirr", "Bank Transfer", "Impesa"]);
  const [dailyCashback] = useState(12);
  const dummyGames = ["Aviator", "Keno", "Fast Keno", "Jet X", "Coin Flip", "Chicken Road"];
  const dummyRewards = ["Spin", "Coupon", "Other"];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingIcon />;

  switch (screen) {
    case "games":
      return <ListScreen title="Games" items={dummyGames} onBack={() => setScreen("home")} />;
    case "balance":
      return <BalanceScreen balance={balance} onBack={() => setScreen("home")} />;
    case "rewards":
      return <ListScreen title="Rewards" items={dummyRewards} onBack={() => setScreen("home")} />;
    case "deposit":
      return <DepositScreen methods={depositWithdrawMethods} onBack={() => setScreen("home")} />;
    case "withdraw":
      return <WithdrawScreen methods={depositWithdrawMethods} onBack={() => setScreen("home")} />;
    case "invite":
      return <InviteScreen onBack={() => setScreen("home")} />;
    case "support":
      return <SupportScreen onBack={() => setScreen("home")} />;
    case "home":
    default:
      return (
        <div style={{ maxWidth: 480, margin: "auto", padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#111", color: "#eee", borderRadius: 12 }}>
          <h1 style={{ textAlign: "center" }}>Winner Game</h1>
          <MenuButton label="Games" onClick={() => setScreen("games")} />
          <MenuButton label="Balance" onClick={() => setScreen("balance")} />
          <MenuButton label="Rewards" onClick={() => setScreen("rewards")} />
          <MenuButton label="Deposit" onClick={() => setScreen("deposit")} />
          <MenuButton label="Withdraw" onClick={() => setScreen("withdraw")} />
          <MenuButton label="Invite" onClick={() => setScreen("invite")} />
          <MenuButton label="Support" onClick={() => setScreen("support")} />
          <CashbackInfo cashbackPercent={dailyCashback} />
        </div>
      )
  }
}
