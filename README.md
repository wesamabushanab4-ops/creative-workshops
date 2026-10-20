# Creative Workshops

A full-stack workshop management app for a community creative center.

## Stack

- **Frontend:** React, TypeScript, Vite, React Router
- **Backend:** Node.js, TypeScript, Express, Mongoose
- **Database:** MongoDB

## Run locally

Start MongoDB:

```sh
docker run --name creative-workshops-mongo -p 27017:27017 -d mongo:7
```

In a terminal, start the API:

```sh
cd Backend
npm install
```

Copy `Backend/.env.example` to `Backend/.env`, then run:

```sh
npm run seed
npm run dev
```

In a second terminal, start the frontend:

```sh
cd Frontend
npm install
npm run dev
```

Open the Vite URL (normally `http://localhost:5173`). The API runs at
`http://localhost:4000`; its health endpoint is `/api/health`.

## Production builds

Run `npm run build` separately in `Backend` and `Frontend`.

See the [Backend README](./Backend/README.md), [Frontend README](./Frontend/README.md),
and [Database export notes](./Database/README.md) for API routes, app details,
and MongoDB import instructions.
