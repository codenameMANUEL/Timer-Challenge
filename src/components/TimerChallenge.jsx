import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dailog = useRef();

  const [timeRemainig, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemainig > 0 && timeRemainig < targetTime * 1000;

  if (timeRemainig <= 0) {
    clearInterval(timer.current);
    dailog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((preTimeRemaining) => preTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    dailog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={dailog}
        targetTime={targetTime}
        remainingTime={timeRemainig}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "stop" : "start"} challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is  running" : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
