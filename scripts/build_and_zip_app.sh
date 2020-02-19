#!/bin/bash

set -Eeou pipefail

yarn build
cp appspec.yml build
cd build
zip -r app.zip *
mkdir zipped_app
mv app.zip zipped_app
