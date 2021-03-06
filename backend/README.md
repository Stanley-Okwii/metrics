# METRICS BACKEND

Backend API for Metrics Timeline

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


## Tests

To run unit tests using `pytest tests.py`, run the commands below in a new terminal:-

```bash
source env/bin/activate
make test
```
