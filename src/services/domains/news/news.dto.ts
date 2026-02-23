export interface NewsItemDTO {
  id: string;
  title: string;
  body: string;
  image_url: string;
  published_at: number;
  author: string;
}

export interface NewsListDTO {
  data: NewsItemDTO[];
  total: number;
  page: number;
  limit: number;
}
