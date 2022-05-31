## [Metrics API Server]()

## Run

python 3.6
### Clone the repository

```bash
$ git clone https://.git
$ cd backend
```


### Create virtual environment using python3 and activate it

```bash
# Virtualenv modules installation (Unix based systems)
python3 -m venv env
source env/bin/activate
```



### Install dependencies in virtual environment

```bash
pip install -r requirements.txt
```

### Start API server at `localhost:5000

```bash
make start
```


## Testing

Run tests using `pytest tests.py`
```bash
make test
```
