import React, { Profiler } from "react";
/*

  Example usage:

   <DevWrapper>
        <FeatureComponent />
    </DevWrapper>

  to enabled:
  - wrap something
  - show debug log level inspector

  to keep wrapped but turn quickly off/on:
  - set local storage consoleDevTools to "0" to disable

*/

interface ClassProps {
  children?: React.ReactNode;
  id?: string;
}

const averageTimeMap = {
  actualDuration: 0,
  numTimes: 0,
};

function resetTime() {
  averageTimeMap.actualDuration = 0;
  averageTimeMap.numTimes = 0;
}

// https://reactjs.org/docs/profiler.html#onrender-callback
// React calls this function any time a component within the profiled tree “commits” an update
function clockPerformance(
  profilerId: any,
  phase: any,
  actualDuration: number,
  baseDuration: any,
  startTime: any,
  commitTime: any
) {
  // console.log({
  //   profilerId,
  //   phase,
  //   actualDuration,
  //   baseDuration,
  //   startTime,
  //   commitTime,
  // });

  // why focus on actual duration?
  // https://gist.github.com/bvaughn/8de925562903afd2e7a12554adcdda16#gistcomment-3268773
  // "It's the most intuitive measure. (How long did this render take?)"
  averageTimeMap.actualDuration += actualDuration;
  averageTimeMap.numTimes += 1;
  console.log("////////////////////");
  console.log(
    "average render time    ",
    (averageTimeMap.actualDuration / averageTimeMap.numTimes).toFixed(5),
    "ms"
  );
  console.log(
    "total render time      ",
    (averageTimeMap.actualDuration / 1000).toFixed(5),
    "s"
  );
  console.log("total # renders        ", averageTimeMap.numTimes);
}

function handleKeyDown(e: { ctrlKey: any; shiftKey: any; which: number }) {
  // ctrl + shift + c
  if (e.ctrlKey && e.shiftKey && e.which === 67) {
    resetTime();
    console.log("//////////////////// profile metrics reset");
  }
}
const DevWrapper = ({
  children,
  id = "renderProfiling",
}: ClassProps): React.ReactElement => {
  React.useEffect(() => {
    resetTime();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Profiler id={id} onRender={clockPerformance}>
      <>{children}</>
    </Profiler>
  );
};

export default DevWrapper;
