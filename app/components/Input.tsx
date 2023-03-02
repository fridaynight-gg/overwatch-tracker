import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import {
  forwardRef,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
} from 'react';

export interface InputProps {
  className?: string;
  error?: ReactNode;
  fullWidth?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  label?: ReactNode;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  name: string;
  success?: ReactNode;
  warning?: ReactNode;
}

export function getInputClassname({
  className,
  error = '',
  success = '',
  warning = '',
}: Pick<InputProps, 'className' | 'error' | 'success' | 'warning'>) {
  const classNamesForError = getClassnamesForError(error);
  const classNamesForSuccess = getClassnamesForSuccess(success);
  const classNamesForWarning = getClassnamesForWarning(warning);

  return clsx([
    className,
    /*tw*/ 'block w-full rounded-md',
    /*tw*/ 'bg-gray-50',
    /*tw*/ 'focus:outline-none',
    /*tw*/ 'dark:bg-lavender-800',
    /*tw*/ 'text-sm',
    classNamesForError,
    classNamesForSuccess,
    classNamesForWarning,
  ]);
}

function InputInternal(
  {
    error = '',
    fullWidth = false,
    inputProps,
    label = '',
    labelProps,
    name,
    success = '',
    warning = '',
  }: InputProps,
  forwardedRef: ForwardedRef<any>
) {
  const classNamesForError = getClassnamesForError(error);
  const classNamesForSuccess = getClassnamesForSuccess(success);
  const classNamesForWarning = getClassnamesForWarning(warning);

  return (
    <div
      key={`${name}-${error || 'noerror'}`}
      className={clsx([fullWidth ? 'w-full' : ''])}
    >
      {label ? (
        <label
          htmlFor={name}
          className={clsx([
            'block text-sm font-medium',
            'text-lavender-800',
            'dark:text-white',
          ])}
          {...labelProps}
        >
          {label}
        </label>
      ) : null}

      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          ref={forwardedRef}
          name={name}
          className={clsx(
            'block w-full rounded-md',
            'bg-gray-50',
            'focus:outline-none',
            'dark:bg-lavender-800',
            'text-sm',
            classNamesForError,
            classNamesForSuccess,
            classNamesForWarning
          )}
          {...inputProps}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {error ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentcolor"
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            >
              <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z" />
            </svg>
          </div>
        ) : success ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentcolor"
              className="h-5 w-5 text-emerald-500"
              aria-hidden="true"
            >
              <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </svg>
          </div>
        ) : warning ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentcolor"
              className="h-5 w-5 text-amber-500"
              aria-hidden="true"
            >
              <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z" />
            </svg>
          </div>
        ) : null}
      </div>
      {error ? (
        <p
          className={clsx([
            'mt-1.5 ml-2 text-xs',
            'text-red-600',
            'dark:text-red-500',
          ])}
          id={`${name}-error`}
        >
          {error}
        </p>
      ) : success ? (
        <p
          className={clsx([
            'mt-1.5 ml-2 text-xs',
            'text-emerald-400',
            'dark:text-emerald-300',
          ])}
          id={`${name}-success`}
        >
          {success}
        </p>
      ) : warning ? (
        <p
          className={clsx([
            'mt-1.5 ml-2 text-xs',
            'text-amber-600',
            'dark:text-amber-500',
          ])}
          id={`${name}-warning`}
        >
          {warning}
        </p>
      ) : null}
    </div>
  );
}

InputInternal.displayName = 'InputInternal';

export const Input = forwardRef<any, InputProps>(InputInternal);

function getClassnamesForError(error: ReactNode) {
  if (!error) {
    return [
      /*tw*/ 'border-gray-300',
      /*tw*/ 'focus:border-brand-500 focus:ring-brand-500',
      /*tw*/ 'dark:border-lavender-400',
    ];
  }

  return [
    /*tw*/ 'pr-10 placeholder-red-900 ',
    /*tw*/ 'border-red-300 text-red-900',
    /*tw*/ 'focus:border-red-500 focus:ring-red-500',
    /*tw*/ 'dark:border-red-800 dark:text-red-500',
  ];
}

function getClassnamesForSuccess(success: ReactNode) {
  if (!success) {
    return [
      /*tw*/ 'border-gray-300',
      /*tw*/ 'focus:border-brand-500 focus:ring-brand-500',
      /*tw*/ 'dark:border-lavender-400',
    ];
  }

  return [
    /*tw*/ 'pr-10 placeholder-emerald-900 ',
    /*tw*/ 'border-emerald-300',
    /*tw*/ 'focus:border-emerald-500 focus:ring-emerald-500',
    /*tw*/ 'dark:border-emerald-800',
  ];
}

function getClassnamesForWarning(warning: ReactNode) {
  if (!warning) {
    return [
      /*tw*/ 'border-gray-300',
      /*tw*/ 'focus:border-brand-500 focus:ring-brand-500',
      /*tw*/ 'dark:border-lavender-400',
    ];
  }

  return [
    /*tw*/ 'pr-10 placeholder-amber-900 ',
    /*tw*/ 'border-amber-300',
    /*tw*/ 'focus:border-amber-500 focus:ring-amber-500',
    /*tw*/ 'dark:border-amber-800',
  ];
}
