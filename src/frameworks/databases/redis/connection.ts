import ENV_CONFIG from '../../../config';
import { createClient } from 'redis'

const redisConnect = () => {
  const createRedisClient = () => {
    const client = createClient({
      url:ENV_CONFIG.REDIS_URL ,
    })
    client.on('error', err => console.log('Redis Client Error', err));
    client.connect().then(()=>{
      console.log("Redis connected successfully".bgRed.bold)
    }).catch((err)=>{
      console.log(err)
    })
    return client
    
  };

  return {
    createRedisClient
  };
}

export default redisConnect