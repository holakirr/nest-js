export default class ProductModel {
  img: string;

  title: string;

  price: number;

  prevPrice: number;

  credit: number;

  calculatedRating: number;

  description: string;

  advantages: string;

  disadvantages: string;

  categories: string[];

  tags: string[];

  characteristics: {
    [key: string]: string;
  };
}
