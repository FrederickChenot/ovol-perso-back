/*
Log level list
"error" (60):
    The service/app is going to stop or
    become unusable now. An operator should definitely look into this soon.
    "error" (50): Fatal for a particular request,
    but the service/app continues servicing other requests.
    An operator should look at this soon(ish).
"warn" (40):
    A note on something that should probably
    be looked at by an operator eventually.
"info" (30):
    Detail on regular operation.
"debug" (20):
    Anything else, i.e. too verbose to be included in "info" level.
"trace" (10):
    Logging from external libraries used by
    your app or very detailed application logging.
*/
const bunyan = require('bunyan');

const streams = [];

if (process.env.NODE_ENV === 'production') {
  streams.push({
    level: 'error', // On ne conservera dans ce stream que les informations de niveau 'error' ou supérieur.
    path: './log/error.log', // Le chemain et le fichier dans lequel on veut sauvegarder les informatons
    type: 'rotating-file', // On peut décider d'archivé des logs passé dans un fichier d'archive
    period: '1d', // Pour cela on décide de la périodicité
    count: 3, // Et de l'historique à conserver
    /*
        Cela aura pour conséquence de créer différents fichiers ayant pour suffixe : .0, .1, .2 etc…
        */
  });
} else {
  streams.push({
    level: 'error',
    stream: process.stdout,
  });
}

const logger = bunyan.createLogger({
  name: 'cadex-api',
  streams,
});

module.exports = logger;
