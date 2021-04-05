/* eslint-disable import/no-anonymous-default-export */
const getHighlighters = () => {
  //   const querys: any = [];
  //   structures.map((structure) => {
  //     if (structure.label !== "Propriedade") {
  //       return querys.push(api.get(`/highlighters-types/${structure.value}`));
  //     }
  //     return null;
  //   });
  //   if (querys.length > 0) {
  //     Promise.all(querys).then((responses: Array<any>) => {
  //       const _highlighters: Array<HighlighterProps> = [];
  //       responses.map((response) =>
  //         _highlighters.push(...response.data.highlighters)
  //       );
  //       setHighlighters(_highlighters);
  //       console.log(responses);
  //     });
  //   } else {
  //     api.get("/highlighters").then((response) => {
  //       setHighlighters(response.data);
  //     });
  //   }
};

const getProducers = () => {
  // if (coveredPlanting && irrigated) {
  //   api.get("/producers", {
  //       params: {
  //         covered_planting: coveredPlanting,
  //         irrigated: irrigated,
  //       },
  //     })
  //     .then((response) => {
  //       setProducers(response.data);
  //     });
  // }
  //   api.get("/producers").then((response) => {
  //     setProducers(response.data);
  //   });
};

export default { getHighlighters, getProducers };
