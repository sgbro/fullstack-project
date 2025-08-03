# Dropbox-like App

## Prerequisites

- Java 17+, Maven
- PostgreSQL running locally (edit `application.properties` for credentials)
- Node.js, npm

## Backend Setup

1. Clone repo, go to `backend` folder.
2. Configure `application.properties` with your DB credentials.
3. Run `mvn spring-boot:run`.
4. API: `POST /api/files/upload`, `GET /api/files`, `GET /api/files/{id}/download`.

## Frontend Setup

1. Go to `frontend` folder.
2. Run `npm install`, then `npm start`.

## Features

- Upload/view/download files (txt, jpg, png, json only)
- Clean code, error handling, modular design, redux for state

## Additional Notes

- You can extend types, add user authentication, and use cloud storage for files.
