import { API_CURRENT_VERSION } from '@src/constants/apVersioni';

const USER = `${API_CURRENT_VERSION}/user/`;

export const USER_ENDPOINTS = {
    PROFILE: `${USER}profile`,
    UPDATE: `${USER}update`,
    SETTINGS: `${USER}settings`,
} as const;
