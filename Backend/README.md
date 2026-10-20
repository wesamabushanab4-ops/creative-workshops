# Creative Workshops API

REST API built with Node.js, TypeScript, Express, and MongoDB/Mongoose.

## Run locally

1. Install MongoDB locally or provide a MongoDB connection URI.
2. Copy `.env.example` to `.env` and set `MONGODB_URI`.
3. Run `npm install`, then `npm run seed` to load sample data.
4. Run `npm run dev`. The API is available at `http://localhost:4000`.
5. Run `npm run build` to type-check and compile.

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/instructors` | List instructors |
| GET | `/api/workshops?instructorId=<id>` | List workshops for an instructor |
| GET | `/api/workshops/<id>` | Get one workshop |
| POST | `/api/workshops` | Add a future workshop |
| PUT | `/api/workshops/<id>` | Update a workshop (past workshops may be edited) |
| DELETE | `/api/workshops/<id>` | Delete a workshop |

POST and PUT use JSON fields `instructorId`, `startAt`, `endAt`, `topic`, and `room`. Start/end must be valid dates and start cannot be later than end. Creation additionally requires a future start time.

Import `postman/Creative Workshops API.postman_collection.json` into Postman. Set `baseUrl` to `http://localhost:4000`; the collection has scripts that capture sample IDs from API responses.
