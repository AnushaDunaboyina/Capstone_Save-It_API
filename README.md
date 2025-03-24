# SaveIt - Backend

## Overview
This is the backend repository for **SaveIt**, an all-in-one organizer app. It provides the APIs for managing notes, links, documents, and calendar events. The backend handles user data and file uploads, integrates external AI services, and serves files to the frontend.

## Features
- **Notes**: Stores and processes user notes. Uses AI APIs for grammar correction and summarization.
- **Links**: Stores and retrieves online links with thumbnails, tags, and descriptions. Extracts metadata using Cheerio.
- **Documents**: Handles file uploads, categorization, and retrieval.
- **Calendar**: Manages event creation, editing, and reminders.

## Tech Stack
- **Node.js**: Server-side runtime environment.
- **Express.js**: Framework for building the RESTful APIs.
- **Knex.js**: SQL query builder to interact with the database.
- **MySQL**: Database to store user data and uploaded files.

## Tools and Libraries
- **Multer**: For handling file uploads.
- **Cheerio**: For extracting metadata from webpages.
- **dotenv**: For managing environment variables.
- **express.static**: For serving uploaded files via a public URL.





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
