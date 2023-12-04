import { RedisClient } from '../../../app';

export function cacheRepository(redisClient: RedisClient) {

  const setCache = async ({
    key,
    expireTimeSec,
    data
  }: {
    key: string;
    expireTimeSec: number;
    data: string;
  }) => await redisClient.setEx(key, expireTimeSec, data);

  const getCache = async (key:string)=> await redisClient.get(key)

  const clearCache = async (key: string) => {
    const result = await redisClient.del(key);
    return result === 1;
  };

  const clearAllPreviousCache = async (key:string)=>{
    const cacheKeys = await redisClient.keys(`${key}:*`);
    if (cacheKeys.length > 0) {
      await redisClient.del(cacheKeys);
    }
  }



  return {
    setCache,
    getCache,
    clearCache,
    clearAllPreviousCache
  };
}

type CacheRepository = typeof cacheRepository;
export default CacheRepository