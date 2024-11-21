import { ProductSortByEnum } from '@/modules/product/types/product.enum';

export function getOrderByPrice(
  sortBy: ProductSortByEnum,
): ProductSortByEnum.asc | ProductSortByEnum.desc {
  let orderByPrice: ProductSortByEnum = ProductSortByEnum.asc;
  if (ProductSortByEnum.descending === sortBy) {
    orderByPrice = ProductSortByEnum.desc;
  }
  return orderByPrice;
}
