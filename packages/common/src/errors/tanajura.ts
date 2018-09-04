export class RepoAlreadyExists extends Error {
  public type: string
  constructor() {
    super('Repo already exists')
    this.type = 'RepoAlreadyExists'
  }
}

export class InternalServerError extends Error {
  public type: string
  constructor() {
    super('Internal server error')
    this.type = 'InternalServerError'
  }
}

export class RepoNotFound extends Error {
  public type: string
  constructor() {
    super('Repo not found')
    this.type = 'RepoNotFound'
  }
}
