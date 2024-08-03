export interface Comic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: TextObjects[];
  resourceURI: string;
  urls: URL[];
  series: Series;
  variants: [];
  collections: Series[];
  collectedIssues: [];
  dates: DateElement[];
  prices: Price[];
  thumbnail: Thumbnail;
  images: Thumbnail[];
  creators: Creators;
  characters: Characters;
  stories: Stories;
  events: Events;
}

export interface TextObjects {
  type: string;
  language: string;
  text: string;
}

export interface Characters {
  available: number;
  collectionURI: string;
  items: Series[];
  returned: number;
}

export interface Series {
  resourceURI: string;
  name: string;
}

export interface Creators {
  available: number;
  collectionURI: string;
  items: CreatorsItem[];
  returned: number;
}

export interface CreatorsItem {
  resourceURI: string;
  name: string;
  role: string;
}

export interface DateElement {
  type: string;
  date: string;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Price {
  type: string;
  price: number;
}

export interface Stories {
  available: number;
  collectionURI: string;
  items: StoriesItem[];
  returned: number;
}

export interface StoriesItem {
  resourceURI: string;
  name: string;
  type: string;
}

export interface URL {
  type: string;
  url: string;
}

export interface Events {
  available: number;
  collectionURI: string;
  items: Series[];
  returned: number;
}
