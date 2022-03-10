/*

const findLandings = async (ids) => {
  // TODO : iterate sur getLanding(id)
  const result = [];
  ids.forEach(async (id, index) => {
    result.push(await findByPk(id));
  });
  return result;
};

const findLandings = async (ids) => {
    // TODO : iterate sur getLanding(id)
    const result = [];
    await Promise.all(ids.map(async (id) =>{
        result.push(await findByPk(id));
    }))
    return result;
  };
  */

const axios = require('axios').default;

// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

// axios.get('https://apiovol.herokuapp.com/api/hiking/1')
//   .then((response) => {
//     // handle success
//     console.log(response.data[0]);
//   })
//   .catch((error) => {
//     // handle error
//     console.log(error);
//   });

// axios.post('https://apiovol.herokuapp.com/api/liftoff', {
//   name: 'TestPostOliver3',
//   photos: [{ name: 'photo rando déco2', IdLanding: [1, 2], url: 'https://idata.over-blog.com/2/08/31/84/gifs/cockpit-avion.jpg' },
//     { name: 'photo rando déco', url: 'https://www.alibabuy.com/photos/library/1500/11681.jpg' }],
// }, {
//   headers: {
//     Authorization: `Basic ${'eyJhbGciOiJIUzI1NiJ9.YWRtaW4.fuwJHQFiIlgT1krQ7dHFcldDkjwdp8-vofB_lF0VPL4'}`,
//   },
// })
//   .then((response) => {
//     // handle success
//     console.log(response.data[0]);
//   })
//   .catch((error) => {
//     // handle error
//     console.log(error);
//   });

// Const createrando = async () => {
//   const NewLanding = await axios.post('api/landing', data);
//   const NewLiftOff= await axios.post('api/liftOff', { ...data, ...{ "IdLanding": NewLanding.id}});
//   const NewHiking= await axios.post('api/hiking', { ...data, ...{ "IdLanding": NewLanding.id, "liftOff_id": NewLiftOff.id}});;
//   });
// }

// post landing --> Key --> liftOff--->

const nbrNewPhoto = newPhoto.length / 2;
const newPhotoTable = [];
const n = 0;
let jsonString = '{';
// Faire un tableau D'objet [{"name": "name_photo", "url": "url_Photo"}, {"name": "name_photo", "url": "url_Photo"}]
newPhoto.forEach((element, index) => {
  jsonString += `${element},`;
  if (index % 2 === 0 && index === 0) {
    jsonString += '}';
    newPhotoTable.push();
  }
});

data.photo_landing = `'name': '${img}', 'url': '${url}'`;

{ ...data, 'photo_landing': img + url}
