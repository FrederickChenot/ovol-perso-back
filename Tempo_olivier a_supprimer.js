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