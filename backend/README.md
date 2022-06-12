# METRICS BACKEND

Backend API for metrics timeline

## Pre-requisite
- python 3.6

### To Run

- Clone this repository
```bash
git clone https://github.com/Stanley-Okwii/metrics.git
cd backend
```
- Create virtual environment using python3 and activate it

```bash
python3 -m venv env
source env/bin/activate
```

- Install dependencies in the virtual environment

```bash
pip install -r requirements.txt
```

- Copy the values from `.env.example` file, and paste them into a new file `.env` in the same directory.

- Start server at `localhost:5000`

```bash
make start
```

- Test User Credentials:
```json
{
    "email": "test@gmail.com",
    "password": "P@55word"
}
```


## Tests

To run tests using `pytest tests.py`, run the command:-

```bash
make test
```
