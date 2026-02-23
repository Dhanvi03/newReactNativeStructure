// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import { zustandStorage } from './storage';
// import { NewsResult } from '@src/services';

// interface NewsStoreState {
//     news: NewsResult[];
//     setNews: (news: NewsResult[]) => void;
//     resetNewsData: () => void;
// }

// export const useNewsStore = create<NewsStoreState>()(
//     persist(
//         (set) => ({
//             news: [],
//             setNews: (news) => set({ news }),
//             resetNewsData: () => set({ news: [] }),
//         }),
//         {
//             name: 'newsData',
//             storage: createJSONStorage(() => zustandStorage),
//         }
//     )
// );