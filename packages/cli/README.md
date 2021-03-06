fmc
===

A CLI to operate on Formicarium

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@formicarium/cli.svg)](https://npmjs.org/package/@formicarium/cli)
[![CircleCI](https://circleci.com/gh/formicarium/formicarium-cli/tree/master.svg?style=shield)](https://circleci.com/gh/formicarium/formicarium-cli/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/fmc.svg)](https://npmjs.org/package/@formicarium/cli)
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
@formicarium/cli/1.7.2 darwin-x64 node-v12.12.0
$ fmc --help [COMMAND]
USAGE
  $ fmc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`fmc autocomplete [SHELL]`](#fmc-autocomplete-shell)
* [`fmc code:push [SERVICENAME]`](#fmc-codepush-servicename)
* [`fmc code:watch [SERVICENAME]`](#fmc-codewatch-servicename)
* [`fmc config GETORSET CONFIGPATH`](#fmc-config-getorset-configpath)
* [`fmc curl METHOD APPLICATIONNAME PATH`](#fmc-curl-method-applicationname-path)
* [`fmc devspace:create ID`](#fmc-devspacecreate-id)
* [`fmc devspace:delete NAME`](#fmc-devspacedelete-name)
* [`fmc devspace:info`](#fmc-devspaceinfo)
* [`fmc devspace:list`](#fmc-devspacelist)
* [`fmc devspace:services [NAME]`](#fmc-devspaceservices-name)
* [`fmc devspace:use NAME`](#fmc-devspaceuse-name)
* [`fmc git:push [SERVICENAME]`](#fmc-gitpush-servicename)
* [`fmc git:setup [NAME] [LOCALFOLDER]`](#fmc-gitsetup-name-localfolder)
* [`fmc help [COMMAND]`](#fmc-help-command)
* [`fmc repl [SERVICENAME] [INTERFACENAME]`](#fmc-repl-servicename-interfacename)
* [`fmc service:delete NAME`](#fmc-servicedelete-name)
* [`fmc service:deploy:image SERVICENAME`](#fmc-servicedeployimage-servicename)
* [`fmc service:deploy:local [SERVICENAME] [LOCALPATH]`](#fmc-servicedeploylocal-servicename-localpath)
* [`fmc service:deploy:set [FILEPATH]`](#fmc-servicedeployset-filepath)
* [`fmc service:list`](#fmc-servicelist)
* [`fmc service:logs NAME`](#fmc-servicelogs-name)
* [`fmc service:restart NAME`](#fmc-servicerestart-name)
* [`fmc service:status`](#fmc-servicestatus)
* [`fmc setup URL`](#fmc-setup-url)

## `fmc autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ fmc autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ fmc autocomplete
  $ fmc autocomplete bash
  $ fmc autocomplete zsh
  $ fmc autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.1.0/src/commands/autocomplete/index.ts)_

## `fmc code:push [SERVICENAME]`

Configures local fmcgit and hive

```
USAGE
  $ fmc code:push [SERVICENAME]

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -w, --watch
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc code:push sr-barriga
```

_See code: [src/commands/code/push.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/code/push.ts)_

## `fmc code:watch [SERVICENAME]`

Configures local fmcgit and hive

```
USAGE
  $ fmc code:watch [SERVICENAME]

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc code:watch sr-barriga
```

_See code: [src/commands/code/watch.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/code/watch.ts)_

## `fmc config GETORSET CONFIGPATH`

Configures fmc CLI to one cluster

```
USAGE
  $ fmc config GETORSET CONFIGPATH

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: json] set output type
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc config get soilUrl
```

_See code: [src/commands/config.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/config.ts)_

## `fmc curl METHOD APPLICATIONNAME PATH`

Make a curl request to the service in the devspace being used. You can pass any extra arguments to curl at the end of the command

```
USAGE
  $ fmc curl METHOD APPLICATIONNAME PATH

OPTIONS
  -h, --help                 show CLI help
  -i, --interface=interface  [default: default] Interface to send the request
  -o, --output=output        [default: table] set output type
  -x, --extended             show extra columns
  --columns=columns          only show provided columns (comma-separated)
  --csv                      output is csv format
  --filter=filter            filter property by partial string matching, ex: name=foo
  --no-header                hide table header from output
  --no-truncate              do not truncate output to fit screen
  --sort=sort                property to sort by (prepend '-' for descending)

EXAMPLES
  $ fmc curl GET purgatory /api/version
  $ fmc curl POST -i default purgatory /do/something
  $ fmc curl POST purgatory /do/something -d '{...}'
  $ fmc curl GET s0-purgatory /api/version
```

_See code: [src/commands/curl.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/curl.ts)_

## `fmc devspace:create ID`

Creates a Devspace

```
USAGE
  $ fmc devspace:create ID

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -x, --extended       show extra columns
  --arg=arg
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLES
  $ fmc devspace:create paps
  $ fmc devspace:create acq --arg sharded
```

_See code: [src/commands/devspace/create.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/devspace/create.ts)_

## `fmc devspace:delete NAME`

Deletes a Devspace

```
USAGE
  $ fmc devspace:delete NAME

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc devspace:delete paps
```

_See code: [src/commands/devspace/delete.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/devspace/delete.ts)_

## `fmc devspace:info`

Get information for the current devspace

```
USAGE
  $ fmc devspace:info

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc devspace:info
```

_See code: [src/commands/devspace/info.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/devspace/info.ts)_

## `fmc devspace:list`

List availables Devspaces

```
USAGE
  $ fmc devspace:list

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc devspace:list
```

_See code: [src/commands/devspace/list.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/devspace/list.ts)_

## `fmc devspace:services [NAME]`

Lists the services in your devspace

```
USAGE
  $ fmc devspace:services [NAME]

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc devspace:services
```

_See code: [src/commands/devspace/services.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/devspace/services.ts)_

## `fmc devspace:use NAME`

Get version information about the current devspace

```
USAGE
  $ fmc devspace:use NAME

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc devspace:use paps
```

_See code: [src/commands/devspace/use.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/devspace/use.ts)_

## `fmc git:push [SERVICENAME]`

Configures local fmcgit and hive

```
USAGE
  $ fmc git:push [SERVICENAME]

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -w, --watch
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc git:push
```

_See code: [src/commands/git/push.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/git/push.ts)_

## `fmc git:setup [NAME] [LOCALFOLDER]`

Deploys service

```
USAGE
  $ fmc git:setup [NAME] [LOCALFOLDER]

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -s, --shard=shard    service shard
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc service:setup .
```

_See code: [src/commands/git/setup.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/git/setup.ts)_

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

## `fmc repl [SERVICENAME] [INTERFACENAME]`

Connects to remote repl. If no service is provided, connects on Hive's Repl

```
USAGE
  $ fmc repl [SERVICENAME] [INTERFACENAME]

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLES
  $ fmc repl
  $ fmc repl purgatory
  $ fmc repl purgatory common-repl
```

_See code: [src/commands/repl.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/repl.ts)_

## `fmc service:delete NAME`

Deletes a service in the current Devspace

```
USAGE
  $ fmc service:delete NAME

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -s, --shard=shard    service shard
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc service:delete mancini
```

_See code: [src/commands/service/delete.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/service/delete.ts)_

## `fmc service:deploy:image SERVICENAME`

Deploys service image

```
USAGE
  $ fmc service:deploy:image SERVICENAME

OPTIONS
  -a, --arg=arg            an arg to be sent to config server
  -f, --filePath=filePath  path to a definition file to be used
  -h, --help               show CLI help
  -o, --output=output      [default: table] set output type
  -x, --extended           show extra columns
  --columns=columns        only show provided columns (comma-separated)
  --csv                    output is csv format
  --filter=filter          filter property by partial string matching, ex: name=foo
  --no-header              hide table header from output
  --no-truncate            do not truncate output to fit screen
  --sort=sort              property to sort by (prepend '-' for descending)

EXAMPLES
  $ fmc service:deploy:image my-service
  $ fmc service:deploy:image my-service --arg version=5cfc8f3
```

_See code: [src/commands/service/deploy/image.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/service/deploy/image.ts)_

## `fmc service:deploy:local [SERVICENAME] [LOCALPATH]`

Deploys service from local files

```
USAGE
  $ fmc service:deploy:local [SERVICENAME] [LOCALPATH]

OPTIONS
  -a, --arg=arg            an arg to be sent to config server
  -f, --filePath=filePath  absoluteFilePath
  -h, --help               show CLI help
  -o, --output=output      [default: table] set output type
  -x, --extended           show extra columns
  --columns=columns        only show provided columns (comma-separated)
  --csv                    output is csv format
  --filter=filter          filter property by partial string matching, ex: name=foo
  --no-header              hide table header from output
  --no-truncate            do not truncate output to fit screen
  --sort=sort              property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc service:deploy:local -l . -f my-args.json my-service --arg version=1 --arg xablau=xpto
```

_See code: [src/commands/service/deploy/local.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/service/deploy/local.ts)_

## `fmc service:deploy:set [FILEPATH]`

Deploys a service set definition

```
USAGE
  $ fmc service:deploy:set [FILEPATH]

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc service:deploy:set my-set.json
```

_See code: [src/commands/service/deploy/set.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/service/deploy/set.ts)_

## `fmc service:list`

List services in the current Devspace

```
USAGE
  $ fmc service:list

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLES
  $ fmc service:list
  $ fmc service:list -o yaml
```

_See code: [src/commands/service/list.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/service/list.ts)_

## `fmc service:logs NAME`

A service logs in the current Devspace

```
USAGE
  $ fmc service:logs NAME

OPTIONS
  -f, --follow=follow  Follow logs
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc service:logs mancini
```

_See code: [src/commands/service/logs.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/service/logs.ts)_

## `fmc service:restart NAME`

Restart a service deployed in dev mode

```
USAGE
  $ fmc service:restart NAME

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc service:restart mancini
```

_See code: [src/commands/service/restart.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/service/restart.ts)_

## `fmc service:status`

Restart a service deployed in dev mode

```
USAGE
  $ fmc service:status

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc service:restart mancini
```

_See code: [src/commands/service/status.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/service/status.ts)_

## `fmc setup URL`

Configures fmc CLI to one cluster

```
USAGE
  $ fmc setup URL

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  [default: table] set output type
  -x, --extended       show extra columns
  --columns=columns    only show provided columns (comma-separated)
  --csv                output is csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)

EXAMPLE
  $ fmc setup https://soil.your.host.here
```

_See code: [src/commands/setup.ts](https://github.com/formicarium/fmc/blob/v1.7.2/src/commands/setup.ts)_
<!-- commandsstop -->
