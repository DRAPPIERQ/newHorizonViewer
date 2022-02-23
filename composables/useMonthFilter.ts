export default function (months: Array<number>, isSouth: boolean) {
  const item = ref({
    type: 'single',
    isSouth,
    hemisphere: isSouth ? 'South' : 'North',
    values: [],
    setMonthFrom(id: number): void {
      this.values[0] = {
        id,
        name: new Date(0, id).toLocaleString('en', { month: 'long' }),
        shortName: new Date(0, id).toLocaleString('en', { month: 'short' }),
      };
    },
    setMonthTo(id: number): void {
      if (this.values[0].id != id) {
        this.values[1] = {
          id,
          name: new Date(0, id).toLocaleString('en', { month: 'long' }),
          shortName: new Date(0, id).toLocaleString('en', { month: 'short' }),
        };
      }
    },
    setHemisphere(isSouth: boolean): void {
      this.isSouth = isSouth;
      this.hemisphere = isSouth ? 'South' : 'North';
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
