#!/usr/bin/env sh

esbuild_cmd() {
  format=$1

  outdir="dist/esm"
  platform="browser"

  if [ "$format" == "cjs" ]; then
    outdir="dist/cjs"
    platform="node"
  fi

  ./node_modules/.bin/esbuild \
    --outdir=$outdir \
    --platform=$platform \
    --target=es2019 \
    --sourcemap \
    --bundle \
    --format=esm \
    --splitting \
    --log-level=error \
    --jsx-factory='React.createElement' \
    --jsx-fragment='React.Fragment' \
    --loader:.json=json \
    --loader:.js=jsx \
    --external:"react" \
    --external:"assert" \
    --external:"crypto" \
    --external:"http" \
    --external:"https" \
    --external:"os" \
    --external:"stream" \
    --external:"url" \
    --external:"util" \
    src/index.js
}

esbuild_cmd esm
# esbuild_cmd cjs
