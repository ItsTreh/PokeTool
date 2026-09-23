import { useState } from 'react'

export default function AvatarImg({ avatar, className = 'w-12 h-12' }) {
  const [failed, setFailed] = useState(false)

  if (!avatar) return null

  if (failed || !avatar.url) {
    return (
      <div
        className={`${className} rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0`}
        style={{ background: avatar.color || '#374151' }}
      >
        {avatar.name?.charAt(0) ?? '?'}
      </div>
    )
  }

  return (
    <img
      src={avatar.url}
      alt={avatar.name}
      className={`${className} rounded-full object-cover flex-shrink-0`}
      onError={() => setFailed(true)}
    />
  )
}
