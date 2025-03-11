import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Replace with your backend URL
const IMAGE_BASE_URL = "https://ddragon.leagueoflegends.com/cdn/15.5.1/img/champion/";

const Leaderboard = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/leaderboard`);
            setCharacters(response.data);
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <h2 style={styles.loading}>Loading leaderboard...</h2>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Leaderboard</h1>
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {characters.map((char) => {
                        const imageName = char.name === "Wukong" ? "MonkeyKing" : char.name;
                        return (
                            <tr key={char.name} style={styles.tableRow}>
                                <td style={styles.cell}>
                                    <img src={`${IMAGE_BASE_URL}${imageName}.png`} alt={char.name} style={styles.image} />
                                </td>
                                <td style={styles.cell}>{char.name}</td>
                                <td style={styles.cell}>{char.rating}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const styles = {
    container: {
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        paddingTop: "10px",
        backgroundColor: "#121212",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        fontSize: "40px",
        marginBottom: "30px",
    },
    tableWrapper: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
    },
    table: {
        width: "25%",
        borderCollapse: "collapse",
        marginTop: "5px",
    },
    tableRow: {
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    },
    cell: {
        fontSize: "20px",
        padding: "5px",
        textAlign: "center",
    },
    image: {
        width: "70px",
        height: "70px",
        borderRadius: "5px",
    },
    loading: {
        fontSize: "24px",
        textAlign: "center",
        color: "#ffffff",
    },
};

export default Leaderboard;
