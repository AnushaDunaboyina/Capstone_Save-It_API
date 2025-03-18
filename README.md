# Server Setup Instructions

## Environment Varaibles

Create a .env file in the root directory of the server and include the following variables. You can reference the .env.sample file for details.

```
PORT=your_server_port
DB_HOST=your_database_host
DB_LOCAL_DBNAME=your_database_name
DB_LOCAL_USER=your_database_user
DB_LOCAL_PASSWORD=your_database_password
```

## uploads-documents folder

The uploads-documents folder is used to store uploaded files. It is automatically created by the server if it doesn’t already exist, so you don’t need to create it manually.

- Additionally:

  - The folder is ignored in the Git repository via .gitignore, ensuring a clean codebase.
