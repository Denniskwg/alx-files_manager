import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class UsersController {
  static async postNew(request, response) {
    let bodyData = '';
    request.on('data', (chunk) => {
      bodyData += chunk;
    });
    await bodyData;
    const parsed = JSON.parse(bodyData);
    const { email } = parsed;
    if (!email) {
      response.status(400).json({ error: 'Missing email' });
      return;
    }

    const { password } = parsed;
    if (!password) {
      response.status(400).json({ error: 'Missing password' });
      return;
    }
    const collection = dbClient.client.db().collection('users');

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      response.status(400).json({ error: 'Already exist' });
      return;
    }

    const data = await collection.insertOne({ email, password: sha1(password) });
    const userId = data.insertedId.toString();
    response.status(201).json({ email, id: userId });
  }

  static async getMe(request, response) {
    const token = request.headers['x-token'];
    const key = `auth_${token}`;
    const id = await redisClient.get(key);
    const collection = dbClient.client.db().collection('users');
    const existingUser = await collection.findOne({ _id: new ObjectId(id) });
    if (!existingUser) {
      response.status(401).json({ error: 'Unauthorized' });
      return;
    }
    response.json({ email: existingUser.email, id: existingUser._id.toString() });
  }
}

module.exports = UsersController;
