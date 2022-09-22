import mongoose from 'mongoose';
import config from '../config';

let mainDb = config.mongoose.master_db;
const ObjectId = mongoose.Types.ObjectId;
let db: any;
let dbName: any;
let model: any;
const models = {
  admins: 'admins',
  tokens: 'tokens',
  users: 'users',
  categorys: 'categorys',
  brands: 'brands',
  products: 'products',
};

console.log(config.mongoose);
const dbClient = mongoose.createConnection(
  config.mongoose.url,
  config.mongoose.options,
);

dbClient.on('error', (err) => {
  console.error('MongoDB Connection Error>> : ', err);
});

dbClient.once('open', function () {
  console.log('MongoDB connected to ');
  mainDb = switchDb(config.mongoose.master_db);
  loadModels();
});

async function loadModels() {
  Object.keys(models).forEach(async (schema) => {
    mongoose.model(schema, require(`../models/${schema}`));
  });
}

function masterDb() {
  return mainDb;
}

function switchDb(dbName) {
  return dbClient.useDb(dbName, {
    useCache: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  });
}

function getModel(db, schema) {
  let model = db.model(schema, require(`../models/${schema}`));
  // delete db.models[schema];
  // delete db.collections[schema];
  // delete db.base.modelSchemas[schema];
  return model;
}

async function find({
  db,
  model,
  query,
  options,
  project,
  limit,
  skip,
  sort,
  populate,
}) {
  return await getModel(db, model)
    .find(query, project, options)
    .populate(populate)
    .limit(limit)
    .skip(skip)
    .sort(sort)
    .lean()
    .exec();
}
interface findOneIf {
  db: any;
  model: any;
  query?: any;
  project?: any;
  sort?: any;
}
async function findOne({ db, model, query, project, sort }: findOneIf) {
  return await getModel(db, model)
    .findOne(query, project)
    .sort(sort)
    .lean()
    .exec();
}
interface insertOneIf {
  db: any;
  model: any;
  document: any;
  options?: any;
}
async function insertOne({ db, model, document, options }: insertOneIf) {
  return await getModel(db, model).create(document, options);
}

async function insertMany({ db, model, documents, options }) {
  return await getModel(db, model).insertMany(documents, options);
}

async function updateOne({ db, model, query, update, options }) {
  return await getModel(db, model).updateOne(query, update, options).lean();
}

async function updateMany({ db, model, query, update, options }) {
  return await getModel(db, model).updateMany(query, update, options).lean();
}

interface deleteOneIf {
  db: any;
  model: any;
  query?: any;
  options?: any;
}
async function deleteOne({ db, model, query, options }: deleteOneIf) {
  return await getModel(db, model).deleteOne(query, options);
}

async function deleteMany({ db, model, query, options }) {
  return await getModel(db, model).deleteMany(query, options);
}

async function distinct({ db, model, field, query }) {
  return await getModel(db, model).distinct(field, query);
}

async function aggregate({ db, model, pipeline, options }) {
  return await getModel(db, model).aggregate(pipeline).exec();
}
async function aggregate2({ db, model, pipeline, populate, options }) {
  return await getModel(db, model)
    .aggregate(pipeline)
    .populate(populate)
    .exec();
}
async function countDocuments({ db, model, query }) {
  return await getModel(db, model).countDocuments(query).lean();
}

async function findByIdAndUpdate({ db, model, query, update, options }) {
  return await getModel(db, model)
    .findByIdAndUpdate(
      {
        _id: new ObjectId(query),
      },
      update,
      options,
    )
    .lean();
}

async function save({ db, model, document, options }) {
  return await getModel(db, model).create(document, options);
}

async function findByIdAndDelete({ db, model, id, options }) {
  return await getModel(db, model).deleteOne(
    {
      _id: new ObjectId(id),
    },
    options,
  );
}

async function findOneAndUpdate({ db, model, query, update, options }) {
  return await getModel(db, model)
    .findOneAndUpdate(query, update, options)
    .lean();
}

async function findOneAndDelete({ db, model, query, options }) {
  return await getModel(db, model).findOneAndDelete(query, options);
}

async function findAndModify({ db, model, query, update, options }) {
  return await getModel(db, model).findAndModify(query, update, options).lean();
}
function createDocument({ db, model, object }) {
  return getModel(db, model)(object);
}

function DB(dbName) {
  db = dbClient.useDb(dbName, {
    useCache: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  });

  dbName = dbName;
}

