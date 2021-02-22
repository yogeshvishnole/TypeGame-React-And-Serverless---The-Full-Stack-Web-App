import React, { useState, useEffect, useCallback } from "react";
import {
  StyledGame,
  StyledScore,
  StyledCharacter,
  StyledTimer,
} from "../styled/Game";
import { Strong } from "../styled/Random";

const Game = ({ history }) => {
  const MAX_SECONDS = 90;
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const [currentCharacter, setCurrentCharacter] = useState("a");
  const [score, setScore] = useState(0);
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(MAX_SECONDS);

  useEffect(() => {
    setRandomCharacter();
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 1);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRandomCharacter = () => {
    const randomInt = Math.floor(Math.random() * 36);
    setCurrentCharacter(characters[randomInt]);
  };

  useEffect(() => {
    if (seconds <= -1) {
      // Todo : save the score
      history.push("/gameOver");
    }
  }, [seconds, history]);

  const keyUpHandler = useCallback(
    (e) => {
      if (e.key === currentCharacter) {
        setScore((prevScore) => prevScore + 1);
      } else {
        if (score > 0) {
          setScore((prevScore) => prevScore - 1);
        }
      }
      setRandomCharacter();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCharacter]
  );

  useEffect(() => {
    document.addEventListener("keyup", keyUpHandler);
    return () => {
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [keyUpHandler]);

  const updateTime = (startTime) => {
    const endTime = new Date();
    const msPassedStr = (endTime.getTime() - startTime.getTime()).toString();
    const formattedMSStr = ("0000" + msPassedStr).slice(-5);
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMSStr.substring(0, 2));
    const updatedMs =
      1000 - parseInt(formattedMSStr.substring(formattedMSStr.length - 3));

    setSeconds(addLeadingZeroes(updatedSeconds, 2));
    setMs(addLeadingZeroes(updatedMs, 3));
  };

  const addLeadingZeroes = (num, length) => {
    let zeroes = "";
    for (let i = 0; i < length; i++) {
      zeroes += "0";
    }
    return (zeroes + num).slice(-length);
  };
  return (
    <StyledGame>
      <StyledScore>
        Score:<Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>{currentCharacter}</StyledCharacter>
      <StyledTimer>
        Time:{" "}
        <Strong>
          {seconds}:{ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
};

export default Game;
