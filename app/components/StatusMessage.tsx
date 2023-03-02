import clsx from 'clsx';
import { motion } from 'framer-motion';

export type StatusType = 'error' | 'success' | 'info' | 'warning';
export type StatusVariant = 'plain' | 'callout';

interface StatusMessageProps {
  children: React.ReactNode;
  onDismiss?: (() => void) | null | undefined;
  type: StatusType;
  variant?: StatusVariant;
}

export function StatusMessage({
  children,
  onDismiss,
  type,
  variant = 'plain',
}: StatusMessageProps) {
  const classNamesForType = getClassnamesForType(type);
  const classNamesForVariant = getClassnamesForVariant(variant);
  const { viewBox, path } = getIconForType(type);

  return (
    <motion.div
      className={clsx([
        classNamesForVariant,
        'relative',
        onDismiss ? 'pr-12' : '',
      ])}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <p className="relative flex items-center gap-x-4 px-3 py-1 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
          fill="currentColor"
          className={clsx(['h-5 w-5 flex-shrink-0', classNamesForType])}
        >
          {path}
        </svg>
        {children}
      </p>
      {onDismiss ? (
        <div className="absolute inset-y-0 right-6 flex items-center">
          <button
            className="flex h-8 w-8 items-center justify-center"
            onClick={onDismiss}
            title="status message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              aria-hidden="true"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z" />
            </svg>
          </button>
        </div>
      ) : null}
    </motion.div>
  );
}

function getIconForType(type: StatusType) {
  return {
    error: {
      viewBox: '0 0 512 512',
      path: (
        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm97.9-320l-17 17-47 47 47 47 17 17L320 353.9l-17-17-47-47-47 47-17 17L158.1 320l17-17 47-47-47-47-17-17L192 158.1l17 17 47 47 47-47 17-17L353.9 192z" />
      ),
    },
    info: {
      viewBox: '0 0 512 512',
      path: (
        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
      ),
    },
    success: {
      viewBox: '0 0 512 512',
      path: (
        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
      ),
    },
    warning: {
      viewBox: '0 0 512 512',
      path: (
        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm24-384v24V264v24H232V264 152 128h48zM232 368V320h48v48H232z" />
      ),
    },
  }[type];
}

function getClassnamesForType(type: StatusType) {
  return {
    error: [/*tw*/ 'text-red-400', /*tw*/ 'dark:text-red-500'],
    info: [/*tw*/ 'text-cyan-500', /*tw*/ 'dark:text-sky-500'],
    success: [/*tw*/ 'text-green-500', /*tw*/ 'dark:text-emerald-500'],
    warning: [/*tw*/ 'text-orange-400', /*tw*/ 'dark:text-yellow-500'],
  }[type];
}

function getClassnamesForVariant(variant: StatusVariant) {
  return {
    plain: [],
    callout: [
      'rounded p-4 shadow-inner',
      /*tw*/ 'bg-lavender-50/10',
      /*tw*/ 'dark:bg-lavender-900/50',
    ],
  }[variant];
}
