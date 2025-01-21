import { useState, useCallback } from "react";

type MatchedColors = {
  mainColor: string;
  secondColor: string;
};

const isContrastAcceptable = (bgColor: string, textColor: string): boolean => {
  const getLuminance = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const a = [r, g, b].map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );

    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  };

  const luminance1 = getLuminance(bgColor);
  const luminance2 = getLuminance(textColor);

  const contrastRatio =
    luminance1 > luminance2
      ? (luminance1 + 0.05) / (luminance2 + 0.05)
      : (luminance2 + 0.05) / (luminance1 + 0.05);

  return contrastRatio >= 4.5;
};

export const useColor = () => {
  const [matchedColors, setMatchedColors] = useState<MatchedColors>();
  // const [contrastingColor, setContrastingColor] = useState<string>();

  const generateRandomColor = (): string => {
    const hexChars = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * hexChars.length);
      color += hexChars[randomIndex];
    }

    return color;
  };

  const generateNewColor = useCallback(() => {
    const newColor = generateRandomColor();
    // setMatchedColors({mainColor: newColor});

    let newContrastingColor;
    do {
      newContrastingColor = generateRandomColor();
    } while (!isContrastAcceptable(newColor, newContrastingColor));

    setMatchedColors({ mainColor: newColor, secondColor: newContrastingColor });
  }, []);

  return { matchedColors, generateNewColor };
};
