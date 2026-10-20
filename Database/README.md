# Database export

This project uses MongoDB. `instructors.json` and `workshops.json` are MongoDB Extended JSON exports with ObjectId references. They can be imported with:

```sh
mongoimport --uri "mongodb://127.0.0.1:27017/creative-workshops" --collection instructors --file instructors.json --jsonArray
mongoimport --uri "mongodb://127.0.0.1:27017/creative-workshops" --collection workshops --file workshops.json --jsonArray
```

The workshop `instructorId` field references an instructor `_id`. The backend's `npm run seed` command creates sample records with matching identifiers and dates relative to the current time.
