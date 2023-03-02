import React, { ReactElement, useMemo } from 'react'
import QRCodeUtil from 'qrcode'
import Image from 'next/image'
import clsx from 'clsx'

const generateMatrix = (
  value: string,
  errorCorrectionLevel: QRCodeUtil.QRCodeErrorCorrectionLevel
) => {
  const arr = Array.prototype.slice.call(
    QRCodeUtil.create(value, { errorCorrectionLevel }).modules.data,
    0
  )
  const sqrt = Math.sqrt(arr.length)
  return arr.reduce(
    (rows, key, index) =>
      (index % sqrt === 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    []
  )
}

type Props = {
  ecl?: QRCodeUtil.QRCodeErrorCorrectionLevel
  logoBackground?: string
  logoUrl?: string | (() => Promise<string>)
  logoMargin?: number
  logoSize?: number
  size?: number
  uri: string
  imagePath: string
}

export function QRCode({
  ecl = 'H',
  logoMargin = 10,
  logoSize = 50,
  size: sizeProp = 224,
  uri,
  imagePath
}: Props) {
  const padding = '16'
  const size = sizeProp - parseInt(padding, 10) * 2

  const dots = useMemo(() => {
    const dots: ReactElement[] = []
    const matrix = generateMatrix(uri, ecl)
    const cellSize = size / matrix.length
    let qrList = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 }
    ]

    qrList.forEach(({ x, y }) => {
      const x1 = (matrix.length - 7) * cellSize * x
      const y1 = (matrix.length - 7) * cellSize * y
      for (let i = 0; i < 3; i++) {
        dots.push(
          <rect
            fill={i % 2 !== 0 ? 'white' : 'black'}
            height={cellSize * (7 - i * 2)}
            key={`${i}-${x}-${y}`}
            rx={(i - 2) * -5 + (i === 0 ? 2 : 0)} // calculated border radius for corner squares
            ry={(i - 2) * -5 + (i === 0 ? 2 : 0)} // calculated border radius for corner squares
            width={cellSize * (7 - i * 2)}
            x={x1 + cellSize * i}
            y={y1 + cellSize * i}
          />
        )
      }
    })

    const clearArenaSize = Math.floor((logoSize + 25) / cellSize)
    // const clearArenaSize = 0
    const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2
    const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1

    matrix.forEach((row: QRCodeUtil.QRCode[], i: number) => {
      row.forEach((_: any, j: number) => {
        if (matrix[i][j]) {
          if (
            !(
              (i < 7 && j < 7) ||
              (i > matrix.length - 8 && j < 7) ||
              (i < 7 && j > matrix.length - 8)
            )
          ) {
            if (
              !(
                i > matrixMiddleStart &&
                i < matrixMiddleEnd &&
                j > matrixMiddleStart &&
                j < matrixMiddleEnd
              )
            ) {
              dots.push(
                <circle
                  cx={i * cellSize + cellSize / 2}
                  cy={j * cellSize + cellSize / 2}
                  fill="black"
                  key={`circle-${i}-${j}`}
                  r={cellSize / 3} // calculate size of single dots
                />
              )
            }
          }
        }
      })
    })

    return dots
  }, [ecl, logoSize, size, uri])

  const logoPosition = size / 2 - logoSize / 2
  const logoWrapperSize = logoSize + logoMargin * 2

  return (
    <div className="relative h-56 w-56 bg-white rounded-3xl px-4 py-4">
      <div
        className={clsx(
          'flex justify-center absolute mt-4 ml-4',
          // `h-[${logoSize}px] w-[${logoSize}px]`,
          // `top-[${logoPosition}px] left-[${logoPosition}px]`
          `h-[50px] w-[50px]`,
          `top-[71px] left-[71px]`
        )}
      >
        <Image src={imagePath} height={145} width={145} alt="QR Icon" />
      </div>
      <svg height={size} style={{ all: 'revert' }} width={size}>
        <defs>
          <clipPath id="clip-wrapper">
            <rect height={logoWrapperSize} width={logoWrapperSize} />
          </clipPath>
          <clipPath id="clip-logo">
            <rect height={logoSize} width={logoSize} />
          </clipPath>
        </defs>
        <rect fill="transparent" height={size} width={size} />
        {dots}
      </svg>
    </div>
  )
}
