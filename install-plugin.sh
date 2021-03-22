#!/bin/bash

set -a
source .env
set +a

export MY_PLUGIN_DIR="$PLUGINS_DIRECTORY/insomnia-plugin-save-variables"

npm run build

rm -rf "$MY_PLUGIN_DIR"
mkdir -p "$MY_PLUGIN_DIR"

cp package.json "$MY_PLUGIN_DIR/package.json"
cp -r dist "$MY_PLUGIN_DIR/dist"
