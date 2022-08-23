# API-CREACION-CLIENTES
Esta api se encarga de crear clientes en Mambu y generar el enlace en el id del cliente en financiera y en mambu


## Capacidades :books:
    - Crear clientes en Mambu
    - Crear la relacion de clientes entre financiera y mambu

### Pre-requisitos :bookmark_tabs:

_Necesario tener las siguientes herramientas_

- node versi&oacute;n 10.15.3 o superior
- node package manager versi&oacute;n 6.4.1 o superior

verificar con los siguientes comandos:

```
node --version
```

Y tambi&eacute;n

```
npm --version
```


### Variables de entorno :clipboard:

Para los diferentes ambientes es necesario especificar los valores de cada variable
export PORT= Puerto donde correra la app
export CONTEXT_NAME= Nombre del contexto del proyecto (api-creacion-clientes)
export VERSION= Version del Projecto
export HTTP_REQUEST_REJECT_UNAUTHORIZED= False para no verificar el certificado de servidor,true para verificarlo
export HTTP_REQUEST_TIMEOUT=Tiempo antes de mandar timeout
export DOMAIN_MAMBU= Url de Mambu
export BASIC_MAMBU= Basic para hacer llamadas a Mambu encriptado en base64 


### Instalaci&oacute;n :wrench:

_Instalaci&oacute;n de los paquetes necesarios para despliegue y pruebas_

```
npm install
```