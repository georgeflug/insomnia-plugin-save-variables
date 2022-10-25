#!/bin/bash

# This script performs a quick install of the plugin into Insomnia by
# skipping the installation of npm modules

# patch-package cannot run the normal way (as a postinstall hook)
# because it will fail during installation in Insomnia
npx patch-package

npx tsc
