export default function (months: Array<number>, isSouth: boolean) {
  const item = ref({
    type: 'single',
    isSouth,
    hemisphere: isSouth ? 'South' : 'North',
    values: [],
    setMonthFrom(id: number): void {
      this.values[0] = {
        id,
        name: new Date(0, id - 1).toLocaleString('en', { month: 'long' }),
        shortName: new Date(0, id - 1).toLocaleString('en', { month: 'short' }),
      };
    },
    setMonthTo(id: number): void {
      this.values[1] = {
        id,
        name: new Date(0, id - 1).toLocaleString('en', { month: 'long' }),
        shortName: new Date(0, id - 1).toLocaleString('en', { month: 'short' }),
      };
    },
    setHemisphere(isSouth: boolean): void {
      this.isSouth = isSouth;
      this.hemisphere = isSouth ? 'South' : 'North';
    },
    getMonthRange(): Array<number> {
      return Array(12)
        .fill()
        .map((_, idx) => idx + 1)
        .filter((i) => {
          if (parseInt(this.values[1].id) === parseInt(this.values[0].id)) {
            return (
              i == parseInt(this.values[0].id) &&
              i == parseInt(this.values[1].id)
            );
          } else {
            return parseInt(this.values[1].id) > parseInt(this.values[0].id)
              ? i >= parseInt(this.values[0].id) &&
                  i <= parseInt(this.values[1].id)
              : !(
                  i >= parseInt(this.values[1].id) &&
                  i <= parseInt(this.values[0].id)
                ) ||
                  i == parseInt(this.values[0].id) ||
                  i == parseInt(this.values[1].id);
          }
        });
    },
  });

  if (months[0]) {
    item.value.setMonthFrom(months[0]);
  }
  if (months[1]) {
    item.value.setMonthTo(months[1]);
  }

  return item;
}
