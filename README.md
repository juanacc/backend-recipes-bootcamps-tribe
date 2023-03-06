# Template para crear el webserver y estructura de API

# Instalar dependencias
```
npm i
```

#  Compilar proyecto de Angular
```
ng build
```

Borrar todo el contenido de la carpeta "public" en el proyecto de Node  
Pegar en la carpeta "public" todos los archivos de la compilacion obtenidos previamente

# Deployar en Heroku
Crear una cuenta en Heroku https://www.heroku.com/

Install the Heroku CLI
Download and install the Heroku CLI devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

```
heroku login
```
Clone the repository
Use Git to clone your_heroku_app source code to your local machine.

```
heroku git:clone -a your_heroku_app 
cd your_heroku_app
```

Deploy your changes
Make some changes to the code you just cloned and deploy them to Heroku using Git.

```
git add .
git commit -m "algun comentario sobre el commit"
git push heroku master
```

*Nota: si estan trabajando sobre  la rama main, tendran que reemplazar master por main en el ultimo comando
```
git push heroku main
```

https://webserver-nodejpa.herokuapp.com