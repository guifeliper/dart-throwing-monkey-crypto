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
          `cryptocurrency-icons/svg/black/${symbol.toLowerCase()}.svg`
        );

        const svgContent = iconModule.default;
        console.log(svgContent);
        setIcon(svgContent);
      } catch (error) {
        console.error(`Error importing icon for symbol ${symbol}:`, error);
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
