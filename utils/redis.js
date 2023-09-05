import redis from 'redis';

class RedisClient {
  constructor() {
    const client = redis.createClient();
    this.value = true;
    client.on('error', (err) => {
      console.log(err);
      this.value = false;
    });
    client.on('connect', () => {
      this.value = true;
    });
    this.client = client;
  }

  isAlive() {
    return this.value;
  }

  async get(key) {
    const val = new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          reject(null);
        } else {
          resolve(value);
        }
      });
    });
    return val;
  }

  async set(key, value, time) {
    this.client.set(key, value, () => {
      this.client.expire(key, time);
    });
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
