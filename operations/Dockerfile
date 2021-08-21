# Install dev dependencies and run various CI checks
FROM python:3.9-slim as build-backend
ENV PATH="/app/.venv/bin:$PATH"

WORKDIR /app

RUN apt-get update && apt-get install --no-install-recommends -y \
  gcc=4:10.2.1-1 build-essential=12.9 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Should match whatever is in .tool-versions.  Pass this in as a --build-arg in
# the future and source the value from the .tool-versions
RUN pip install poetry==1.1.5
COPY ./backend/poetry.lock ./backend/pyproject.toml ./
RUN poetry config virtualenvs.in-project true

# Only install dependencies
RUN poetry install

# Copy application code in AFTER dependencies, so that the dependencies are
# isolated and cached as its own Docker layer
COPY ./backend/manage.py ./
COPY ./backend/backend ./backend
COPY ./backend/core ./core
COPY ./backend/messages ./messages
COPY ./backend/auth ./auth

# Install no-dev dependencies
FROM build-backend as installer-backend
RUN poetry install --no-root --no-dev

FROM node:14.16.0-alpine as build-frontend
WORKDIR /app
COPY ./frontend/package.json ./frontend/yarn.lock ./
RUN yarn install --non-interactive --frozen-lockfile
COPY ./frontend .

FROM build-frontend as installer-frontend
RUN yarn build

FROM ubuntu:20.04 as combined

RUN ln -snf /usr/share/zoneinfo/Etc/UTC /etc/localtime \
  && echo "Etc/UTC" > /etc/timezone
RUN apt-get update && apt-get install --no-install-recommends -y \
  python3.9=3.9.5-3~20.04.1 nginx=1.18.0-0ubuntu1.2 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

ENV PATH="/app/.venv/bin:$PATH"

COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /backend
COPY ./backend/manage.py ./
COPY ./backend/backend ./backend
COPY ./backend/core ./core
COPY ./backend/messages ./messages

COPY --from=installer-frontend /app/build/ /usr/share/nginx/html
COPY --from=installer-backend /app/.venv /backend/.venv
