export enum TopLevelCategory {
  Courses = "Courses",
  Services = "Services",
  Books = "Books",
  Products = "Products"
}

export default class TopPageModel {
  _id: string;
  firstLevelCategory: TopLevelCategory;
  secondCategory: string;
  alias: string;
  title: string;
  pageCategory: string;
  hh?: {
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
  };
  advantages: {
    title: string;
    description: string;
  }[];
  seoText: string;
  tagsTitle: string;
  tags: string[];
}
