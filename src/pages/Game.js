import React, { useState, useEffect } from "react";
import {
  StyledGame,
  StyledScore,
  StyledCharacter,
  StyledTimer,
} from "../styled/Game";
import { Strong } from "../styled/Random";

const Game = ({ history }) => {
  const [score, setScore] = useState(0);
  const MAX_SECONDS = 5;
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(MAX_SECONDS);

  useEffect(() => {
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 1);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (seconds <= -1) {
      history.push("/gameOver");
    }
  }, [seconds, history]);

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
        Score:<Strong>0</Strong>
      </StyledScore>
      <StyledCharacter>A</StyledCharacter>
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
