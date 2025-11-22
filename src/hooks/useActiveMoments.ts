import { useInfiniteQuery } from '@tanstack/react-query';
import { wallOfJoyApi } from '../api/wallOfJoyApi';

// export const useActiveMoments = (category: string = '') => {
//     return useInfiniteQuery({
//         queryKey: ['activeMoments', category],
//         queryFn: ({ pageParam = 1 }) => wallOfJoyApi.getActiveMoments(pageParam, 20, category),
//         getNextPageParam: (lastPage) => {
//             const { currentPage, totalPages } = lastPage.data;

//             // Ensure we have valid pagination data
//             if (currentPage !== undefined && totalPages !== undefined) {
//                 const current = parseInt(String(currentPage), 10);
//                 const total = parseInt(String(totalPages), 10);

//                 // If current page is less than total pages, fetch next page
//                 if (current < total) {
//                     return current + 1;
//                 }
//             }

//             // If we reached here, we are at the end or data is invalid
//             return undefined;
//         },
//         initialPageParam: 1,
//     });
// };

export const useActiveMoments = (category: string = '') => {
    return useInfiniteQuery({
        queryKey: ['activeMoments', category],

        queryFn: ({ pageParam = 1 }) =>
            wallOfJoyApi.getActiveMoments(pageParam, 20, category),

        // Correct pagination handling
        getNextPageParam: (lastPage) => {
            const { currentPage, totalPages } = lastPage.data;

            // Convert string to number
            const current = Number(currentPage);
            const total = Number(totalPages);

            if (!current || !total) return undefined;

            // If more pages exist → return next page number
            return current < total ? current + 1 : undefined;
        },

        initialPageParam: 1,
    });
};
