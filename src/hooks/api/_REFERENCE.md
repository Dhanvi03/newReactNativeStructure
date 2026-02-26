/**
 * @file _REFERENCE.md
 * @description React Query quick reference — concepts only.
 */

// ═══════════════════════════════════════════════════════════════════
// WHICH HOOK TO USE
// ═══════════════════════════════════════════════════════════════════
//
//  READ  (GET)              → useQuery / useInfiniteQuery
//  WRITE (POST/PUT/DELETE)  → useMutation
//
//  useQuery                          useMutation
//  ────────                          ───────────
//  Runs automatically on mount       Runs only when mutate() called
//  Caches result automatically       No cache — you handle manually
//  params go in queryKey             params go in mutate({})
//  use for: lists, detail, profile   use for: login, create, update, delete


// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════
//
//  UseQueryResult   <TData,  TError>
//  UseMutationResult<TData,  TError,  TVariables,  TContext>
//                    ↓        ↓         ↓            ↓
//                 service   Error    mutate({})    unknown
//                 return             shape         (always)
//
//  useInfiniteQuery → skip return type, let TS infer


// ═══════════════════════════════════════════════════════════════════
// QUERY KEY RULES
// ═══════════════════════════════════════════════════════════════════
//
//  ['xxx']            → base key, whole list
//  ['xxx', params]    → separate cache per param combo (backend filter)
//  ['xxx', id]        → detail page cache
//  invalidate ['xxx'] → clears ALL above at once
//
//  params change based on user input → include params in key
//  filter done on frontend           → no params in key, fetch all once


// ═══════════════════════════════════════════════════════════════════
// onSuccess CACHE STRATEGY
// ═══════════════════════════════════════════════════════════════════
//
//  setQueryData      → write to cache directly, 0 API calls
//                      use when: you already have the new data
//
//  invalidateQueries → mark stale + refetch from server, 1 API call
//                      use when: you don't have full updated data
//
//  CREATE no pagination   → setQueryData + spread [...old, newItem]
//  CREATE with pagination → invalidateQueries (page order unknown)
//  UPDATE                 → setQueryData (you have updated item)
//  DELETE                 → setQueryData + filter (you know the id)


// ═══════════════════════════════════════════════════════════════════
// mutate vs mutateAsync
// ═══════════════════════════════════════════════════════════════════
//
//  mutate      → fire and forget, hook handles onSuccess/onError
//  mutateAsync → returns Promise, use when component needs to react after