import { useEffect, useState } from 'react';

type CountdownProps = Readonly<{ seconds: number; onExpire: () => void }>;

export default function Countdown({ seconds, onExpire }: CountdownProps) {
  const [deadline] = useState(() => Date.now() + seconds * 1000);
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) {
        clearInterval(interval);
        onExpire();
      }
    }, 200);
    return () => clearInterval(interval);
  }, [deadline, onExpire]);

  return (
    <div className='flex items-center gap-3'>
      <div aria-hidden className='bg-surface h-3 w-32 overflow-hidden rounded-full sm:w-48'>
        <div
          className='bg-secundary h-full transition-[width] duration-200 ease-linear'
          style={{ width: `${(remaining / seconds) * 100}%` }}
        />
      </div>
      <p role='timer' aria-label='Tempo restante' className='w-12 text-right text-3xl font-bold'>
        {remaining}
      </p>
    </div>
  );
}
