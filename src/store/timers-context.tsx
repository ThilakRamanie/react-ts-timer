import { type ReactNode, createContext, useContext, useReducer } from "react";

type Timer = {
    name: string;
    duration: number;
}

type TimersState = {
    isRunning: boolean;
    timers: Timer[]
}

const initialState: TimersState = {
    isRunning: true,
    timers: []
}

type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void,
    startTimers: () => void,
    stopTimers: () => void
}

export const TimersContext = createContext<TimersContextValue | null>(null);

export function useTimersContext() {
    const timersCtx = useContext(TimersContext);
    if (timersCtx === null) {
        throw new Error('TimersContext is null -- something is wrong');
    }
    return timersCtx;
}

type TimersContextproviderProps = {
    children: ReactNode
}

function timersReducer(state: TimersState, action):TimersState {

}

export default function TimersContextProvider({ children }: TimersContextproviderProps) {
   const[timersState, dispatch] = useReducer(timersReducer, initialState);
    const ctx: TimersContextValue = {
        timers: [],
        isRunning: false,
        addTimer(timerData) {
            dispatch(1);
         },
        startTimers() { },
        stopTimers() {

        },
    }
    return (
        <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
    )
}
