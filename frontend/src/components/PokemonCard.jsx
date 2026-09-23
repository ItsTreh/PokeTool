import TypeBadge from './TypeBadge'

export default function PokemonCard({ pokemon, compact = false }) {
  if (!pokemon) return null

  return (
    <div className="card flex flex-col items-center gap-2 hover:border-poke-yellow/50 transition-colors">
      {pokemon.spriteUrl && (
        <img
          src={pokemon.spriteUrl}
          alt={pokemon.name}
          className={compact ? 'w-16 h-16' : 'w-24 h-24'}
          style={{ imageRendering: 'pixelated' }}
        />
      )}
      <p className="font-semibold capitalize text-white">
        {pokemon.name}
      </p>
      <div className="flex gap-1 flex-wrap justify-center">
        {pokemon.types?.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
    </div>
  )
}
