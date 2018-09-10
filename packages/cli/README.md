fmc
===

A CLI to operate on Formicarium

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/fmc.svg)](https://npmjs.org/package/fmc)
[![CircleCI](https://circleci.com/gh/formicarium/formicarium-cli/tree/master.svg?style=shield)](https://circleci.com/gh/formicarium/formicarium-cli/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/formicarium/formicarium-cli?branch=master&svg=true)](https://ci.appveyor.com/project/formicarium/formicarium-cli/branch/master)
[![Codecov](https://codecov.io/gh/formicarium/formicarium-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/formicarium/formicarium-cli)
[![Downloads/week](https://img.shields.io/npm/dw/fmc.svg)](https://npmjs.org/package/fmc)
[![License](https://img.shields.io/npm/l/fmc.svg)](https://github.com/formicarium/formicarium-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @formicarium/cli
$ fmc COMMAND
running command...
$ fmc (-v|--version|version)
@formicarium/cli/1.2.1 darwin-x64 node-v10.2.1
$ fmc --help [COMMAND]
USAGE
  $ fmc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`fmc devspace:create ID`](#fmc-devspacecreate-id)
* [`fmc devspace:delete NAME`](#fmc-devspacedelete-name)
* [`fmc devspace:info`](#fmc-devspaceinfo)
* [`fmc devspace:list`](#fmc-devspacelist)
* [`fmc devspace:services [NAME]`](#fmc-devspaceservices-name)
* [`fmc devspace:use NAME`](#fmc-devspaceuse-name)
* [`fmc git:push [SERVICENAME]`](#fmc-gitpush-servicename)
* [`fmc git:setup [NAME] [LOCALFOLDER]`](#fmc-gitsetup-name-localfolder)
* [`fmc help [COMMAND]`](#fmc-help-command)
* [`fmc repl`](#fmc-repl)
* [`fmc service:delete NAME`](#fmc-servicedelete-name)
* [`fmc service:deploy:local [SERVICENAME] [LOCALPATH]`](#fmc-servicedeploylocal-servicename-localpath)
* [`fmc service:restart NAME`](#fmc-servicerestart-name)
* [`fmc service:status`](#fmc-servicestatus)
* [`fmc setup URL`](#fmc-setup-url)

## `fmc devspace:create ID`

Creates a Devspace

```
USAGE
  $ fmc devspace:create ID

OPTIONS
  -h, --help  show CLI help
  --test

EXAMPLE
  $ fmc devspace:create paps
```

_See code: [src/commands/devspace/create.ts](https://github.com/formicarium/formicarium-cli/blob/v1.2.1/src/commands/devspace/create.ts)_

## `fmc devspace:delete NAME`

Deletes a Devspace

```
USAGE
  $ fmc devspace:delete NAME

OPTIONS
  -h, --help  show CLI help
  --test

EXAMPLE
  $ fmc devspace:delete paps
```

_See code: [src/commands/devspace/delete.ts](https://github.com/formicarium/formicarium-cli/blob/v1.2.1/src/commands/devspace/delete.ts)_

## `fmc devspace:info`

Get information for the current devspace

```
USAGE
  $ fmc devspace:info

OPTIONS
  -h, --help  show CLI help
  --test

EXAMPLE
  $ fmc devspace:info
```

_See code: [src/commands/devspace/info.ts](https://github.com/formicarium/formicarium-cli/blob/v1.2.1/src/commands/devspace/info.ts)_

## `fmc devspace:list`

List availables Devspaces

```
USAGE
  $ fmc devspace:list

OPTIONS
  -h, --help  show CLI help
  --test

EXAMPLE
  $ fmc devspace:list
```

_See code: [src/commands/devspace/list.ts](https://github.com/formicarium/formicarium-cli/blob/v1.2.1/src/commands/devspace/list.ts)_

## `fmc devspace:services [NAME]`

Lists the services in your devspace

```
USAGE
  $ fmc devspace:services [NAME]

OPTIONS
  -h, --help  show CLI help
  --test

EXAMPLE
  $ fmc devspace:services
```

_See code: [src/commands/devspace/services.ts](https://github.com/formicarium/formicarium-cli/blob/v1.2.1/src/commands/devspace/services.ts)_

## `fmc devspace:use NAME`

Configures to use one Devspace context

```
USAGE
  $ fmc devspace:use NAME

OPTIONS
  -h, --help  show CLI help
  --test

EXAMPLE
  $ fmc devspace:use paps
```

_See code: [src/commands/devspace/use.ts](https://github.com/formicarium/formicarium-cli/blob/v1.2.1/src/commands/devspace/use.ts)_

## `fmc git:push [SERVICENAME]`

Configures local syncthing and hive

```
USAGE
  $ fmc git:push [SERVICENAME]

OPTIONS
  -h, --help   show CLI help
  -w, --watch
  --test

EXAMPLE
  $ fmc sync:push
```

_See code: [src/commands/git/push.ts](https://github.com/formicarium/formicarium-cli/blob/v1.2.1/src/commands/git/push.ts)_

## `fmc git:setup [NAME] [LOCALFOLDER]`

Deploys service

```
USAGE
  $ fmc git:setup [NAME] [LOCALFOLDER]

OPTIONS
  -h, --help         show CLI help
  -s, --shard=shard  service shard
  --test

EXAMPLE
  $ fmc service:setup .
```

_See code: [src/commands/git/setup.ts](https://github.com/formicarium/formicarium-cli/blob/v1.2.1/src/commands/git/setup.ts)_

## `fmc help [COMMAND]`

display help for fmc

```
USAGE
  $ fmc help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.1/src/commands/help.ts)_

## `fmc repl`

Connects to remote Hive's repl

```
USAGE
  $ fmc repl

OPTIONS
  -h, --help   show CLI help
  --host=host  host to connect
  --test

EXAMPLE
  $ fmc repl
```

_See code: [src/commands/repl.ts](https://github.com/formicarium/formicarium-cli/blob/v1.2.1/src/commands/repl.ts)_

## `fmc service:delete NAME`

Deletes a service in the current Devspace

```
USAGE
  $ fmc service:delete NAME

OPTIONS
  -h, --help         show CLI help
  -s, --shard=shard  service shard
  --test

EXAMPLE
  $ fmc service:delete mancini
```

_See code: [src/commands/service/delete.ts](https://github.com/formicarium/formicarium-cli/blob/v1.2.1/src/commands/service/delete.ts)_

## `fmc service:deploy:local [SERVICENAME] [LOCALPATH]`

Deploys service

```
USAGE
  $ fmc service:deploy:local [SERVICENAME] [LOCALPATH]

OPTIONS
  -a, --arg=arg            an arg to be sent to config server
  -f, --filePath=filePath  absoluteFilePath
  -h, --help               show CLI help
  --test

EXAMPLE
  $ fmc service:deploy:local -l . -f my-args.json my-service --arg version=1 --arg xablau=xpto
```

_See code: [src/commands/service/deploy/local.ts](https://github.com/formicarium/formicarium-cli/blob/v1.2.1/src/commands/service/deploy/local.ts)_

## `fmc service:restart NAME`

Restart a service deployed in dev mode

```
USAGE
  $ fmc service:restart NAME

OPTIONS
  -h, --help         show CLI help
  -s, --shard=shard  service shard
  --test

EXAMPLE
  $ fmc service:restart mancini
```

_See code: [src/commands/service/restart.ts](https://github.com/formicarium/formicarium-cli/blob/v1.2.1/src/commands/service/restart.ts)_

## `fmc service:status`

Restart a service deployed in dev mode

```
USAGE
  $ fmc service:status

OPTIONS
  -h, --help         show CLI help
  -s, --shard=shard  service shard
  --test

EXAMPLE
  $ fmc service:restart mancini
```

_See code: [src/commands/service/status.ts](https://github.com/formicarium/formicarium-cli/blob/v1.2.1/src/commands/service/status.ts)_

## `fmc setup URL`

Configures Formicarium CLI to one cluster

```
USAGE
  $ fmc setup URL

OPTIONS
  -h, --help  show CLI help
  --test

EXAMPLE
  $ fmc setup https://soil.your.host.here
```

_See code: [src/commands/setup.ts](https://github.com/formicarium/formicarium-cli/blob/v1.2.1/src/commands/setup.ts)_
<!-- commandsstop -->
