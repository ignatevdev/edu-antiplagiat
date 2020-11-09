#!/usr/bin/env bash
# скрипт подсчитываем чексумму файлов одного из проектов
# это можно использовать при принятии решения, нужно ли пересобирать докер-образ
# так, используя чексумму как тег образа, мы минуем этап сборки образа в CI, если чексумма не изменилась
set -eu

# в число файлов значимых для образа не входят следующие файлы:
function _exclude_files(){
  # файлы гита
  # манифесты docker-compose
  # артефакты Jenkins для деплоя/запуска приложения
  grep -v -E "^\./\.git/" \
  | grep -v "docker-compose" \
  | grep -v -E "^\./\.env$|.tmp..env|.env.deploy|GIT_COMMIT"
}

find . -type f | _exclude_files \
  | xargs -d "\n" md5sum | sort -k 2 | md5sum | cut -d " " -f 1
