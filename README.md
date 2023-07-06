
# Smart API

REST API


## Installation

- Clone the project

```bash
  git clone https://github.com/QVan27/smart.git .
```

- Go to api folder

```bash
  cd api
```

- Install packages

```bash
  npm i
```
## Configuration

- Create a .env file at the root of the project
- Copy the content of .env.example in .env
- Fill the .env file with your configuration

## Run

- Start server

```bash
  npm run server
```

- Add data fixtures

```bash
  npm run db-seeds
```


## Authentication

### Signs up a new user and saves them to the database

```http
  POST api/auth/signup/
```
#### Body

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@smart.com",
  "position": "developpeur",
  "picture": "",
  "password": "password123",
  "roles": ["USER"]
}
```

### Authenticates a user by their email and password

```http
  POST /api/auth/signin
```
#### Body

```json
{
  "email": "john.doe@smart.com",
  "password": "password123"
}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |

### Logs out a user by clearing the access token from the cookie or Authorization header

```http
  POST api/auth/logout
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |

## Users

### Retrieves all users from the database

```http
  GET api/users
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |

### Retrieves a user by their ID from the database

```http
  GET api/users/{id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |

### Deletes a user from the database

```http
  DELETE api/users/{id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |
| `role` | `int` | **Required**. Admin |

### Updates a user in the database

```http
  PUT api/users/{id}
```
#### Body

```json
{
  "firstName": "Antoine",
  "lastName": "Rousseau",
  "email": "antoine.rousseau@smart.com",
  "position": "Marketing",
  "picture": "",
  "password": "12346"
}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |
| `role` | `int` | **Required**. Admin / Moderator |

### Retrieves the bookings associated with a user from the database

```http
  GET api/users/{id}/bookings
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |

### Retrieves the bookings associated with the currently authenticated user

```http
  GET api/user/bookings
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |

### Retrieves the information of the currently authenticated user

```http
  GET api/user
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |

### Creates a new user and saves them to the database

```http
  POST api/users/
```
#### Body

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@smart.com",
  "position": "developpeur",
  "picture": "",
  "password": "password123",
  "roles": ["USER"]
}
```

## Rooms

### Retrieves all bookings belonging to a room

```http
  GET api/rooms/{id}/bookings
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |

### Retrieves all rooms

```http
  GET api/rooms
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |

### Retrieves a room by its ID

```http
  GET api/rooms/{id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |

### Deletes a room by its ID

```http
  DELETE api/rooms/{id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |
| `role` | `int` | **Required**. Admin |

### Updates a room by its ID

```http
  PUT api/rooms/{id}
```
#### Body

```json
{
  "name": "Updated Room",
  "capacity": 20
}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |
| `role` | `int` | **Required**. Admin / Moderator |

### Creates a new room

```http
  POST api/rooms/
```
#### Body

```json
{
  "name": "Conference Room",
  "image": "room.jpg",
  "capacity": 10,
  "floor": "2nd floor",
  "pointOfContactEmail": "contact@example.com",
  "pointOfContactPhone": "1234567890"
}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |
| `role` | `int` | **Required**. Admin |

## Bookings

### Retrieves all bookings with associated users

```http
  GET api/bookings
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |

### Retrieves a booking by its ID

```http
  GET api/bookings/{id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |

### Deletes a booking by its ID

```http
  DELETE api/bookings/{id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |

### Creates a new booking and associates users with the booking

```http
  POST api/bookings
```
#### Body

```json
{
  "startDate": "2023-06-24",
  "endDate": "2023-06-25",
  "purpose": "Create New Meeting",
  "roomId": "4",
  "userIds": ["2"]
}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |

### Adds users to a booking

```http
  POST api/bookings/{id}/users
```
#### Body

```json
{
  "userIds": ["2"]
}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |
| `role` | `int` | **Required**. Admin / Moderator |

### Updates a booking by its ID and associates users with the booking

```http
  PUT api/bookings/{id}
```
#### Body

```json
{
  "startDate": "2023-06-24",
  "endDate": "2023-06-25",
  "purpose": "Updated Meeting",
  "userIds": ["1", "2", "3"]
}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |
| `role` | `int` | **Required**. Admin / Moderator |

### Retrieves all users associated with a booking

```http
  GET api/bookings/5/users
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |

### Approves a booking by its ID (available only for moderator users)

```http
  PUT api/bookings/{id}/approve
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |
| `role` | `int` | **Required**. Moderator |

### Removes a user from a booking

```http
  DELETE api/bookings/{id}/users/{userId}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your access token |
| `role` | `int` | **Required**. Admin / Moderator |