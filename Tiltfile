allow_k8s_contexts("kind-sealedmessages")

# When running locally through Tilt, we want to run in dev mode
docker_build(
  ref="backend",
  context="./backend",
  dockerfile="./operations/Dockerfile.backend",
  entrypoint="python manage.py runserver",
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
