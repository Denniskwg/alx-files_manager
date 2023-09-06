import dbClient from './utils/db';
import { ObjectId } from 'mongodb';

const collection2 = dbClient.client.db().collection('files');
const deleteResult = collection2.deleteMany({});

const obj = {
  type: 'folder',
  userId: new ObjectId('64f74afd05683f44dbc2b852'),
  isPublic: true,
  parentId: new ObjectId('5f1e881cc7ba06511e683b23')
}

const folder = collection2.insertOne(obj);
