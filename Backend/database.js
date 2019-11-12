import MongoClient from 'mongodb';
const DB_URL = "mongodb://admin:admin1@ds345028.mlab.com:45028/etl";

let db = null;

export default {
  init: () => MongoClient.connect(DB_URL).then(conn => {
    db = conn.db('etl');
    return Promise.resolve();
  })
  ,
  insertExtracted: (data) => {
    return db.collection('extracted')
      .insertMany(data)
  },
  insertTransformed: (data) => {
    return db.collection('transformed')
      .insertMany(data)
  },
  clearExtracted: () => {
    return db.collection('extracted').deleteMany({})
  },
  clearTransformed: () => {
    return db.collection('transformed').deleteMany({})
  },
  getExtracted: () => {
    return db.collection('extracted').find({}).toArray()
  },
  getTransformed: () => {
    return db.collection('transformed').find({}).toArray()
  },
}

