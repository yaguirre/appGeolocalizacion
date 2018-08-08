# appGeolocalizacion
# NodeJS appGeolocalizacion

By: Yorman Andres Aguirre Martinez - yaguirre@eafit.edu.co

# Descripción de aplicación

Es una aplicación web que me permite como usuario ver mi localización actual e historica desde un dispositivo movil accediendo por medio de un navegador como Google Chrome o usando un computador de escritorio o laptop que tenga servicios de ubicación.

# Definición de los 3 ambientes

## Dev: 

   Laptop Lenovo G40 - SO Ubuntu 18.4

## Test:

   DCA de EAFIT on premise - VM CentOS Linux 7

## Prod:

   t2.micro Amazon EC2 on cloud - VM CentOS Linux 7

# 1. Análisis

## 1.1 Requisitos funcionales:

1. Autenticar usuario
1. Guardar posición actual por usuario
2. Consultar y visualizar en un mapa la posición actual e historica 

## 1.2 Definición de tecnología de desarrollo y despliegue para la aplicación:

* Lenguaje de Programación: Javascript
* Framework web backend: NodeJS - Express
* Framework web frontend: se utilizará Templates HTML para Vista
* Base de datos: MongoDB
* Web App Server: NodeJS
* Web Server: NGINX 

# 2. Desarrollo

Se desarrolló todo desde cero, diseñando la estructura de modelos, controles y vistas.

# 3. Diseño:

## 3.1 Modelo de datos:

user:

{
      email : String,
      password: String
}

location:

{
    user : String,
    date : { type: Date, default: Date.now },
    latitude: String,
    longitude: String
}

## 3.2 Servicios Web

    1. http://server/signup

    Método: POST

    Descripción:  Crear cuenta de autenticación.

    2. http://server/login

    Método: POST

    Descripción:  Autenticación de usuario.

    3. http://server/location

    Método: POST

    Descripción:  Guardar localización actual del dispositivo mediante AJAX.

    Datos de entrada:

      usuario, latitud, longitud, timestamp

    Datos de salida:

      Copia en JSON guardado en la base de datos.
      ej: [{"user":"@hotmail.com","latitud":6.217,"longitud":-75.567 "timestamp":"2018-02-15T18:03:00.000Z"]

    4. http://server/getLocations

    Método: GET

    Descripción:  Muesta cada una de las ubicaciones guardadas en la base de datos en google maps.

# 4. Despligue en un Servidor Centos 7.x en el DCA

referencia: https://github.com/st0263eafit/appwebArticulosNodejs/blob/master/deploy-on-dca.md

## se instala nvm local para el usuario

source: https://www.liquidweb.com/kb/how-to-install-nvm-node-version-manager-for-node-js-on-centos-7/

      user1$ nvm install v7.7.4


## se instala el servidor mongodb

como root:

      user1$ sudo yum install mongodb-server -y

ponerlo a correr:

      user1$ sudo systemctl enable mongod
      user1$ sudo systemctl start mongod


## se instala NGINX

      user1$ sudo yum install nginx
      user1$ sudo systemctl enable nginx
      user1$ sudo systemctl start nginx

Abrir el puerto 80 y 3000

      user1$ sudo firewall-cmd --zone=public --add-port=80/tcp --permanent
      user1$ sudo firewall-cmd --zone=public --add-port=3000/tcp --permanent
      user1$ sudo firewall-cmd --reload
      user1$ sudo firewall-cmd --list-all


## se instala un manejador de procesos de nodejs, se instala: PM2 (http://pm2.keymetrics.io/)

      user1$ npm install -g pm2
      user1$ cd src
      user1$ pm2 start server.ps
      user1$ pm2 list

ponerlo como un servicio, para cuando baje y suba el sistema:    

      user1$ sudo pm2 startup systemd

## MUY MUY IMPORTANTE: Deshabilitar SELINUX

          user1$ sudo vim /etc/sysconfig/selinux

                SELINUX=disabled

          user1$ sudo reboot      


### Configuración del proxy inverso en NGINX para cada aplicación:

      // /etc/nginx/nginx.config
      .
      .
      server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        root         /usr/share/nginx/html;
      .
      .
      location / {
          proxy_pass http://localhost:3000;
          proxy_http_version 2
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      }
      .
      .


# 5. Despliege en Amazon EC2

referencias: 
* https://github.com/st0263eafit/appwebArticulosNodejs/blob/master/deploy-on-docker.md
* https://drive.google.com/file/d/1ITGHTak0gdUv3m1izGxQM0eNpNmvvNuU/view
* https://us-east-2.console.aws.amazon.com/ec2/v2/home?region=us-east-2#Instances:sort=instanceId

1. Crear una cuenta en Amazon AWS
2. Crear una nueva instancia de maquina virtual por EC2 (Elastic Computing)
3. Seleccionar la AMI(Amazon Machine Image) de CentOS 7 (x86_64) free
4. Seleccionamos para el hardware la maquina t2.micro free
5. Seleccionamos o creamos una imagen de emparejamiento miappgeolocalizacion.pem con el ordenador que debemos descargar localmente para la conexión a la maquina remota

## Como conectarse a la maquina remotamente

      5.1 Abrir un cliente SSH
      5.2 Almacenar miappgeolocalizacion.pem en el directorio SSH

            cd .ssh/
            mv ../miappgeolocalizacion.pem .
            ls -l   //para verificar que la clave se encuentre en el directorio ssh
      
      5.3 Le cambio los permisos a 400

            chmod 400 miappgeolocalizacion.pem

      5.5 Para conectarme 

            ssh -i "miappgeolocalizacion.pem" centos@ec2-13-59-9-31.us-east-2.compute.amazonaws.com

## Configurar el ambiente 

Para ser root:

      $ sudo su

Instalar GIT

      $ yum install git

Instalar Docker

      source: https://docs.docker.com/install/linux/docker-ce/centos/

      $ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
      $ sudo yum install docker-ce
      $ sudo systemctl start docker
      $ sudo systemctl enable docker

      instalar docker-compose: https://docs.docker.com/compose/install/

      $ sudo curl -L https://github.com/docker/compose/releases/download/1.20.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

      $ sudo chmod +x /usr/local/bin/docker-compose

## Descargar el proyecto de GitHub

      $ cd /tmp/
      $ mkdir apps
      $ cd apps
      $ git clone https://github.com/yaguirre/appGeolocalizacion.git
      $ cd appGeolocalizacion

## Ejecutamos con docker-compose

      $ sudo /usr/local/bin/docker-compose build
      $ sudo /usr/local/bin/docker-compose up

## Habilitamos los puertos 

* Ingresamos por la opción de amazon de Security groups 
* Añadimos una nueva regla para HTTP por el puerto 80
* Añadimos una regla para HTTPS por el puerto 443
* Guardamos

@Tópicos de telemática - 20182