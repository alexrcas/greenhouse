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
El Core es el elemento central por el que pasan todos los mensajes y peticiones. Este microservicio sirve básicamente para ayudar a implementar el patrón publicador/suscriptor. La función del core es básicamente escuchar cualquier petición y volver a emitirla a través de su websocket. Esto hace que a la hora de añadir un nuevo servicio al sistema, conectándolo por socket al core sea posible escuchar los eventos que se deseen de cualquier servicio del sistema.

#### Microlistener
El Microlistener es la conexión entre los microcontroladores y el resto del sistema. podría verse como un clon digital del microcontrolador. Las peticiones que realiza el microcontrolador son muy básicas y el código crece y se ofusca con facilidad, por lo que realiza peticiones muy simples que luego este servicio se encarga de transmitir de forma más correcta al resto del sistema.

#### Valvecommander
El Valvecommander es el servicio encargado de abrir y cerrar la válvula de riego.

#### Datastorer
El Datastorer es el servicio encargado de subir a la base de datos las medidas de temperatura, humedades y riego.

#### Flowservice
El Flowservice recibe las señales de que el agua está pasando por el caudalímetro (esta información la envía el Microlistener que como se explicó, es el punto de entrada al sistema). Este servicio expone estos datos (caudal actual y volumen usado durante el presente riego) de forma que puedan ser consumidos por una aplicación web.

#### Valveservice
El Valveservice expone la válvula de riego de forma que pueda ser utilizada por un servicio web. Está suscrito al evento *watering* del caudalímetro, que indica el agua utilizada en el riego actual. Esto permite que además de una llamada simple para abrir la válvula (es nuestra responsabilidad luego emitir la llamada para cerrarla), también sea posible realizar una llamada indicando de antemano una cantidad de litros a emplear, tras lo cual la válvula se cerrará automáticamente. Esta llamada puede ser aprovechada por módulos lógicos de más alto nivel de abstracción para dotar de cierta inteligencia al riego.

#### Webservice
El Webservice se utiliza para exponer la base de datos de forma que pueda ser consumida por una API REST.

#### Webserver
El Webserver es un servidor web que ofrece la interfaz del sistema al usuario. Está hecho en Vue.js y consume los tres microservicios anteriores (Flowservice, Valveservice y Webservice). En realidad, debido a la arquitectura desacoplada del sistema, pueden realizarse tantos *front-ends* como se desee en cualquier tecnología, ya que únicamente hay que consumir los servicios ofrecidos.


