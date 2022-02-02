export default function () {
    interface RGBA {
        r: number;
        g: number;
        b: number;
        a: number;
    }

    return {
      rgbToHex: (r, g, b) => {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      },
      hexToRgba: (hex) => {
        const result : RGBA = {
          r: parseInt(hex[0] === '#' ? hex.slice(1, 3) : hex.slice(0, 2), 16),
          g: parseInt(hex[0] === '#' ? hex.slice(3, 5) : hex.slice(2, 4), 16),
          b: parseInt(hex[0] === '#' ? hex.slice(5, 7) : hex.slice(4, 6), 16),
          a: 1,
        }
        return result
      },
    }
}