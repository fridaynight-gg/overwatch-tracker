import { useSpinDelay } from 'spin-delay';

interface UseShowSpinnerOptions {
  delay?: number;
  minDuration?: number;
}

export function useShowSpinner(
  status: boolean,
  { delay, minDuration }: UseShowSpinnerOptions = { delay: 0, minDuration: 500 }
) {
  return useSpinDelay(status, { delay, minDuration });
}
