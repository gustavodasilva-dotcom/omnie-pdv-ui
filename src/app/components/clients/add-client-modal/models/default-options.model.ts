import { SaveClient } from '../../../../services/clients/models/save-client.model'

interface DefaultOptionsCallback {
  save: Function,
  cancel: Function
};

export interface DefaultOptions {
  id: string,
  model: SaveClient,
  callbacks: DefaultOptionsCallback
};