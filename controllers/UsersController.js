import sha1 from 'sha1';
import DBClient from '../utils/db';

class UsersController {
  static async postNew(request, response) {
    const email = request.body ? request.body.email : null;
    console.log(request);
    if (!email) {
      const status = { error: 'Missing email' };
      response.status(400).json(status);
      return;
    }

    const password = request.body ? request.body.password : null;
    if (!password) {
      const status = { error: 'Missing password' };
      response.status(400).json(status);
      return;
    }
    const collection = DBClient.client.db().collection('users');

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      const status = { error: 'Already exist' };
      response.status(400).json(status);
      return;
    }

    const data = await collection.insertOne({ email, password: sha1(password) });
    const userId = data.insertedId.toString();
    response.status(201).json({ email, id: userId });
  }
}

module.exports = UsersController;
