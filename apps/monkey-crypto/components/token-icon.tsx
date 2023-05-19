"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Icon {
  height: number;
  src: string;
  width: number;
}
const TokenIcon = ({ symbol }: { symbol: string }) => {
  const [icon, setIcon] = useState<Icon>({ height: 32, width: 32, src: "" });

  useEffect(() => {
    const importIcon = async () => {
      try {
        const iconModule = await import(
          `cryptocurrency-icons/svg/color/${symbol.toLowerCase()}.svg`
        );

        const svgContent = iconModule.default;
        setIcon(svgContent);
      } catch (error) {
        console.error(`Error importing icon for symbol ${symbol}:`, error);
        // Import the generic icon as fallback
        const genericIconModule = await import(
          "cryptocurrency-icons/svg/color/generic.svg"
        );
        const genericSvgContent = genericIconModule.default;
        setIcon(genericSvgContent);
      }
    };

    importIcon();
  }, [symbol]);

  return (
    <Image
      src={icon?.src}
      alt="Token logo"
      width={icon.width}
      height={icon.height}
    />
  );
};

export default TokenIcon;