DB.prototype.model = function (modelName) {
  return new Model(db, modelName);
};

function Model(db, modelName) {
  model = db.model(modelName, require(`../models/${modelName}`));
  modelName = modelName;

  // delete db.models[modelName];
  // delete db.collections[modelName];
  // delete db.base.modelSchemas[modelName];
}

Model.prototype.find = async function ({
  query,
  select,
  limit,
  skip,
  sort,
  populate,
}) {
  return await model
    .find(query)
    .select(select)
    .populate(populate)
    .limit(limit)
    .skip(skip)
    .sort(sort)
    .lean()
    .exec();
};

Model.prototype.findOne = async function ({ query, select, sort, populate }) {
  try {
    return await model
      .findOne(query)
      .select(select)
      .populate(populate)
      .sort(sort)
      .lean()
      .exec();
  } catch (err) {
    console.log('err : ', err);
  }
};

Model.prototype.insertOne = async function ({ document, options }) {
  return await model.create(document, options);
};

Model.prototype.insertMany = async function ({ documents, options }) {
  return await model.insertMany(documents, options);
};

Model.prototype.updateOne = async function ({ query, update, options }) {
  return await model.updateOne(query, update, options).lean();
};

Model.prototype.updateMany = async function ({ query, update, options }) {
  return await model.updateMany(query, update, options).lean();
};

Model.prototype.deleteOne = async function ({ query, options }) {
  return await model.deleteOne(query, options);
};

Model.prototype.deleteMany = async function ({ query, options }) {
  return await model.deleteMany(query, options);
};

Model.prototype.distinct = async function ({ field, query }) {
  return await model.distinct(field, query);
};

Model.prototype.aggregate = async function ({ pipeline, options }) {
  return await model.aggregate(pipeline).exec();
};

Model.prototype.aggregate2 = async function ({ pipeline, populate, options }) {
  return await model.aggregate(pipeline).populate(populate).exec();
};

Model.prototype.countDocuments = async function ({ query }) {
  return await model.countDocuments(query).lean();
};

Model.prototype.findByIdAndUpdate = async function ({
  query,
  update,
  options,
}) {
  return await model
    .findByIdAndUpdate(
      {
        _id: new ObjectId(query),
      },
      update,
      options,
    )
    .lean();
};

Model.prototype.findAndModify = async function ({ query, update, options }) {
  console.log('?--------------------', query, update, options);
  return await model.findAndModify(query, update, options).lean();
};
Model.prototype.save = async function ({ document, options }) {
  return await model.create(document, options);
};

Model.prototype.findByIdAndDelete = async function ({ id, options }) {
  return await model.deleteOne(
    {
      _id: new ObjectId(id),
    },
    options,
  );
};

Model.prototype.findOneAndUpdate = async function ({
  query,
  update,
  options,
  populate,
}) {
  return await model
    .findOneAndUpdate(query, update, options)
    .populate(populate)
    .lean();
};

Model.prototype.findOneAndDelete = async function ({ query, options }) {
  return await model.findOneAndDelete(query, options);
};

Model.prototype.createDocument = function ({ object }) {
  return model(object);
};

Model.prototype.paginate = async function ({
  query,
  select,
  populate,
  limit = 20,
  page = 1,
  sort,
}) {
  const skip = (page - 1) * limit;

  const [totalResults, results] = await Promise.all([
    this.countDocuments({
      ...(query && { query }),
    }),
    this.find({
      ...(query && { query }),
      ...(select && { select }),
      ...(populate && { populate }),
      ...(limit && { limit }),
      ...(skip && { skip }),
      ...(sort && { sort }),
    }),
  ]);

  const totalPages = Math.ceil(totalResults / limit);

  return { results, page, limit, totalPages, totalResults };
};

const isValidObjectId = (str) => {
  if (!str) return false;
  let pattern = new RegExp('^[a-f0-9]{24}$');
  return pattern.test(str.toString());
};

let fmcg = new DB(config.mongoose.master_db);

const exportObject = {
  models,
  fmcg,
  ObjectId,
  isValidObjectId,
  masterDb,
  switchDb,
  getModel,
  find,
  findOne,
  insertOne,
  insertMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  distinct,
  aggregate,
  aggregate2,
  countDocuments,
  findByIdAndUpdate,
  findAndModify,
  save,
  findByIdAndDelete,
  findOneAndUpdate,
  findOneAndDelete,
  createDocument,
};

export = exportObject;
