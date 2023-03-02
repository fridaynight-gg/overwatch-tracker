import clsx from 'clsx';

type CardElevation = 'none' | 'sm' | 'normal' | 'md' | 'lg' | 'xl';

interface CardProps {
  children: React.ReactNode;
  elevation?: CardElevation;
}

export function Card({ children, elevation = 'normal' }: CardProps) {
  const classNamesForElevation = getClassnamesForElevation(elevation);

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className={clsx(
          'bg-white py-8 px-4 sm:rounded-lg sm:px-10',
          classNamesForElevation
        )}
      >
        {children}
      </div>
    </div>
  );
}

function getClassnamesForElevation(elevation: CardElevation) {
  return {
    none: 'drop-shadow-none',
    sm: 'drop-shadow-sm',
    normal: 'drop-shadow',
    md: 'drop-shadow-md',
    lg: 'drop-shadow-lg',
    xl: 'drop-shadow-xl',
  }[elevation];
}
