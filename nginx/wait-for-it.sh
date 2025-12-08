#!/bin/bash
# wait-for-it.sh - wait for a service to be available

host="$1"
shift
port="$1"
shift
timeout=30

nc -z -v -w5 "$host" "$port" || exit 1
exec "$@"
