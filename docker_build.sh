DOCKER_BUILDKIT=1 docker build --no-cache -t akira-ge .
# DOCKER_BUILDKIT=1 docker build -t akira-ge .
docker run -d -p 8080:8080 akira-ge 
docker tag akira-ge llcoolchak/akira-ge:latest