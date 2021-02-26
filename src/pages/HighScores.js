import React, { useState, useEffect } from "react";
import { ScoreList, ScoreLI } from "../styled/HighScores";

const HighScores = () => {
  const [highScores, setHighScores] = useState([]);
  useEffect(() => {
    const loadHighScores = async () => {
      try {
        const res = await fetch("/.netlify/functions/getHighScores");
        const score = await res.json();
        setHighScores(score);
      } catch (err) {
        console.log(err);
      }
    };
    loadHighScores();
  }, []);
  return (
    <div>
      <h1>HighScores</h1>
      <ScoreList>
        {highScores.map((highScore) => {
          return (
            <ScoreLI key={highScore.id}>
              {highScore.fields.name} - {highScore.fields.score}
            </ScoreLI>
          );
        })}
      </ScoreList>
    </div>
  );
};

export default HighScores;
