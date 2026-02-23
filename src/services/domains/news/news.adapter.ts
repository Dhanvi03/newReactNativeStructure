import { NewsItemDTO, NewsListDTO } from './news.dto';
import { NewsModel } from '@src/types/models/news.model';
import { PaginatedList } from '@src/utils/pagination';
import { calculatePaginationMeta } from '@src/utils/pagination';

export class NewsAdapter {
  static toDomainList(dto: NewsListDTO): PaginatedList<NewsModel> {
    return {
      data: dto.data.map((item) => this.toDomain(item)),
      meta: calculatePaginationMeta(dto.page, dto.limit, dto.total),
    };
  }

  static toDomain(item: NewsItemDTO): NewsModel {
    return {
      id: item.id,
      title: item.title,
      description: item.body || '',
      body: item.body,
      imageUrl: item.image_url,
      publishedAt: new Date(item.published_at * 1000),
      author: item.author,
    };
  }
}
