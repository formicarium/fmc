import { IDevspaceConfig } from './../services/config';
import { IDevspace } from "../model";

export const devspaceToDevspaceConfig = (devspace: IDevspace): IDevspaceConfig => ({
  name: devspace.name,
  hiveApiUrl: devspace.hive.links.default,
  hiveReplUrl: devspace.hive.links.repl,
  tanajuraApiUrl: devspace.tanajura.links.default,
  tanajuraGitUrl: devspace.tanajura.links.git,
  configServerUrl: 'TODO',
})
