import clsx from 'clsx';
import { type ButtonHTMLAttributes } from 'react';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'white'
  | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function getButtonClassname({
  className,
  size = 'md',
  variant = 'secondary',
}: ButtonProps) {
  const classNamesForSize = getClassnamesForSize(size);
  const classNamesForVariant = getClassnamesForVariant(variant);

  return clsx(
    className,
    /*tw*/ 'inline-flex items-center border font-medium',
    /*tw*/ 'focus:outline-none focus:ring-2 focus:ring-offset-2',
    /*tw*/ 'disabled:cursor-not-allowed disabled:opacity-50',
    /*tw*/ 'dark:ring-offset-lavender-800',
    classNamesForSize,
    classNamesForVariant
  );
}

export function Button({
  children,
  className,
  leftIcon,
  rightIcon,
  size = 'md',
  variant = 'secondary',
  ...rest
}: ButtonProps) {
  const classNamesForSize = getClassnamesForSize(size);
  const classNamesForVariant = getClassnamesForVariant(variant);
  const classNamesForLeftIcon = getLeftIconClassnamesForSize(size);
  const classNamesForRightIcon = getRightIconClassnamesForSize(size);

  return (
    <button
      {...rest}
      className={clsx(
        className,
        'inline-flex items-center font-medium',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'dark:ring-offset-lavender-800',
        classNamesForSize,
        classNamesForVariant
      )}
    >
      {leftIcon ? (
        <span className={clsx(classNamesForLeftIcon)} aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}
      {children}
      {rightIcon ? (
        <span className={clsx(classNamesForRightIcon)} aria-hidden="true">
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
}

function getClassnamesForSize(size: ButtonSize) {
  return {
    xs: /*tw*/ 'px-2.5 py-1.5 text-xs rounded',
    sm: /*tw*/ 'rounded-md px-3 py-2 text-sm',
    md: /*tw*/ 'rounded-md px-4 py-2 text-sm',
    lg: /*tw*/ 'rounded-md px-4 py-2 text-base',
    xl: /*tw*/ 'rounded-md px-6 py-3 text-base',
  }[size];
}

function getClassnamesForVariant(variant: ButtonVariant) {
  return {
    primary: [
      /*tw*/ 'bg-brand-500 dark:bg-brand-400 border border-brand-500 dark:border-brand-400 text-white',
      /*tw*/ 'hover:bg-brand-600 hover:border-brand-600',
      /*tw*/ 'focus:ring-brand-500',
    ],
    secondary: [
      /*tw*/ 'bg-transparent border border-lavender-50 text-lavender-800',
      /*tw*/ 'hover:bg-gray-100',
      /*tw*/ 'focus:ring-gray-300',
      /*tw*/ 'dark:border-lavender-700 dark:text-lavender-100',
      /*tw*/ 'dark:focus:ring-lavender-300',
      /*tw*/ 'dark:hover:bg-lavender-900 dark:hover:bg-opacity-25',
    ],
    tertiary: [
      /*tw*/ 'border text-brand-500 dark:text-brand-400 border-transparent',
      /*tw*/ 'hover:underline',
      /*tw*/ 'focus:ring-brand-400',
    ],
    outline: [
      /*tw*/ 'bg-transparent border border-brand-500 dark:border-brand-500 text-brand-500 dark:text-brand-500',
      /*tw*/ 'hover:bg-brand-50 hover:bg-opacity-25',
      /*tw*/ 'focus:ring-brand-500',
      /*tw*/ 'dark:hover:bg-brand-700 dark:hover:bg-opacity-10',
    ],
    white: [
      /*tw*/ 'bg-transparent border border-white text-white',
      /*tw*/ 'hover:bg-white hover:bg-opacity-25',
      /*tw*/ 'focus:ring-white',
    ],
    danger: [
      /*tw*/ 'bg-red-50 dark:bg-red-600 border border-red-600 text-red-700 dark:text-white',
      /*tw*/ 'hover:bg-red-100 dark:hover:bg-red-500 dark:hover:border-red-500',
      /*tw*/ 'focus:ring-red-500',
    ],
  }[variant];
}

function getLeftIconClassnamesForSize(size: ButtonSize) {
  return {
    xs: /*tw*/ '-ml-0.5 mr-2 h-4 w-4',
    sm: /*tw*/ '-ml-0.5 mr-2 h-4 w-4',
    md: /*tw*/ '-ml-1 mr-2 h-4 w-4',
    lg: /*tw*/ '-ml-1 mr-3 h-5 w-5',
    xl: /*tw*/ '-ml-1 mr-3 h-5 w-5',
  }[size];
}

function getRightIconClassnamesForSize(size: ButtonSize) {
  return {
    xs: /*tw*/ 'ml-2 -mr-0.5 h-4 w-4',
    sm: /*tw*/ 'ml-2 -mr-0.5 h-4 w-4',
    md: /*tw*/ 'ml-2 -mr-1 h-5 w-5',
    lg: /*tw*/ 'ml-3 -mr-1 h-5 w-5',
    xl: /*tw*/ 'ml-3 -mr-1 h-5 w-5',
  }[size];
}
