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
    fall_back_on(['./backend/pyproject.toml', './backend/poetry.lock']),
    sync('./backend/', '/app/'),
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
    fall_back_on(['./frontend/package.json', './frontend/yarn.lock']),
    sync('./frontend/', '/app/'),
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

# Redis example
# helm_remote("redis",
#   repo_name="bitnami",
#   repo_url="https://charts.bitnami.com/bitnami",
#   version="12.9.0",
#   set=[
#     "usePassword=false"
#   ]
# )
# k8s_resource("redis-master", port_forwards=["6739"])

# Celery setup
# Uncomment below
# Uncomment in messages/views.py

# helm_remote("rabbitmq",
#   repo_name="bitnami",
#   repo_url="https://charts.bitnami.com/bitnami",
#   version="8.11.4",
#   set=[
#     "auth.username=user",
#     "auth.password=admin"
#   ]
# )
# k8s_resource("rabbitmq", port_forwards=["15672"])

# docker_build(
#   ref="worker",
#   context="./backend",
#   dockerfile="./operations/Dockerfile.backend",
#   live_update=[
#     fall_back_on(['./backend/pyproject.toml', './backend/poetry.lock']),
#     sync('./backend/', '/app/'),
#   ],

#   # Override Dockerfile so that we stay on the build layer with dev
#   # dependencies and hot reloading
#   target="build",
#   entrypoint="celery -A backend worker -l INFO",
# )
# worker_yaml = helm(
#   "./operations/helm/worker/",
#   name="worker",
#   values=["./operations/helm/worker/values.yaml"],
#   set=[
#     "replicaCount=1",
#   ],
# )
# k8s_yaml(worker_yaml)
# k8s_resource("worker", resource_deps=["rabbitmq"])
