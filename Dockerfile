FROM node:9.6.1

LABEL version="1.0"
LABEL description="Web App Geolocalizacion NodeJS"
LABEL maintainer="Yorman Aguirre - yaguirre@eafit.edu.co"

ARG PORT=3000
ENV PORT $PORT

WORKDIR /nodeApp
COPY . ./

RUN npm install --test

EXPOSE 3000
CMD npm start