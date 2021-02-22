import React from "react";
import { StyledLink } from "../styled/Navbar";
import { useScore } from "../contexts/ScoreContext";

const GameOver = ({ history }) => {
  const [score] = useScore();
  if (score === -1) {
    history.push("/home");
  }
  return (
    <div>
      <h1>GameOver</h1>
      <p>{score}</p>
      <StyledLink to="/home">Go Home</StyledLink>
      <StyledLink to="/game">PlayAgain?</StyledLink>
    </div>
  );
};

export default GameOver;
