// import { useStore } from "@/store/store";
// import { useState, useCallback } from "react";

// type MatchedColors = {
//   mainColor: string;
//   secondColor: string;
// };

// const isContrastAcceptable = (bgColor: string, textColor: string): boolean => {
//   const getLuminance = (color: string) => {
//     let r, g, b;

//     if (color.startsWith("#")) {
//       r = parseInt(color.slice(1, 3), 16) / 255;
//       g = parseInt(color.slice(3, 5), 16) / 255;
//       b = parseInt(color.slice(5, 7), 16) / 255;
//     } else {
//       const [rRaw, gRaw, bRaw] = color
//         .slice(4, -1)
//         .split(",")
//         .map((value) => parseInt(value.trim()) / 255);
//       r = rRaw;
//       g = gRaw;
//       b = bRaw;
//     }

//     const a = [r, g, b].map((v) =>
//       v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
//     );

//     return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
//   };

//   const luminance1 = getLuminance(bgColor);
//   const luminance2 = getLuminance(textColor);

//   const contrastRatio =
//     luminance1 > luminance2
//       ? (luminance1 + 0.05) / (luminance2 + 0.05)
//       : (luminance2 + 0.05) / (luminance1 + 0.05);

//   return contrastRatio >= 4.5;
// };

// const generateRandomHexColor = (): string => {
//   const hexChars = "0123456789ABCDEF";
//   let color = "#";

//   for (let i = 0; i < 6; i++) {
//     const randomIndex = Math.floor(Math.random() * hexChars.length);
//     color += hexChars[randomIndex];
//   }

//   return color;
// };

// const generateRandomRgbColor = (): string => {
//   const r = Math.floor(Math.random() * 256);
//   const g = Math.floor(Math.random() * 256);
//   const b = Math.floor(Math.random() * 256);
//   return `rgb(${r}, ${g}, ${b})`;
// };

// export const useColor = () => {
//   const [matchedColors, setMatchedColors] = useState<MatchedColors>();
//   const generatingMode = useStore((state) => state.generatingMode);
//   const offColors = useStore((state) => state.offColors);

//   const generateNewColor = useCallback(() => {
//     const generateColor =
//       generatingMode === "hex"
//         ? generateRandomHexColor
//         : generateRandomRgbColor;

//     const newColor = generateColor();

//     let newContrastingColor;
//     do {
//       newContrastingColor = generateColor();
//     } while (!isContrastAcceptable(newColor, newContrastingColor));

//     setMatchedColors({ mainColor: newColor, secondColor: newContrastingColor });
//   }, [generatingMode]);

//   return { matchedColors, generateNewColor };
// };

import { useStore } from "@/store/store";
import { useState, useCallback } from "react";

type MatchedColors = {
  mainColor: string;
  secondColor: string;
};

const isContrastAcceptable = (bgColor: string, textColor: string): boolean => {
  const getLuminance = (color: string) => {
    let r, g, b;

    if (color.startsWith("#")) {
      r = parseInt(color.slice(1, 3), 16) / 255;
      g = parseInt(color.slice(3, 5), 16) / 255;
      b = parseInt(color.slice(5, 7), 16) / 255;
    } else {
      const [rRaw, gRaw, bRaw] = color
        .slice(4, -1)
        .split(",")
        .map((value) => parseInt(value.trim()) / 255);
      r = rRaw;
      g = gRaw;
      b = bRaw;
    }

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

const generateRandomHexColor = (offColors: {
  Red: boolean;
  Green: boolean;
  Blue: boolean;
}): string => {
  const hexChars = "0123456789ABCDEF";

  const isOnlyOneColorAllowed =
    Object.values(offColors).filter((v) => !v).length === 1;

  let color = "#";
  for (let i = 0; i < 6; i += 2) {
    const randomIndex = Math.floor(Math.random() * hexChars.length);
    let component = parseInt(hexChars[randomIndex] + hexChars[randomIndex], 16);

    if (i === 0 && offColors.Red) component = 0; // R
    if (i === 2 && offColors.Green) component = 0; // G
    if (i === 4 && offColors.Blue) component = 0; // B

    if (isOnlyOneColorAllowed) {
      if (i === 0 && !offColors.Red) component = 255; // Red
      if (i === 2 && !offColors.Green) component = 255; // Green
      if (i === 4 && !offColors.Blue) component = 255; // Blue
    }

    color += component.toString(16).padStart(2, "0").toUpperCase();
  }

  return color;
};

const generateRandomRgbColor = (offColors: {
  Red: boolean;
  Green: boolean;
  Blue: boolean;
}): string => {
  const isOnlyOneColorAllowed =
    Object.values(offColors).filter((v) => !v).length === 1;

  const r = offColors.Red
    ? 0
    : isOnlyOneColorAllowed && !offColors.Red
      ? 255
      : Math.floor(Math.random() * 256);
  const g = offColors.Green
    ? 0
    : isOnlyOneColorAllowed && !offColors.Green
      ? 255
      : Math.floor(Math.random() * 256);
  const b = offColors.Blue
    ? 0
    : isOnlyOneColorAllowed && !offColors.Blue
      ? 255
      : Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
};

export const useColor = () => {
  const [matchedColors, setMatchedColors] = useState<MatchedColors>();
  const generatingMode = useStore((state) => state.generatingMode);
  const offColors = useStore((state) => state.offColors);

  const generateNewColor = useCallback(() => {
    const generateColor =
      generatingMode === "hex"
        ? () => generateRandomHexColor(offColors)
        : () => generateRandomRgbColor(offColors);

    const MAX_ATTEMPTS = 50;
    let attempts = 0;

    let newColor, newContrastingColor;
    do {
      newColor = generateColor();
      newContrastingColor = generateColor();
      attempts++;

      if (attempts > MAX_ATTEMPTS) {
        console.warn(
          "Too many attempts to generate contrasting colors. Falling back to default."
        );
        break;
      }
    } while (!isContrastAcceptable(newColor, newContrastingColor));

    setMatchedColors({ mainColor: newColor, secondColor: newContrastingColor });
  }, [generatingMode, offColors]);

  return { matchedColors, generateNewColor };
};
