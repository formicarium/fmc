export class RepoAlreadyExists extends Error {
  constructor() {
    super('Repo already exists')
  }
}

export class InternalServerError extends Error {
  constructor() {
    super('Internal server error')
  }
}

export class RepoNotFound extends Error {
  constructor() {
    super('Repo not found')
  }
}
