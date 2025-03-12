import React, {useEffect, useState} from "react";
import Battle from "./Battle";
import Leaderboard from "./Leaderboard";

const App = () => {
    const [view, setView] = useState("battle");
    useEffect(() => {
        document.title = "Lol Champ Rater";
    }, []);

    return (
        <div style={styles.container}>
            <nav style={styles.navbar}>
                <button onClick={() => setView("battle")} style={styles.navButton}>Battle</button>
                <button onClick={() => setView("leaderboard")} style={styles.navButton}>Leaderboard</button>
            </nav>

            {view === "battle" ? <Battle /> : <Leaderboard />}
        </div>
    );
};

// Styles
const styles = {
    container: {
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#121212",
        color: "#fff",
        minHeight: "100vh",
    },
    navbar: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#333",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
    },
    navButton: {
        color: "#fff",
        fontSize: "18px",
        padding: "10px 15px",
        borderRadius: "5px",
        backgroundColor: "#555",
        border: "none",
        cursor: "pointer",
        transition: "0.3s",
    },
};

export default App;
