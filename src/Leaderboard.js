import React, { useEffect, useState } from "react";
import axios from "axios";

const IMAGE_BASE_URL = "https://ddragon.leagueoflegends.com/cdn/15.5.1/img/champion/";

const Leaderboard = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/leaderboard`);
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
            <h1 style={styles.title}>Champion Leaderboard</h1>
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
                        <tr key={char.name}>
                            <td>
                                <img src={`${IMAGE_BASE_URL}${imageName}.png`} alt={char.name} style={styles.image} />
                            </td>
                            <td>{char.name}</td>
                            <td>{char.rating}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

// Styles
const styles = {
    container: {
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#121212",
        color: "#fff",
        minHeight: "100vh",
    },
    title: {
        fontSize: "40px",
        marginBottom: "20px",
    },
    table: {
        width: "80%",
        margin: "0 auto",
        borderCollapse: "collapse",
    },
    image: {
        width: "50px",
        height: "50px",
        borderRadius: "5px",
    },
    loading: {
        fontSize: "24px",
        textAlign: "center",
        color: "#ffffff",
    },
};

export default Leaderboard;
