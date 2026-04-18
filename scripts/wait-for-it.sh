#!/bin/sh

WAITFORIT_HOST=""
WAITFORIT_PORT=""
WAITFORIT_TIMEOUT=15
WAITFORIT_STRICT=0
WAITFORIT_QUIET=0

echoerr() {
  if [ "$WAITFORIT_QUIET" -ne 1 ]; then
    echo "$@" >&2
  fi
}

# Parse host:port
case "$1" in
  *:*)
    WAITFORIT_HOST=$(echo "$1" | cut -d: -f1)
    WAITFORIT_PORT=$(echo "$1" | cut -d: -f2)
    shift
    ;;
esac

WAITFORIT_CLI="$@"

if [ -z "$WAITFORIT_HOST" ] || [ -z "$WAITFORIT_PORT" ]; then
  echoerr "Error: host and port required"
  exit 1
fi

echoerr "Waiting for $WAITFORIT_HOST:$WAITFORIT_PORT..."

start_ts=$(date +%s)

while :
do
  nc -z "$WAITFORIT_HOST" "$WAITFORIT_PORT" >/dev/null 2>&1
  result=$?

  if [ "$result" -eq 0 ]; then
    end_ts=$(date +%s)
    echoerr "Available after $((end_ts - start_ts)) seconds"
    break
  fi

  sleep 1
done

if [ -n "$WAITFORIT_CLI" ]; then
  exec $WAITFORIT_CLI
fi