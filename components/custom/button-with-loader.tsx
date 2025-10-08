import { useFormStatus } from 'react-dom'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonWithLoaderProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loadingText?: string
  showSpinner?: boolean
}

export default function ButtonWithLoader({
  children,
  loadingText = "Loading...",
  className = "",
  type = "submit",
  disabled = false,
  showSpinner = true,
  ...props
}: ButtonWithLoaderProps) {
  const { pending } = useFormStatus()

  const defaultClasses = "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
  const combinedClasses = `${defaultClasses} ${className}`.trim()

  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={pending || disabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {pending && showSpinner && (
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              className="opacity-25"
            />
            <path
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              className="opacity-75"
            />
          </svg>
        )}
        <span>{pending ? loadingText : children}</span>
      </div>
    </button>
  )
}
