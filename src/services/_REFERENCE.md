# API Layer Reference

> How API calls are structured in this project.
> Read before adding a new domain.

---

## Index
- [Architecture Flow](#architecture-flow)
- [Type Locations](#type-locations)
- [Adding New Domain](#adding-new-domain)
- [Endpoints](#endpoints)
- [Types](#types)
- [DTO](#dto)
- [Model](#model)
- [Adapter](#adapter)
- [Service](#service)
- [Interceptor](#interceptor)
- [Error Handling](#error-handling)
- [HTTP Methods Cheatsheet](#http-methods-cheatsheet)

---

## Architecture Flow

```
Hook (useQuery/useMutation)
      ↓
Service → calls apiClient
      ↓
Adapter → converts DTO to Model
      ↓
apiClient (axios)
      ↓
Interceptor → adds headers, encrypts, handles 401
      ↓
Backend API
```

---

## Type Locations

Two separate locations — never mix them:

```
src/services/domains/xxx/   → backend-facing types
├── xxx.dto.ts              → raw API response shape  (what backend sends)
└── xxx.types.ts            → request param shapes    (what you send)

src/types/models/           → frontend-facing types
└── xxx.model.ts            → clean app shape         (what components use)
```

**Rule:** components and hooks only ever see `Model` types — never `DTO` types.

```
Backend → DTO → Adapter → Model → Hook → Component
                   ↑
           only place DTO is used
```

---

## Adding New Domain

Follow this order every time — no skipping steps:

```
1. src/services/endpoints/xxx.endpoints.ts   → URL constants
2. src/services/domains/xxx/xxx.types.ts     → request param shapes
3. src/services/domains/xxx/xxx.dto.ts       → raw API response shape
4. src/types/models/xxx.model.ts             → clean frontend shape
5. src/services/domains/xxx/xxx.adapter.ts   → DTO → Model conversion
6. src/services/domains/xxx/xxx.service.ts   → apiClient calls
7. src/hooks/api/useXxx.ts                   → useQuery or useMutation
```

---

## Endpoints

```
services/endpoints/xxx.endpoints.ts

Rule: never hardcode URLs in service or hook
Rule: always build from CONFIG.API_URL
```

```
LIST   → GET    all items
CREATE → POST   new item
UPDATE → PUT    existing item
DELETE → DELETE item by id
DETAIL → GET    single item by id
```

---

## Types

```
services/domains/xxx/xxx.types.ts — request shapes only (what YOU send to API)

Params suffix  → read operations  (XxxParams)
Param suffix   → write operations (CreateXxxParam, UpdateXxxParam)
```

---

## DTO

```
services/domains/xxx/xxx.dto.ts — raw API response shape (what BACKEND sends)

Rule: never use DTO outside the adapter
Rule: if backend returns array directly → use XxxDto[]
Rule: if backend wraps in object → { data: XxxDto[], total: number }
```

---

## Model

```
types/models/xxx.model.ts — clean frontend shape (what components use)

Rule: this is the only type hooks and components import
Rule: never import DTO in a hook or component
Rule: field names here are camelCase for your app
     even if backend sends snake_case — adapter handles the mapping
```

---

## Adapter

```
services/domains/xxx/xxx.adapter.ts — converts DTO → Model

toModelList(dto[])  → for GET list  (array input, array output)
toModel(dto)        → for GET detail, POST, PUT (single input, single output)

Rule: all field mapping happens HERE — nowhere else
Rule: if backend renames a field → only change adapter, nothing else breaks
```

---

## Service

```
services/domains/xxx/xxx.service.ts — calls apiClient, returns clean Model

GET    → apiClient.get(ENDPOINT, { params })
POST   → apiClient.post(ENDPOINT, payload)
PUT    → apiClient.put(ENDPOINT, payload, { params: { id } })
DELETE → apiClient.delete(ENDPOINT, { params: { id } })

Rule: always throw error after console.error — never swallow it
Rule: return Model not DTO — adapter converts before return
```

---

## Interceptor

Runs automatically on every request and response — you never call it manually.

**Request interceptor** — fires BEFORE request leaves the app:
```
1. Check internet connection → reject immediately if offline
2. Add headers              → Accept-Language, X-API-Key
3. Encrypt request body     → encryptText(config.data)
4. Log in dev mode          → 🚀 POST /auth/login
```

**Response interceptor** — fires BEFORE your code gets the response:
```
Success (2xx):
  Decrypt response data → decryptText(response.data)
  Log in dev mode       → ✅ 200 /auth/login

Error (4xx/5xx):
  401 → showMessage "Session Expired" + reset(Screen.LOGIN)
  403 → log warning only
  all → return Promise.reject(error) → bubbles to QueryCache/MutationCache
```

> Related file: `services/api/interceptors.ts`

---

## Error Handling

```
Service throws error
      ↓
Interceptor checks status
  401 → flash message + navigate to Login  ← handled here, stop
  403 → log only                           ← handled here, stop
  other → Promise.reject(error)            ← bubbles up
      ↓
QueryCache / MutationCache.onError
  401/403 → skip (already handled by interceptor)
  other   → global flash message
      ↓
onError in hook (optional)
  only for screen-specific behavior
  e.g. highlight field, scroll to top
```

> Rule: never show error UI in the service — throw and let the layers above handle it.
> Rule: do not add `onError` to every hook — `MutationCache` already covers global messages.

---

## HTTP Methods Cheatsheet

```
params  → goes in URL query string  ?page=1&limit=10
data    → goes in request body      { title: 'Nike', price: 100 }

GET    → params only   (no body)
POST   → data in body  + optional params
PUT    → data in body  + id in params
DELETE → id in params  (no body)
```