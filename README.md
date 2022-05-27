## URL Shortener

In this project I wanted to try TRPC which is an awesome tool to make type safe
calls to your backend, the only requirement is that both need to be written in
typescript. In addtion to TRPC I used superjson which gives me the hability to send
dates, hashmaps or other Javascript/Typescript exclusive data structures through
the wire to the server and back.

Also, I wanted to try Planetscale, a Database as a Service provider, which came
out to be the most unique database service I have ever used. The free tier is
incredibly generous and the way they structure each DB migration as a git diff
is pretty nifty.

Both technologies are absolutely awesome and I will for sure use them again.

Feel free to look around the project, If you want to run it, you should add the
environment variables required for the database connection and have the
planetscale cli installed in your system.

```
# this is the .env file

# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB (Preview).
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="your database connection here"
```

## Also, huge mention to [Theo](https://t3.gg) who did this on stream
