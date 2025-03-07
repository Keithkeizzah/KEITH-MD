"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Database: () => Database,
  MongoDriver: () => MongoDriver,
  Util: () => Util,
  docSchema: () => docSchema
});
module.exports = __toCommonJS(src_exports);

// src/collection.ts
var import_mongoose = __toESM(require("mongoose"));
var docSchema = new import_mongoose.default.Schema(
  {
    ID: {
      type: import_mongoose.default.SchemaTypes.String,
      required: true,
      unique: true
    },
    data: {
      type: import_mongoose.default.SchemaTypes.Mixed,
      required: false
    },
    expireAt: {
      type: import_mongoose.default.SchemaTypes.Date,
      required: false,
      default: null
    }
  },
  {
    timestamps: true
  }
);
function modelSchema(connection, modelName = "JSON") {
  const model = connection.model(modelName, docSchema);
  model.collection.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 }).catch(() => {
  });
  return model;
}

// src/Database.ts
var import_mongoose2 = __toESM(require("mongoose"));
var import_tiny_typed_emitter = require("tiny-typed-emitter");

// src/Util.ts
var import_lodash = __toESM(require("lodash"));
var Util = class extends null {
  constructor() {
  }
  static v(k, type, fallback) {
    return typeof k === type && !!k ? k : fallback;
  }
  static pick(holder, id) {
    if (!holder || typeof holder !== "object")
      return holder;
    if (!id || typeof id !== "string" || !id.includes("."))
      return holder;
    const keysMeta = Util.getKeyMetadata(id);
    return import_lodash.default.get(Object.assign({}, holder), keysMeta.target);
  }
  static getKey(key) {
    return key.split(".").shift();
  }
  static getKeyMetadata(key) {
    const [master, ...child] = key.split(".");
    return {
      master,
      child,
      target: child.join(".")
    };
  }
  static shouldExpire(dur) {
    if (typeof dur !== "number")
      return false;
    if (dur > Infinity || dur <= 0 || Number.isNaN(dur))
      return false;
    return true;
  }
  static createDuration(dur) {
    if (!Util.shouldExpire(dur))
      return null;
    const duration = new Date(Date.now() + dur);
    return duration;
  }
};

