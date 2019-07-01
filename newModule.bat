#!/bin/bash
set -o errexit
cd ./src/modules
nest g module $1
nest g co $1
nest g service $1
