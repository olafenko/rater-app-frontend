import React, { useEffect, useState } from "react";
import championsMap from "./championsMap";
import axios from "axios";

const IMAGE_BASE_URL = "https://ddragon.leagueoflegends.com/cdn/15.5.1/img/champion/";

const Battle = () => {
    const [battle, setBattle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetchBattle();
    }, []);

    const fetchBattle = async () => {
        setSelected(null); // Reset animation
        try {
            const response = await axios.get(`http://localhost:8080/battle`);
            setBattle(response.data);
        } catch (error) {
            console.error("Error fetching battle:", error);
        } finally {
            setLoading(false);
        }
    };

    const submitAnswer = async (winnerId) => {
        if (!battle) return;

        setSelected(winnerId);

        setTimeout(async () => {
            try {
                await axios.post(`http://localhost:8080/answer`, {
                    battleId: battle.id,
                    winnerId,
                });
                fetchBattle(); // Load new battle
            } catch (error) {
                console.error("Error submitting answer:", error);
            }
        }, 500);
    };

    if (loading) return <h2 style={styles.loading}>Loading...</h2>;
    if (!battle) return <h2 style={styles.loading}>Error loading battle!</h2>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Which champ is better?</h1>
            <div style={styles.champContainer}>
                {["firstId", "secondId"].map((key) => {
                    const champId = battle[key];
                    const champName = championsMap[champId] || "Unknown";

                    const champImageName = champName === "Wukong" ? "MonkeyKing" : champName;
                    return (
                        <div
                            key={champId}
                            style={{
                                ...styles.champ,
                                opacity: selected === champId ? 0.2 : 1,
                                transform: selected === champId ? "scale(0.9)" : "scale(1)",
                                transition: "opacity 0.5s ease, transform 0.5s ease",
                            }}
                        >
                            <h2 style={styles.champName}>{champName}</h2>
                            <img src={`${IMAGE_BASE_URL}${champImageName}.png`} alt={champName} style={styles.image} />
                            <div style={styles.buttonWrapper}>
                                <button style={styles.button} onClick={() => submitAnswer(champId)}>
                                    CHOOSE
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


const styles = {
    container: {
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        backgroundColor: "#121212",
        color: "#fff",
        minHeight: "100vh",
    },
    title: {
        fontSize: "50px",
        marginBottom: "40px",
        textShadow: "2px 2px 20px rgba(255,255,255,0.3)",
    },
    champContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "100px",
    },
    champ: {
        textAlign: "center",
    },
    champName: {
        fontSize: "36px",
        marginBottom: "20px",
        fontWeight: "bold",
        textShadow: "2px 2px 20px rgba(255,255,255,0.5)",
    },
    image: {
        width: "250px",
        height: "250px",
        borderRadius: "10px",
        border: "4px solid #fff",
        boxShadow: "0px 0px 20px rgba(255,255,255,0.6)",
    },
    buttonWrapper: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
    },
    button: {
        padding: "20px 40px",
        fontSize: "24px",
        fontWeight: "bold",
        backgroundColor: "#ff6b6b",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "0.3s",
        textTransform: "uppercase",
        boxShadow: "0px 0px 20px rgba(255, 107, 107, 0.7)",
    },
    loading: {
        fontSize: "32px",
        textAlign: "center",
        color: "#ffffff",
        marginTop: "50px",
    },
};

export default Battle;
