export default function () {
  interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
  }

  return {
    rgbaToHex: (rgba: RGBA): string => {
      return (
        '#' +
        ((1 << 24) + (rgba.r << 16) + (rgba.g << 8) + rgba.b)
          .toString(16)
          .slice(1)
      );
    },
    rgbaToString: (rgba: RGBA): string => {
      return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
    },
    hexToRgba: (hex: string): RGBA => {
      return {
        r: parseInt(hex[0] === '#' ? hex.slice(1, 3) : hex.slice(0, 2), 16),
        g: parseInt(hex[0] === '#' ? hex.slice(3, 5) : hex.slice(2, 4), 16),
        b: parseInt(hex[0] === '#' ? hex.slice(5, 7) : hex.slice(4, 6), 16),
        a: 1,
      };
    },
  };
}
