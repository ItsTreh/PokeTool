export default function LoadingSpinner({ size = 'md', text = '' }) {
  const sizes = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={`${sizes[size]} rounded-full border-white/20 border-t-poke-red animate-spin`}
      />
      {text && <p className="text-white/60 text-sm">{text}</p>}
    </div>
  )
}
