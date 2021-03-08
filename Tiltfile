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
  entrypoint="python manage.py migrate && python manage.py runserver",
  target="build",
  live_update=[
    fall_back_on('./backend/pyproject.toml'),
    sync('./backend/backend', '/app/backend'),
  ],
)

yaml = helm(
  "./operations/helm/backend/",
  name="backend",
  set=[
    "image.repository=backend",
  ]
)
k8s_yaml(yaml)
k8s_resource("backend", port_forwards=["8000"])
