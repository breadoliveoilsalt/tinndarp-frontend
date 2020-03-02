#!/bin/bash

set -Eeou pipefail

CI=true yarn test
