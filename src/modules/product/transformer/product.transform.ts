export class ColumnNumericTransformer {
  to(data: number) {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}
