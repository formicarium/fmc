export class NotGitRepo extends Error {
  constructor() {
    super('NotGitRepo')
  }
}

export class RemoteNotRegistered extends Error {
  constructor() {
    super('RemoteNotRegistered')
  }
}
