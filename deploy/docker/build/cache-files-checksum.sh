#!/usr/bin/env bash
set -eu

( \
  echo "yarn.lock"
  echo "deploy/docker/build/cache-files-checksum.sh"
  echo "deploy/docker/build/Dockerfile_cache"
) \
  | xargs -d "\n" md5sum | sort -k 2 | md5sum | cut -d " " -f 1
