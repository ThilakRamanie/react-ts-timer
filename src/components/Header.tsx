import Button from './UI/Button.tsx';
import { useTimersContext } from '../store/timers-context.tsx';

export default function Header() {
  const timersContext = useTimersContext()
  return (
    <header>
      <h1>ReactTimer</h1>

      <Button>{timersContext.isRunning ? 'Stop' : 'Start'} timers</Button>
    </header>
  );
}
