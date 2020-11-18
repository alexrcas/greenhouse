# Greenhouse

## Descripción

Greenhouse es un proyecto de invernadero inteligente. El sistema mide la temperatura y humedad del aire, la humedad del terreno, y cuando se riega, el caudal y el volumen de agua utilizado. El riego también está bajo el control del sistema, permitiendo al usuario dispararlo desde la aplicación o bien configurándolo de forma automática para obedecer a diferentes parámetros de consumo o umbrales de humedad del terreno.

## Arquitectura

El proyecto utiliza una arquitectura basada en microservicios que implementan a su vez una especie de patrón publicador/suscriptor. El siguiente esquema define los distintos microservicios que conforman el sistema. Nótese que pese a utilizar un diagrama de clases, lo que el diagrama representa son servicios o programas independientes que podrían estar distribuídos en diferentes máquinas físicas.

Los servicios se comunican entre ellos a través de websockets (socketIO) y peticiones HTTP. En el diagrama se detallan para cada microservicio las peticiones que se escuchan o se envían y qué tecnología de comunicación se emplea.

![](https://raw.githubusercontent.com/alexrcas/Greenhouse/main/greenhouse_diagram.svg)

### Microservicios implicados
A continuación se describe brevemente la función de cada microservicio

#### Core
El core es el elemento central por el que pasan todos los mensajes y peticiones. Este microservicio sirve básicamente para ayudar a implementar el patrón publicador/suscriptor. La función del core es básicamente escuchar cualquier petición y volver a emitirla a través de su websocket. Esto hace que a la hora de añadir un nuevo servicio al sistema, conectándolo por socket al core sea posible escuchar los eventos que se deseen de cualquier servicio del sistema.

#### Microlistener


#### Valvecommander

#### Datastorer

#### Flowservice

#### Valveservice

#### Webservice

#### Webserver



