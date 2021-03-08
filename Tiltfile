allow_k8s_contexts("kind-sealedmessages")

docker_build(
  ref="backend",
  context="./backend",
  dockerfile="./operations/Dockerfile.backend",
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
