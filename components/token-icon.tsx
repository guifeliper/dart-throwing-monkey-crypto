"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import DefaultIcon from "cryptocurrency-icons/svg/color/generic.svg"

interface Icon {
  height: number
  src: string
  width: number
}
const TokenIcon = ({ symbol }: { symbol: string }) => {
  const [icon, setIcon] = useState<Icon>({
    height: 32,
    width: 32,
    src: DefaultIcon.src,
  })

  useEffect(() => {
    const importIcon = async () => {
      try {
        const iconModule = await import(
          `cryptocurrency-icons/svg/color/${symbol.toLowerCase()}.svg`
        )

        const svgContent = iconModule.default
        setIcon(svgContent)
      } catch (error) {
        console.error(`Error importing icon for symbol ${symbol}:`, error)
      }
    }

    importIcon()
  }, [symbol])

  return (
    <Image
      src={icon?.src}
      alt={`${symbol} token logo`}
      width={icon.width}
      height={icon.height}
    />
  )
}

export default TokenIcon
