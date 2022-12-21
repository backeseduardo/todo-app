# TODO APP

## Running the app on localhost

The `.env` file has the default values in order for the project to run in localhost without troubles.

In order to run this app on localhost just execute `./bin/up`.

## Endpoints

### POST /api/v1/users/register

A new user can be registered.

Send a JSON body with `name`, `email` and `password` fields.

### POST /api/v1/users/login

Login with an existing user.

Send a JSON body with `email` and `password` fields.

### GET /api/v1/users

Lists all the users in the platform.

Send the `accessToken` via `authorization` header.

### POST /api/v1/tasks

Creates a new task.

Send a JSON body with `title` and `description`.

Send the `accessToken` via `authorization` header.

### PUT /api/v1/tasks/:taskId/status/:status

Changes the task's status.

Send the `accessToken` via `authorization` header.

### PUT /api/v1/tasks/:taskId/add-viewer/:viewerId

Adds a new user as a viewers of the task.

Send the `accessToken` via `authorization` header.

### GET /api/v1/tasks

Lists all the tasks that the user created or is a viewer of.

Send the `accessToken` via `authorization` header.
