 

type BackgroundProps = {
  sources?: string[]
  opacity?: number
}

export function Background({ sources, opacity = 0.6 }: BackgroundProps) {
  const vids =
    sources && sources.length
      ? sources
      : [
          'https://media.istockphoto.com/id/1590104155/pt/v%C3%ADdeo/golden-whiskey-being-poured-from-transparent-bottle-on-a-warm-brown-wooden-background-in-slow.mp4?s=mp4-640x640-is&k=20&c=HsxuYixMq0s95oxGP6iD97VpWDUZ7iPviDorYvZZ7eA=',
          'https://media.istockphoto.com/id/996232536/pt/v%C3%ADdeo/slow-motion-pour-bourbon-into-a-glass-of-ice.mp4?s=mp4-640x640-is&k=20&c=go7Sw8FmPDb-MjJXEYH7BKFoEcZHNfzB4cqRBSBfqQw=',
          'https://media.istockphoto.com/id/1130890939/pt/v%C3%ADdeo/whiskey-on-the-rocks-in-old-fashion-glass.mp4?s=mp4-480x480-is&k=20&c=x3LRmk0WbWw-yj_TfLnnnPGNqNJ6_9EWWQCAHIQGG4U=',
          'https://media.istockphoto.com/id/1255734992/pt/v%C3%ADdeo/pouring-whiskey-or-rum-into-glass-macro-shot-of-scotch-with-ice-cubes.mp4?s=mp4-480x480-is&k=20&c=zFjF53NMKlzOU3b4xqQ4297lL8PeaD8rARgH5E3-EDs=',
        ]
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, opacity }}>
      <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.2) brightness(0.9) contrast(1.15)' }}>
        {vids.map((src, i) => (
          <source key={i} src={src} type="video/mp4" />
        ))}
      </video>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(16px) saturate(120%)',
          WebkitBackdropFilter: 'blur(16px) saturate(120%)',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(5,5,5,0.50), rgba(5,5,5,0.70))',
        }}
      />
    </div>
  )
}
