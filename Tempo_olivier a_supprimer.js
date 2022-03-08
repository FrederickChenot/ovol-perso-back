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

axios.post('https://apiovol.herokuapp.com/api/liftoff', { name: 'TestPostOliver' }, {
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
