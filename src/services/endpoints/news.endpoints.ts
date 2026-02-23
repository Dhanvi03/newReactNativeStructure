import { API_CURRENT_VERSION } from '@src/constants/apVersioni';

//IF THERE IS MULTIPLE VERSIONS, USE API_CURRENT_VERSION
const NEWS = `${API_CURRENT_VERSION}/news/`;

export const NEWS_ENDPOINTS = {
    LIST: `${NEWS}list`,
    DETAIL: (id: string) => `${NEWS}${id}`,
    CREATE: `${NEWS}create`,
    UPDATE: (id: string) => `${NEWS}${id}`,
    DELETE: (id: string) => `${NEWS}${id}`,
} as const;
