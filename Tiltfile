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

# When running locally through Tilt, we want to run in dev mode
docker_build(
  ref="backend",
  context="./backend",
  dockerfile="./operations/Dockerfile.backend",
  live_update=[
    fall_back_on('./backend/pyproject.toml'),
    sync('./backend/', '/app/'),
  ],

  # Override Dockerfile so that we stay on the build layer with dev
  # dependencies and hot reloading
  target="build",
  entrypoint="python manage.py migrate --no-input && python manage.py runserver 0:8000",
)

yaml = helm(
  "./operations/helm/backend/",
  name="backend",
  values=["./operations/helm/backend/values.yaml"],
)
k8s_yaml(yaml)

k8s_resource("backend", port_forwards=["8000"])
k8s_resource("postgresql-postgresql", port_forwards=["5432"])
