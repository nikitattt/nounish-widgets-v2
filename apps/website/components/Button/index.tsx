export const Button = ({
  onClick,
  color = '#000000',
  opacity = 0.15,
  children
}: {
  onClick: () => void
  color?: string
  opacity?: number
  children: React.ReactNode
}) => {
  const opacityHex = Math.floor(opacity * 255)
    .toString(16)
    .padStart(2, '0')
  const backgroundColor = `${color}${opacityHex}`

  return (
    <button
      className="cursor-pointer px-8 py-2 rounded-xl font-extrabold"
      onClick={onClick}
      style={{ backgroundColor, color: color }}
    >
      {children}
    </button>
  )
}
