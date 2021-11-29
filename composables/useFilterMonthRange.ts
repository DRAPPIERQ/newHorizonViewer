export default function () {
    const getSvgIcon = (attributes, ...childrens) => h(
            "svg",
            {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                ...attributes
            },
            childrens,
        );

    return {
        slug: "month-range",
        label: "Month range",
        icon: getSvgIcon(
                {
                    class: "h-6 w-6 text-blueGray-800",
                    fill: "none",
                    stroke: "currentColor",
                },
                h(
                    "path",
                    {
                        'stroke-linecap': "round",
                        'stroke-linejoin': "round",
                        'stroke-width': "1.5",
                        d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    }
                ),
            ),
        range: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((monthNb) => ({
          id: monthNb,
          label: new Date(0, monthNb - 1).toLocaleString("en", {
            month: "long",
          }),
        })),
        cumulative: false,
      }
}