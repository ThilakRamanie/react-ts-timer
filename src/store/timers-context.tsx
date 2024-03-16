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

type StartTimersAction = {
    type: 'START_TIMERS'
};
type StopTimersAction = {
    type: 'STOP_TIMERS';
};
type AddTimersAction = {
    type: 'ADD_TIMERS',
    payload: Timer
};

type Action = AddTimersAction | StartTimersAction | StopTimersAction;

function timersReducer(state: TimersState, action: Action): TimersState {
    if (action.type === 'START_TIMERS') {
        return { ...state, isRunning: true }
    }
    if (action.type === 'STOP_TIMERS') {
        return { ...state, isRunning: false }
    }
    if (action.type === 'ADD_TIMERS') {
        return {
            ...state, timers: [
                ...state.timers, {
                    name: action.payload.name, duration: action.payload.duration,
                }
            ]
        }
    }
    return state;
}

export default function TimersContextProvider({ children }: TimersContextproviderProps) {
    const [timersState, dispatch] = useReducer(timersReducer, initialState);
    const ctx: TimersContextValue = {
        timers: timersState.timers,
        isRunning: timersState.isRunning,
        addTimer(timerData) {
            dispatch({ type: 'ADD_TIMERS', payload: timerData });
        },
        startTimers() {
            dispatch({ type: 'START_TIMERS' });
        },
        stopTimers() {
            dispatch({ type: 'STOP_TIMERS' });
        },
    }
    return (
        <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
    )
}
