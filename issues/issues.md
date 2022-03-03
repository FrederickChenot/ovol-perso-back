






-----------------------------------------

## Projet

[Dépot](https://github.com/O-clock-Yggdrasil/projet-16-vol-rando-back) branche `develop`

## Décrire le bug
Doublons des lignes jointe à la table en cas de multiple ateerisage (landing)

## Pour reproduire
Les étapes pour reproduire le bug :

De base il n'y a pas de décollage (liftOff) qui possède plusieurs attérisage (Landing), il faut donc rajouté un landing par rapport au seeding de base.
1. sqitch revert
2. sqitch deploy
3. fichier test.http à la racine faire Send request (line 127) => Associe un atéro au décollage id 4
3. fichier test.http encore cliqué Send request (line 127)
4. On voit l'erreur dans la console

## Fonctionnement attendu
Résultat attendu
``` json
{
  id: 3,
  name: "Déco Notre Dame D'Hermon",
  'typeOfTerrain': 'Herbe',
  description: 'Conditions idéales : Vent de Nord Ouest à Ouest.',
  danger: null,
  'fflvLink': 'https://intranet.ffvl.fr/sites_pratique/voir/1192',
  latitude: 46.3073,
  longitude: 6.518,
  'favorableWind': [ 'N', 'NO' ],
  'unfavorableWind': [ 'NE', 'E', 'SE', 'S', 'SO' ],
  altitude: 1290,
  idLandings: [ 1,2 ],
  'photo_liftOff': [
    {
      id: 3,
      title: 'Photo deco Vailly',
      url: 'https://lh5.googleusercontent.com/p/AF1QipN5YstKeNw4w_V24PgOYCRZNr9-M9h-nSs8nh3A=w408-h306-k-no',
      idLiftOff: 3
    },
    {
      id: 4,
      title: 'Photo deco Vailly2',
      url: 'https://lh5.googleusercontent.com/p/AF1QipN5YstKeNw4w_V24PgOYCRZNr9-M9h-nSs8nh3A=w408-h306-k-no',
      idLiftOff: 3
    }
  ]
}
```
## Le code concerné


``` sql
CREATE OR REPLACE FUNCTION getLiftOff(int) RETURNS TABLE (
	"id" int,
	"name" text,
	"typeOfTerrain" text,
	"description" text,
	"danger" text,
	"fflvLink" text,
	"latitude" float,
	"longitude" float,
	"favorableWind" text[],
	"unfavorableWind" text[],
	"altitude" int,
	"idLandings" int[],
	"photo_liftOff" json[]
) AS $$
SELECT "liftOff"."id",
	"liftOff"."name",
	"liftOff"."typeOfTerrain",
	"liftOff"."description",
	"liftOff"."danger",
	"liftOff"."fflvLink",
	"liftOff"."latitude",
	"liftOff"."longitude",
	"liftOff"."favorableWind",
	"liftOff"."unfavorableWind",
	"liftOff"."altitude",
	array_agg(DISTINCT "landing"."id") AS "idLandings",
    array_agg(row_to_json("img_liftOff")) AS "photo_liftOff" FROM "liftOff"
JOIN "img_liftOff" 
	ON "img_liftOff"."idLiftOff" = "liftOff"."id"
JOIN "liftOff_has_landing"
	ON "liftOff_has_landing"."liftOff_id" = "liftOff"."id"
JOIN "landing"
	ON "landing"."id" = "liftOff_has_landing"."landing_id"
WHERE "liftOff"."id" = $1
GROUP BY "liftOff"."id"
$$ LANGUAGE sql;
```


## Quelle est l'erreur
Résultat obtenu

``` json
{
  id: 4,
  name: 'new liftOff',
  'typeOfTerrain': 'new type de terrain',
  description: 'new description',
  danger: 'new danger',
  'fflvLink': 'new fflvLink',
  latitude: 23.234,
  longitude: 34.23,
  'favorableWind': [ 'O' ],
  'unfavorableWind': [ 'O' ],
  altitude: 23123,
  idLandings: [ 1, 2 ],
  'photo_liftOff': [
    {
      id: 5,
      title: 'photo rando pourri',
      url: 'https://idata.over-blog.com/2/08/31/84/gifs/cockpit-avion.jpg',
      idLiftOff: 4
    },
    {
      id: 6,
      title: 'photo rando pourri2',
      url: 'https://www.alibabuy.com/photos/library/1500/11681.jpg',
      idLiftOff: 4
    },
    {
      id: 5,
      title: 'photo rando pourri',
      url: 'https://idata.over-blog.com/2/08/31/84/gifs/cockpit-avion.jpg',
      idLiftOff: 4
    },
    {
      id: 6,
      title: 'photo rando pourri2',
      url: 'https://www.alibabuy.com/photos/library/1500/11681.jpg',
      idLiftOff: 4
    }
  ]
}
```

## Qu'avez vous testé ?

Après avoir isolé le problème au niveau de la fonction sql
on a trouvé une solution "bricolo" en javascript au niveau du modèle mais pas satisfaisant

```javascript
    // app/models/liftOff.js  
  async findOne(idLiftOff) {
    const result = await client.query('SELECT * FROM getLiftOff($1)', [idLiftOff]);
    if (result.rowCount === 0) {
      return null;
    }
    console.log('model', result.rows[0]);
    // on supprime les photos en doublon dans l'array photo_liftOff
    const array = result.rows[0]['photo_liftOff'].filter((value, index, arr) => arr.findIndex((t) => (JSON.stringify(t) === JSON.stringify(value))) === index);
    result.rows[0]['photo_liftOff'] = array;
    return result.rows;
  },
```

On a essayer de faire un DISTINCT row_to_json mais postgres ne peux pas faire de test d'égalité sur ce type de donnée
On est coincé...
