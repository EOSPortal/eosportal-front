import config from "../config";

export const getAllProducers = () =>
  fetch(`${config.api}/producers/`).then(response => response.json());

export const getSingleProducer = (id: string) =>
  fetch(`${config.api}/producers/${id}`).then(response => response.json());

export const getSingleProducerBlocks = (id: string) =>
  fetch(`${config.api}/producers/${id}/blocks`).then(response =>
    response.json()
  );
