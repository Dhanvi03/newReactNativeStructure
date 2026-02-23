import { apiClient } from '@src/services/api/client';
import { NEWS_ENDPOINTS } from '@src/services/endpoints';
import { NewsListDTO } from './news.dto';
import { NewsAdapter } from './news.adapter';
import { NewsModel } from '@src/types/models/news.model';
import { PaginationParams, PaginatedList } from '@src/utils/pagination';

class NewsService {
  /**
   * Get news with pagination
   */
  async getNewsList(
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedList<NewsModel>> {
    try {
      const response = await apiClient.get<NewsListDTO>(NEWS_ENDPOINTS.LIST, {
        params: { page, limit },
      });
      return NewsAdapter.toDomainList(response.data);
    } catch (error) {
      console.error('Get news list error:', error);
      throw error;
    }
  }

  /**
   * Search news with pagination
   */
  async searchNews(
    query: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedList<NewsModel>> {
    try {
      const response = await apiClient.get<NewsListDTO>(NEWS_ENDPOINTS.LIST, {
        params: { search: query, page, limit },
      });
      return NewsAdapter.toDomainList(response.data);
    } catch (error) {
      console.error('Search news error:', error);
      throw error;
    }
  }

  /**
   * Get news by ID
   */
  async getNewsById(id: string): Promise<NewsModel> {
    try {
      const response = await apiClient.get(NEWS_ENDPOINTS.DETAIL(id));
      return NewsAdapter.toDomain(response.data);
    } catch (error) {
      console.error('Get news by ID error:', error);
      throw error;
    }
  }

  /**
   * Create news
   */
  async createNews(data: any): Promise<NewsModel> {
    try {
      const response = await apiClient.post(NEWS_ENDPOINTS.CREATE, data);
      return NewsAdapter.toDomain(response.data);
    } catch (error) {
      console.error('Create news error:', error);
      throw error;
    }
  }

  /**
   * Update news
   */
  async updateNews(id: string, data: any): Promise<NewsModel> {
    try {
      const response = await apiClient.put(NEWS_ENDPOINTS.UPDATE(id), data);
      return NewsAdapter.toDomain(response.data);
    } catch (error) {
      console.error('Update news error:', error);
      throw error;
    }
  }

  /**
   * Delete news
   */
  async deleteNews(id: string): Promise<void> {
    try {
      await apiClient.delete(NEWS_ENDPOINTS.DELETE(id));
    } catch (error) {
      console.error('Delete news error:', error);
      throw error;
    }
  }
}

export const newsService = new NewsService();
