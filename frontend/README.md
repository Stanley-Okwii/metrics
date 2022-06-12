# METRICS FRONTEND

Frontend for metrics timeline


## Pre-Requisite
- Node v16.13.2 (Can be downloaded [here](https://nodejs.org/download/release/v16.13.2/))
- Yarn (Verify that you have yarn enabled — if not [install yarn globally](https://yarnpkg.com/lang/en/docs/install/))

### To Run

- Clone this repository
```bash
git clone https://github.com/Stanley-Okwii/metrics.git
cd frontend
```

- Install package dependencies

```bash
yarn install
```

- Copy the values from `.env.example` file, and paste them into a new file `.env.local` in the same directory.

- Start server at `localhost:3000`

```bash
yarn start
```

- Login into the app, use the credentials below:-
```json
{
    "email": "test@gmail.com",
    "password": "P@55word"
}
```


## Tests

To run tests, run the command:-

```bash
yarn test
```
