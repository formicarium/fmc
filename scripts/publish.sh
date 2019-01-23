#!/bin/bash
# This script gets the repo via params:
#   ./publish --repo https://private.repo/url


publish() {
  (
    pack=$1
    if [ "$pack" == "tools" ]; then return; fi
    cd "packages/$pack"
    local name=$(cat package.json | grep name | head -n 1 | cut -d'"' -f 4)
    local targetVersion=$(cat package.json | grep version | head -n 1 | cut -d'"' -f 4)
    local currentVersion=$(npm view @formicarium/$pack version)
    if [ -z "$currentVersion" ]; then currentVersion="0.0.0"; fi
    echo "$1@$currentVersion -> $targetVersion"
    if [ "$currentVersion" != "$targetVersion" ]; then npm publish; fi
  )
}

for i in $(cd packages && ls -d */ | tr -d "/"); do publish $i; done
