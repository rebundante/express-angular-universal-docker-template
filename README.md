# Express-angular-universal-docker-template
Basic template for angular universal (Server Side Rendering) on Express server, with additional configuration for docker.

# Basic commands for server side rendering

-> npm run build:ssr

-> npm run serve:ssr

# Basic commands for docker

After npm run build:ssr, from the project folder:

-- docker image build -t docker-container-name .

-> docker image build -t express-server-side-app .

-- docker run -p destinyPort(80):portServerIsListening(80) --rm docker-container-name

-> docker run -p 4250:80 --rm express-server-side-app
