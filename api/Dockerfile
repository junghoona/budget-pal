FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

COPY requirements.txt requirements.txt
COPY main.py main.py
COPY queries queries
COPY routers routers

RUN python -m pip install -r requirements.txt

CMD uvicorn main:app --port 8000 --host 0.0.0.0