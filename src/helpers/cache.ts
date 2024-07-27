import { useEffect, useRef, useReducer } from 'react'

type FetchStatus = 'idle' | 'fetching' | 'fetched' | 'error';

interface State<T> {
  status: FetchStatus;
  error: string | null;
  data: T|null;
  notFound?: boolean;
}

interface FetchingAction {
  type: 'FETCHING';
}

interface FetchedAction<T> {
  type: 'FETCHED';
  payload: T;
}

interface FetchErrorAction {
  type: 'FETCH_ERROR';
  payload: {
    message: string;
    notFound?: boolean;
  };
}

type Action<T> = FetchingAction | FetchedAction<T> | FetchErrorAction;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export const useApi = <T>(api: string | undefined) => {
  const initialState: State<T> = {
    status: 'idle',
    error: null,
    data: null,
  }

  const [state, dispatch] = useReducer((state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, status: 'fetching' }
      case 'FETCHED':
        return { ...initialState, status: 'fetched', data: action.payload }
      case 'FETCH_ERROR':
        return { ...initialState, status: 'error', error: action.payload.message, notFound: action.payload.notFound }
      default:
        return state
    }
  }, initialState)

  useEffect(() => {
    let revokeRequest = false
    const cacheLifetime = 5 * 60 * 1000 // 5 minutos en milisegundos
    const currentTime = new Date().getTime()

    if (!api || !api.trim()) return

    const cacheKey = `cache_${api}`

    const loadFromCache = () => {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        const { data, timestamp }: CacheEntry<T> = JSON.parse(cached)
        if (currentTime - timestamp < cacheLifetime) {
          return data
        }
      }
      return null
    }

    const renderData = async () => {
      dispatch({ type: 'FETCHING' })

      const cachedData = loadFromCache()
      if (cachedData) {
        dispatch({ type: 'FETCHED', payload: cachedData })
      } else {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${api}`)
          const data = await res.json()
          
          if (!res.ok) {
            const errorPayload: { message: string, notFound?: boolean } = {
              message: `Error: ${res.statusText}`
            }
            if (res.status === 404) {
              errorPayload.notFound = true
            }
            throw errorPayload
          }

          localStorage.setItem(cacheKey, JSON.stringify({
            data,
            timestamp: currentTime
          }))
          if (revokeRequest) return
          dispatch({ type: 'FETCHED', payload: data })
        } catch (error) {
          if (revokeRequest) return
          dispatch({ type: 'FETCH_ERROR', payload: error as { message: string, notFound?: boolean } })
        }
      }
    }

    renderData()

    return function cleanup() {
      revokeRequest = true
    }
  }, [api])

  return state
}
