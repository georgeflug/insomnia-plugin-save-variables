#!/bin/bash

# This script performs a quick install of the plugin into Insomnia by
# skipping the installation of npm modules

set -a
source .env
set +a

export MY_PLUGIN_DIR="$PLUGINS_DIRECTORY/insomnia-plugin-save-variables"

npm run build

rm -rf "$MY_PLUGIN_DIR/dist"
cp -r dist "$MY_PLUGIN_DIR/dist"