// src/Database.ts
var import_lodash2 = __toESM(require("lodash"));
var Database = class extends import_tiny_typed_emitter.TypedEmitter {
  constructor(url, options = {}) {
    super();
    this.url = url;
    this.options = options;
    this.parent = null;
    this.__child__ = false;
    this.model = null;
    Object.defineProperty(this, "__child__", {
      writable: true,
      enumerable: false,
      configurable: true
    });
    if (this.options.autoConnect)
      this.connect();
  }
  isChild() {
    return !this.isParent();
  }
  isParent() {
    return !this.__child__;
  }
  get ready() {
    return this.model && this.connection ? true : false;
  }
  get readyState() {
    var _a, _b;
    return (_b = (_a = this.connection) == null ? void 0 : _a.readyState) != null ? _b : 0;
  }
  getRaw(key) {
    return __async(this, null, function* () {
      this.__readyCheck();
      const doc = yield this.model.findOne({
        ID: Util.getKey(key)
      });
      if (!doc || doc.expireAt && doc.expireAt.getTime() - Date.now() <= 0) {
        return null;
      }
      return doc;
    });
  }
  get(key) {
    return __async(this, null, function* () {
      const res = yield this.getRaw(key);
      const formatted = this.__formatData(res);
      return Util.pick(formatted, key);
    });
  }
  fetch(key) {
    return __async(this, null, function* () {
      return yield this.get(key);
    });
  }
  set(key, value, expireAfterSeconds = -1) {
    return __async(this, null, function* () {
      this.__readyCheck();
      if (!key.includes(".")) {
        yield this.model.findOneAndUpdate(
          {
            ID: key
          },
          {
            $set: Util.shouldExpire(expireAfterSeconds) ? {
              data: value,
              expireAt: Util.createDuration(expireAfterSeconds * 1e3)
            } : { data: value }
          },
          { upsert: true }
        );
        return yield this.get(key);
      } else {
        const keyMetadata = Util.getKeyMetadata(key);
        const existing = yield this.model.findOne({ ID: keyMetadata.master });
        if (!existing) {
          yield this.model.create(
            Util.shouldExpire(expireAfterSeconds) ? {
              ID: keyMetadata.master,
              data: import_lodash2.default.set({}, keyMetadata.target, value),
              expireAt: Util.createDuration(expireAfterSeconds * 1e3)
            } : {
              ID: keyMetadata.master,
              data: import_lodash2.default.set({}, keyMetadata.target, value)
            }
          );
          return yield this.get(key);
        }
        if (existing.data !== null && typeof existing.data !== "object")
          throw new Error("CANNOT_TARGET_NON_OBJECT");
        const prev = Object.assign({}, existing.data);
        const newData = import_lodash2.default.set(prev, keyMetadata.target, value);
        yield existing.updateOne({
          $set: Util.shouldExpire(expireAfterSeconds) ? {
            data: newData,
            expireAt: Util.createDuration(expireAfterSeconds * 1e3)
          } : {
            data: newData
          }
        });
        return yield this.get(keyMetadata.master);
      }
    });
  }
  has(key) {
    return __async(this, null, function* () {
      const data = yield this.get(key);
      return data != null;
    });
  }
  delete(key) {
    return __async(this, null, function* () {
      this.__readyCheck();
      const keyMetadata = Util.getKeyMetadata(key);
      if (!keyMetadata.target) {
        const removed = yield this.model.deleteOne({
          ID: keyMetadata.master
        });
        return removed.deletedCount > 0;
      }
      const existing = yield this.model.findOne({ ID: keyMetadata.master });
      if (!existing)
        return false;
      if (existing.data !== null && typeof existing.data !== "object")
        throw new Error("CANNOT_TARGET_NON_OBJECT");
      const prev = Object.assign({}, existing.data);
      import_lodash2.default.unset(prev, keyMetadata.target);
      yield existing.updateOne({
        $set: {
          data: prev
        }
      });
      return true;
    });
  }
  deleteAll() {
    return __async(this, null, function* () {
      const res = yield this.model.deleteMany();
      return res.deletedCount > 0;
    });
  }
  count() {
    return __async(this, null, function* () {
      return yield this.model.estimatedDocumentCount();
    });
  }
  ping() {
    return __async(this, null, function* () {
      if (!this.model)
        return NaN;
      if (typeof performance !== "undefined") {
        const initial = performance.now();
        yield this.get("SOME_RANDOM_KEY");
        return performance.now() - initial;
      } else {
        const initial = Date.now();
        yield this.get("SOME_RANDOM_KEY");
        return Date.now() - initial;
      }
    });
  }
  instantiateChild(collection, url) {
    return __async(this, null, function* () {
      const childDb = new Database(url || this.url, __spreadProps(__spreadValues({}, this.options), {
        child: true,
        parent: this,
        collectionName: collection,
        shareConnectionFromParent: !!url || true
      }));
      const ndb = yield childDb.connect();
      return ndb;
    });
  }
  get table() {
    return new Proxy(
      function() {
      },
      {
        construct: (_3, args) => {
          return this.useCollection(args[0]);
        },
        apply: (_3, _thisArg, args) => {
          return this.useCollection(args[0]);
        }
      }
    );
  }
  useCollection(name) {
    if (!name || typeof name !== "string")
      throw new TypeError("Invalid collection name");
    const db = new Database(this.url, this.options);
    db.connection = this.connection;
    db.model = modelSchema(this.connection, name);
    db.connect = () => Promise.resolve(db);
    return db;
  }
  all(options) {
    return __async(this, null, function* () {
      this.__readyCheck();
      const everything = yield this.model.find({
        $where: function() {
          const expiredCheck = !(this.expireAt && this.expireAt.getTime() - Date.now() <= 0);
          return expiredCheck;
        }
      });
      let arb = everything.filter((v) => {
        var _a, _b;
        return (_b = (_a = options == null ? void 0 : options.filter) == null ? void 0 : _a.call(options, { ID: v.ID, data: v.data })) != null ? _b : true;
      }).map((m) => ({
        ID: m.ID,
        data: this.__formatData(m)
      }));
      if (typeof (options == null ? void 0 : options.sort) === "string") {
        if (options.sort.startsWith("."))
          options.sort = options.sort.slice(1);
        const pref = options.sort.split(".");
        arb = import_lodash2.default.sortBy(arb, pref).reverse();
      }
      return typeof (options == null ? void 0 : options.limit) === "number" && options.limit > 0 ? arb.slice(0, options.limit) : arb;
    });
  }
  drop() {
    return __async(this, null, function* () {
      this.__readyCheck();
      return yield this.model.collection.drop();
    });
  }
  push(key, value) {
    return __async(this, null, function* () {
      const data = yield this.get(key);
      if (data == null) {
        if (!Array.isArray(value))
          return yield this.set(key, [value]);
        return yield this.set(key, value);
      }
      if (!Array.isArray(data))
        throw new Error("TARGET_EXPECTED_ARRAY");
      if (Array.isArray(value))
        return yield this.set(key, data.concat(value));
      data.push(value);
      return yield this.set(key, data);
    });
  }
  pull(key, value, multiple = true) {
    return __async(this, null, function* () {
      let data = yield this.get(key);
      if (data == null)
        return false;
      if (!Array.isArray(data))
        throw new Error("TARGET_EXPECTED_ARRAY");
      if (typeof value === "function") {
        data = data.filter(value);
        return yield this.set(key, data);
      } else if (Array.isArray(value)) {
        data = data.filter((i) => !value.includes(i));
        return yield this.set(key, data);
      } else {
        if (multiple) {
          data = data.filter((i) => i !== value);
          return yield this.set(key, data);
        } else {
          const hasItem = data.some((x) => x === value);
          if (!hasItem)
            return false;
          const index = data.findIndex((x) => x === value);
          data = data.splice(index, 1);
          return yield this.set(key, data);
        }
      }
    });
  }
  unshift(key, value) {
    return __async(this, null, function* () {
      let arr = yield this.getArray(key);
      Array.isArray(value) ? arr = value.concat(arr) : arr.unshift(value);
      return yield this.set(key, arr);
    });
  }
  shift(key) {
    return __async(this, null, function* () {
      const arr = yield this.getArray(key);
      const removed = arr.shift();
      yield this.set(key, arr);
      return removed;
    });
  }
  pop(key) {
    return __async(this, null, function* () {
      const arr = yield this.getArray(key);
      const removed = arr.pop();
      yield this.set(key, arr);
      return removed;
    });
  }
  startsWith(query) {
    return __async(this, null, function* () {
      return this.all({
        filter(data) {
          return data.ID.startsWith(query);
        }
      });
    });
  }
  endsWith(query) {
    return __async(this, null, function* () {
      return this.all({
        filter(data) {
          return data.ID.endsWith(query);
        }
      });
    });
  }
  add(key, value) {
    return __async(this, null, function* () {
      if (typeof value !== "number")
        throw new TypeError("VALUE_MUST_BE_NUMBER");
      const val = yield this.get(key);
      return yield this.set(key, (typeof val === "number" ? val : 0) + value);
    });
  }
  subtract(key, value) {
    return __async(this, null, function* () {
      if (typeof value !== "number")
        throw new TypeError("VALUE_MUST_BE_NUMBER");
      const val = yield this.get(key);
      return yield this.set(key, (typeof val === "number" ? val : 0) - value);
    });
  }
  sub(key, value) {
    return __async(this, null, function* () {
      return this.subtract(key, value);
    });
  }
  addSubtract(key, value, sub = false) {
    return __async(this, null, function* () {
      if (sub)
        return this.subtract(key, value);
      return this.add(key, value);
    });
  }
  getArray(key) {
    return __async(this, null, function* () {
      const data = yield this.get(key);
      if (!Array.isArray(data)) {
        throw new TypeError(`Data type of key "${key}" is not array`);
      }
      return data;
    });
  }
  connect() {
    return new Promise((resolve, reject) => {
      if (typeof this.url !== "string" || !this.url)
        return reject(new Error("MISSING_MONGODB_URL"));
      this.__child__ = Boolean(this.options.child);
      this.parent = this.options.parent || null;
      const collectionName = this.options.collectionName;
      const shareConnectionFromParent = !!this.options.shareConnectionFromParent;
      delete this.options["collectionName"];
      delete this.options["child"];
      delete this.options["parent"];
      delete this.options["shareConnectionFromParent"];
      delete this.options["autoConnect"];
      if (shareConnectionFromParent && this.__child__ && this.parent) {
        if (!this.parent.connection)
          return reject(new Error("PARENT_HAS_NO_CONNECTION"));
        this.connection = this.parent.connection;
        this.model = modelSchema(this.connection, Util.v(collectionName, "string", "JSON"));
        return resolve(this);
      }
      import_mongoose2.default.createConnection(this.url, this.options, (err, connection) => {
        if (err)
          return reject(err);
        this.connection = connection;
        this.model = modelSchema(this.connection, Util.v(collectionName, "string", "JSON"));
        this.emit("ready", this);
        this.__applyEventsBinding();
        resolve(this);
      });
    });
  }
  watch() {
    this.__readyCheck();
    const stream = this.model.watch();
    return stream;
  }
  get metadata() {
    if (!this.model)
      return null;
    return {
      name: this.model.collection.name,
      db: this.model.collection.dbName,
      namespace: this.model.collection.namespace
    };
  }
  stats() {
    return __async(this, null, function* () {
      this.__readyCheck();
      const stats = yield this.model.collection.stats();
      return stats;
    });
  }
  close(force = false) {
    return __async(this, null, function* () {
      return yield this.connection.close(force);
    });
  }
  __applyEventsBinding() {
    this.__readyCheck();
    const events = ["connecting", "connected", "open", "disconnecting", "disconnected", "close", "reconnected", "error", "fullsetup", "all", "reconnectFailed", "reconnectTries"];
    for (const event of events) {
      this.connection.on(event, (...args) => {
        this.emit(event, ...args);
      });
    }
  }
  __formatData(doc) {
    var _a;
    return (_a = doc == null ? void 0 : doc.data) != null ? _a : null;
  }
  __readyCheck() {
    if (!this.model)
      throw new Error("[DATABASE_NOT_READY] Use db.connect()");
  }
};

