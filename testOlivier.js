const testControllers = require('./app/controllers/hiking.controllers');

testControllers.updateOne({
  id: 2,
});


// -----------------------------------
const oldPhoto = oldData[0].photo_hiking;

    if (!data.photo_hiking) {
      console.log('Pas de photo modifier');
    } else {
      const newPhoto = data.photo_hiking;
      // let newPhotoUpdate = [];
      // console.log('les nouvelle photo(s)', newPhoto);
      console.log('Le nombre de photo actuelle: ', oldPhoto.length)
      console.log('Le nombre de photo modifier est de : ', newPhoto.length);

      if (oldPhoto.length >= newPhoto.length) {
        console.log('Entre dans la boucle 1');
        oldPhoto.forEach((photo, index) => {
          // console.log('la photo index', index, ' :', photo);
          console.log('Tour:', index);
          console.log('La nouvelle photo:', newPhoto[index]);
          console.log('************************');
          console.log('L\'ancien photo:', photo);

          newPhoto[index] = { ...photo, ...newPhoto[index] };
          console.log('------------------------------');
          console.log('Assemblage:', newPhoto[index]);
        });
      } else {
        console.log('Entre dans la boucle 2');
      }
      // console.log('La nouvelle table photo :', newPhoto);
    }
