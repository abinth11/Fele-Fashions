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



  return {
    setCache,
    getCache,
    clearCache,
  };
}

type CacheRepository = typeof cacheRepository;
export default CacheRepository