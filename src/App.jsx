import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [namaTurnamen, setNamaTurnamen] = useState(
  localStorage.getItem("turnamen") ||
  "TURNAMEN FUTSAL TANDUS CUP 2 2026"
);

  const [teamA, setTeamA] = useState(
  localStorage.getItem("teamA") || "TIM A"
);

const [teamB, setTeamB] = useState(
  localStorage.getItem("teamB") || "TIM B"
);

  const [scoreA, setScoreA] = useState(
  Number(localStorage.getItem("scoreA")) || 0
);

const [scoreB, setScoreB] = useState(
  Number(localStorage.getItem("scoreB")) || 0
);

  const [foulA, setFoulA] = useState(
  Number(localStorage.getItem("foulA")) || 0
);

const [foulB, setFoulB] = useState(
  Number(localStorage.getItem("foulB")) || 0
);

  const [yellowA, setYellowA] = useState(
  Number(localStorage.getItem("yellowA")) || 0
);

const [yellowB, setYellowB] = useState(
  Number(localStorage.getItem("yellowB")) || 0
);

  const [redA, setRedA] = useState(
  Number(localStorage.getItem("redA")) || 0
);

const [redB, setRedB] = useState(
  Number(localStorage.getItem("redB")) || 0
);

  // MATCH TIMER
  const [matchSeconds, setMatchSeconds] = useState(20 * 60);

  // TIME OUT TIMER
  const [timeoutMode, setTimeoutMode] = useState(false);
  const [timeoutSeconds, setTimeoutSeconds] = useState(60);

  const [running, setRunning] = useState(false);

  const [tvMode, setTvMode] = useState(false);

  const [gameMode, setGameMode] = useState("BABAK 1");

  const [blink, setBlink] = useState(false);

  const playStart = () => {
    try {
      new Audio("/start.mp3").play();
    } catch {}
  };

  const playEnd = () => {
    try {
      new Audio("/end.mp3").play();
    } catch {}
  };

  const playTimeout = () => {
    try {
      new Audio("/timeout.mp3").play();
    } catch {}
  };

  // TIMER PERTANDINGAN
  useEffect(() => {
    let interval;

    if (
      running &&
      !timeoutMode &&
      matchSeconds > 0
    ) {
      interval = setInterval(() => {
        setMatchSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running, timeoutMode, matchSeconds]);

  // LOGIKA BABAK
  useEffect(() => {
    if (matchSeconds === 0 && running && !timeoutMode) {
      playEnd();

      setBlink(true);

      setTimeout(() => {
        setBlink(false);
      }, 10000);

      setRunning(false);

      if (gameMode === "BABAK 1") {
        setGameMode("ISTIRAHAT");
        setMatchSeconds(5 * 60);
      } else if (gameMode === "ISTIRAHAT") {
        setGameMode("BABAK 2");
        setMatchSeconds(20 * 60);
      } else if (gameMode === "BABAK 2") {
        setGameMode("SELESAI");
      }
    }
  }, [matchSeconds, running, timeoutMode, gameMode]);

  // TIMER TIMEOUT
  useEffect(() => {
  let interval;

  if (timeoutMode && timeoutSeconds > 0) {
    interval = setInterval(() => {
      setTimeoutSeconds((prev) => prev - 1);
    }, 1000);
  }

  return () => clearInterval(interval);
}, [timeoutMode, timeoutSeconds]);

// TEMPEL BLOK BARU DI SINI
useEffect(() => {
  localStorage.setItem("turnamen", namaTurnamen);
}, [namaTurnamen]);

useEffect(() => {
  localStorage.setItem("teamA", teamA);
}, [teamA]);

useEffect(() => {
  localStorage.setItem("teamB", teamB);
}, [teamB]);

useEffect(() => {
  localStorage.setItem("scoreA", scoreA);
}, [scoreA]);

useEffect(() => {
  localStorage.setItem("scoreB", scoreB);
}, [scoreB]);

useEffect(() => {
  localStorage.setItem("foulA", foulA);
}, [foulA]);

useEffect(() => {
  localStorage.setItem("foulB", foulB);
}, [foulB]);

useEffect(() => {
  localStorage.setItem("yellowA", yellowA);
}, [yellowA]);

useEffect(() => {
  localStorage.setItem("yellowB", yellowB);
}, [yellowB]);

useEffect(() => {
  localStorage.setItem("redA", redA);
}, [redA]);

useEffect(() => {
  localStorage.setItem("redB", redB);
}, [redB]);

// BARU SETELAH ITU
const formatTime = (time) => {
  const menit = Math.floor(time / 60);
  const detik = time % 60;

  return `${String(menit).padStart(2, "0")}:${String(
    detik
  ).padStart(2, "0")}`;
};
  const startTimer = () => {
    playStart();
    setRunning(true);
  };

  const pauseTimer = () => {
    setRunning(false);
  };

  const resetTimer = () => {
    setRunning(false);

    setTimeoutMode(false);

    setTimeoutSeconds(60);

    setMatchSeconds(20 * 60);

    setGameMode("BABAK 1");
  };

  const timeoutStart = () => {
    playTimeout();

    setRunning(false);

    setTimeoutMode(true);

    setTimeoutSeconds(60);
  };

  const fullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  const resetMatch = () => {
  setScoreA(0);
  setScoreB(0);

  setFoulA(0);
  setFoulB(0);

  setYellowA(0);
  setYellowB(0);

  setRedA(0);
  setRedB(0);

  localStorage.removeItem("scoreA");
  localStorage.removeItem("scoreB");

  localStorage.removeItem("foulA");
  localStorage.removeItem("foulB");

  localStorage.removeItem("yellowA");
  localStorage.removeItem("yellowB");

  localStorage.removeItem("redA");
  localStorage.removeItem("redB");

  resetTimer();
};
  return (
    <div className="app">

      <div className="header-panel">
        <input
          className="tournament-input"
          value={namaTurnamen}
          onChange={(e) =>
            setNamaTurnamen(e.target.value)
          }
        />
      </div>

      <div className="scoreboard">

        <div className="team-side">

          <input
            className="team-input"
            value={teamA}
            onChange={(e) =>
              setTeamA(e.target.value)
            }
          />

          <div className="score">
            {scoreA}
          </div>

          <div className="info">
            FOUL : {foulA}
          </div>

          <div className="yellow">
            🟨 {yellowA}
          </div>

          <div className="red">
            🟥 {redA}
          </div>

        </div>

        <div className="center-side">

          <div
            className={
              blink ? "timer blink" : "timer"
            }
          >
            {timeoutMode
              ? formatTime(timeoutSeconds)
              : formatTime(matchSeconds)}
          </div>

          <div className="period">
            {timeoutMode
              ? "TIME OUT"
              : gameMode}
          </div>

        </div>

        <div className="team-side">

          <input
            className="team-input"
            value={teamB}
            onChange={(e) =>
              setTeamB(e.target.value)
            }
          />

          <div className="score">
            {scoreB}
          </div>

          <div className="info">
            FOUL : {foulB}
          </div>

          <div className="yellow">
            🟨 {yellowB}
          </div>

          <div className="red">
            🟥 {redB}
          </div>

        </div>

      </div>

      <div className="controls">

        <button onClick={startTimer}>
          START
        </button>

        <button onClick={pauseTimer}>
          PAUSE
        </button>

        <button onClick={resetTimer}>
          RESET TIMER
        </button>

        <button onClick={timeoutStart}>
          TIME OUT
        </button>

        <button
          onClick={() =>
            setMatchSeconds(
              (prev) => prev + 60
            )
          }
        >
          +1 MENIT
        </button>

        <button
          onClick={() =>
            setMatchSeconds((prev) =>
              Math.max(0, prev - 60)
            )
          }
        >
          -1 MENIT
        </button>

        <button
          onClick={() =>
            setTvMode(!tvMode)
          }
        >
          {tvMode
            ? "MODE OPERATOR"
            : "MODE TV"}
        </button>

        <button onClick={fullscreen}>
          FULLSCREEN
        </button>

        <button onClick={resetMatch}>
          RESET MATCH
        </button>

      </div>

      {!tvMode && (
        <div className="operator">

          <div className="card">
            <h2>{teamA}</h2>

            <button onClick={() => setScoreA(scoreA + 1)}>
              + SKOR
            </button>

            <button onClick={() =>
              setScoreA(Math.max(0, scoreA - 1))
            }>
              - SKOR
            </button>

            <button onClick={() => setFoulA(foulA + 1)}>
              + FOUL
            </button>

            <button onClick={() =>
              setFoulA(Math.max(0, foulA - 1))
            }>
              - FOUL
            </button>

            <button onClick={() =>
              setYellowA(yellowA + 1)
            }>
              + KUNING
            </button>

            <button onClick={() =>
              setYellowA(Math.max(0, yellowA - 1))
            }>
              - KUNING
            </button>

            <button onClick={() => setRedA(redA + 1)}>
              + MERAH
            </button>

            <button onClick={() =>
              setRedA(Math.max(0, redA - 1))
            }>
              - MERAH
            </button>
          </div>

          <div className="card">
            <h2>{teamB}</h2>

            <button onClick={() => setScoreB(scoreB + 1)}>
              + SKOR
            </button>

            <button onClick={() =>
              setScoreB(Math.max(0, scoreB - 1))
            }>
              - SKOR
            </button>

            <button onClick={() => setFoulB(foulB + 1)}>
              + FOUL
            </button>

            <button onClick={() =>
              setFoulB(Math.max(0, foulB - 1))
            }>
              - FOUL
            </button>

            <button onClick={() =>
              setYellowB(yellowB + 1)
            }>
              + KUNING
            </button>

            <button onClick={() =>
              setYellowB(Math.max(0, yellowB - 1))
            }>
              - KUNING
            </button>

            <button onClick={() => setRedB(redB + 1)}>
              + MERAH
            </button>

            <button onClick={() =>
              setRedB(Math.max(0, redB - 1))
            }>
              - MERAH
            </button>
          </div>

        </div>
      )}

    </div>
  );
}