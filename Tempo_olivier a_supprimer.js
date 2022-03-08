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

axios.post('https://apiovol.herokuapp.com/api/liftoff', {
  name: 'TestPostOliver3',
  photos: [{ name: 'photo rando déco2', IdLanding: [1, 2], url: 'https://idata.over-blog.com/2/08/31/84/gifs/cockpit-avion.jpg' },
    { name: 'photo rando déco', url: 'https://www.alibabuy.com/photos/library/1500/11681.jpg' }],
}, {
  headers: {
    Authorization: `Basic ${'eyJhbGciOiJIUzI1NiJ9.YWRtaW4.fuwJHQFiIlgT1krQ7dHFcldDkjwdp8-vofB_lF0VPL4'}`,
  },
})
  .then((response) => {
    // handle success
    console.log(response.data[0]);
  })
  .catch((error) => {
    // handle error
    console.log(error);
  });
