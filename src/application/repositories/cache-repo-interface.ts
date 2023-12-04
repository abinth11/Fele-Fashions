import CacheRepository from "../../frameworks/databases/redis/cache-repository";

export const cacheRepositoryInterface = (repository: ReturnType<CacheRepository>) => {

    const setCache = ({
        key,
        expireTimeSec,
        data
    }: {
        key: string;
        expireTimeSec: number;
        data: string;
    }) => repository.setCache({ key, expireTimeSec, data })

    const getCache = (key:string) => repository.getCache(key)

    const clearCache = (key: string) => repository.clearCache(key)

    const clearAllPreviousCache = (key:string) => repository.clearAllPreviousCache(key)

    return {
        setCache,
        getCache,
        clearCache,
        clearAllPreviousCache
    }

}

type CacheRepositoryInterface = typeof cacheRepositoryInterface
export default CacheRepositoryInterface