// src/MongoDriver.ts
var import_mongoose3 = __toESM(require("mongoose"));
var MongoDriver = class {
  constructor(url, options = {}) {
    this.url = url;
    this.options = options;
    this.models = /* @__PURE__ */ new Map();
  }
  connect() {
    return new Promise((resolve, reject) => __async(this, null, function* () {
      import_mongoose3.default.createConnection(this.url, this.options, (err, connection) => {
        if (err)
          return reject(err);
        this.connection = connection;
        resolve(this);
      });
    }));
  }
  close(force) {
    var _a;
    return (_a = this.connection) == null ? void 0 : _a.close(force);
  }
  checkConnection() {
    if (this.connection == null)
      throw new Error(`MongoDriver is not connected to the database`);
  }
  prepare(table) {
    return __async(this, null, function* () {
      this.checkConnection();
      if (!this.models.has(table))
        this.models.set(table, modelSchema(this.connection, table));
    });
  }
  getModel(name) {
    return __async(this, null, function* () {
      yield this.prepare(name);
      return this.models.get(name);
    });
  }
  getAllRows(table) {
    return __async(this, null, function* () {
      this.checkConnection();
      const model = yield this.getModel(table);
      return (yield model.find()).map((row) => ({
        id: row.ID,
        value: row.data
      }));
    });
  }
  getRowByKey(table, key) {
    return __async(this, null, function* () {
      this.checkConnection();
      const model = yield this.getModel(table);
      const res = yield model.find({ ID: key });
      return res.map((m) => m.data);
    });
  }
  setRowByKey(table, key, value, update) {
    return __async(this, null, function* () {
      this.checkConnection();
      const model = yield this.getModel(table);
      yield model.findOneAndUpdate(
        {
          ID: key
        },
        {
          $set: { data: value }
        },
        { upsert: true }
      );
      return value;
    });
  }
  deleteAllRows(table) {
    return __async(this, null, function* () {
      this.checkConnection();
      const model = yield this.getModel(table);
      const res = yield model.deleteMany();
      return res.deletedCount;
    });
  }
  deleteRowByKey(table, key) {
    return __async(this, null, function* () {
      this.checkConnection();
      const model = yield this.getModel(table);
      const res = yield model.deleteMany({
        ID: key
      });
      return res.deletedCount;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Database,
  MongoDriver,
  Util,
  docSchema
});
