allow_k8s_contexts("kind-sealedmessages")

# Allow for installing other helm charts
load('ext://helm_remote', 'helm_remote')

helm_remote("postgresql",
  repo_name="bitnami",
  repo_url="https://charts.bitnami.com/bitnami",
  # This chart version pulls in app version 11.11.0
  version="10.3.11",
  set=[
    "postgresqlPassword=local_password",
    "postgresqlPostgresPassword=local_password",
    "rbac.create=true"
  ]
)

helm_remote("traefik",
  repo_name="traefik",
            repo_url="https://helm.traefik.io/traefik",
  version="9.12.3",
  set=[
    "service.type=ClusterIP"
  ]
)

# When running locally through Tilt, we want to run in dev mode
docker_build(
  ref="backend",
  context="./backend",
  dockerfile="./operations/Dockerfile.backend",
  live_update=[
    sync('./backend/', '/app/'),
    run('cd /app && poetry install', trigger=['./backend/pyproject.toml', './backend/poetry.lock']),
  ],

  # Override Dockerfile so that we stay on the build layer with dev
  # dependencies and hot reloading
  target="build",
  entrypoint="python manage.py runserver 0.0.0.0:8000",
)

# When running locally through Tilt, we want to run in dev mode
docker_build(
  ref="frontend",
  context="./frontend",
  dockerfile="./operations/Dockerfile.frontend",
  live_update=[
    sync('./frontend/', '/app/'),
    run('cd /app && yarn install', trigger=['./frontend/package.json', './frontend/yarn.lock']),
  ],

  # Override Dockerfile so that we stay on the build layer with dev
  # dependencies and hot reloading
  target="build",
  entrypoint="yarn start",
)

backend_yaml = helm(
  "./operations/helm/backend/",
  name="backend",
  values=["./operations/helm/backend/values.yaml"],
)
k8s_yaml(backend_yaml)

frontend_yaml = helm(
  "./operations/helm/frontend/",
  name="frontend",
  values=["./operations/helm/frontend/values.yaml"],
)
k8s_yaml(frontend_yaml)

k8s_resource("postgresql-postgresql", port_forwards=["5432"])
k8s_resource("traefik", port_forwards=["8000", "9000"])
