## build all three containers:

```
docker-compose up --build
```

separate build & runs from algo//backend//frontend/ folders

```
docker build -t chesscraft-algo -f Dockerfile.algo .
docker run -p 8080:8080 chesscraft-algo
curl http://localhost:8080

docker build -t chesscraft-backend -f Dockerfile.backend .
docker run -p 3001:3001 chesscraft-backend
curl http://localhost:3001

docker build -t chesscraft-frontend -f Dockerfile.frontend .
docker run -p 3000:3000 chesscraft-frontend
curl http://localhost:3000

```

## .env files:

- in the root directory should look similar to this:

```
POSTGRES_DB=<db_name>
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<user_password>
```

- in the backend/ directory:

```
PORT=3001
DATABASE_URL=postgres://<user>:<password>@<host>:5432/<database>
JWT_SECRET=<jwt_secret>
```
