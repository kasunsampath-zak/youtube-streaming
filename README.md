## Build

### Build docker image
docker build -t attendancetrackerwisesoftlab.online/youtube-streamer:latest .

### Login to Registry
docker login https://attendancetrackerwisesoftlab.online/
adminuser


### Push to docker registry
docker push attendancetrackerwisesoftlab.online/youtube-streamer:latest

## Deploy

### ssh into the server and pull the image from the registry
docker pull attendancetrackerwisesoftlab.online/youtube-streamer:latest

### stop existing container
docker stop youtube-streamer-app

### delete existing container 
docker rm youtube-streamer-app

### run docker container with new image
docker run -d -p 9500:3000 --name youtube-streamer-app attendancetrackerwisesoftlab.online/youtube-streamer:latest 


