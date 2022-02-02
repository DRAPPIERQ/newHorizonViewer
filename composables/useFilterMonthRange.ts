export default function () {
    const range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      .map((monthNb) => ({
        id: monthNb,
        label: new Date(0, monthNb - 1).toLocaleString("en", {
          month: "long",
        }),
      }))
    return {
        slug: "month-range",
        type: "time-range",
        label: "Month range",
        range,
        cumulative: false,
        getRange: (from, to) => (range.filter((month) => {
              if (from > to) {
                return month.id <= from || month.id >= to
              }
              return month.id >= from && month.id <= to 
        })),
      }
}