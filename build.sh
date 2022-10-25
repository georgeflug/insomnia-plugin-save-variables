#!/bin/bash

# patch-package cannot run the normal way (as a postinstall hook)
# because it will fail during installation in Insomnia
npx patch-package

npx tsc
