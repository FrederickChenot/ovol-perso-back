const findLandings = async (ids) => {
  // TODO : iterate sur getLanding(id)
  const result = [];
  console.log(indexMoche);
  await ids.forEach(async (id, index) => {
    result.push(await findByPk(id));
  });
  return result;
};
