import { useState } from 'react'

const MYX_PLAYLIST = [
  'https://media.istockphoto.com/id/1590104155/pt/v%C3%ADdeo/golden-whiskey-being-poured-from-transparent-bottle-on-a-warm-brown-wooden-background-in-slow.mp4?s=mp4-640x640-is&k=20&c=HsxuYixMq0s95oxGP6iD97VpWDUZ7iPviDorYvZZ7eA=',
  'https://media.istockphoto.com/id/996232536/pt/v%C3%ADdeo/slow-motion-pour-bourbon-into-a-glass-of-ice.mp4?s=mp4-640x640-is&k=20&c=go7Sw8FmPDb-MjJXEYH7BKFoEcZHNfzB4cqRBSBfqQw=',
  'https://media.istockphoto.com/id/1130890939/pt/v%C3%ADdeo/whiskey-on-the-rocks-in-old-fashion-glass.mp4?s=mp4-480x480-is&k=20&c=x3LRmk0WbWw-yj_TfLnnnPGNqNJ6_9EWWQCAHIQGG4U=',
  'https://media.istockphoto.com/id/1255734992/pt/v%C3%ADdeo/pouring-whiskey-or-rum-into-glass-macro-shot-of-scotch-with-ice-cubes.mp4?s=mp4-480x480-is&k=20&c=zFjF53NMKlzOU3b4xqQ4297lL8PeaD8rARgH5E3-EDs=',
]

export function CinematicBackground() {
  const [currentTrack, setCurrentTrack] = useState(0)

  const nextVideo = () => {
    setCurrentTrack((prev) => (prev + 1) % MYX_PLAYLIST.length)
  }

  return (
    <div className="myx-bg">
      <div className="myx-bg-overlay" />
      <div className="myx-bg-gradient" />
      <video
        key={MYX_PLAYLIST[currentTrack]}
        autoPlay
        muted
        playsInline
        onEnded={nextVideo}
        className="myx-video"
      >
        <source src={MYX_PLAYLIST[currentTrack]} type="video/mp4" />
      </video>
    </div>
  )
}
