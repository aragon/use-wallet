#!/usr/bin/env sh

esbuild_cmd() {
  format=$1

  outdir="dist/esm"
  platform="browser"

  if [ "$format" = "cjs" ]; then
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

  if [ "$format" = "esm" ]; then
    fix_esm_default "@walletconnect/web3-provider/dist/cjs/index.js"
    fix_esm_default "walletlink/dist/index.js"
  fi
}

fix_esm_default() {

  # This is an awful solution to a problem that couldn’t get solved in any
  # other way (as of 2020-08-07). WalletConnect uses CommonJS with
  # the `__esModule: true` property, indicating that the CJS module can be
  # transformed into ESM. Unfortunately, it ends up being exported
  # as `export default { default: value }` rather than `export default value`,
  # in several bundlers.

  # In the end, the decision was made to:
  # - Use esbuild.
  # - Remove SquareLink.
  # - Fix the WalletConnect module using a search & replace.

  # Here is a detail of the different things I tried:

  # Rollup
  # Rollup seems to have the same troubles to convert the __esModule format,
  # and is having another issue that prevents to use it for the CJS-to-ESM
  # conversion.
  # See https://github.com/rollup/plugins/issues/532

  # Rollup with a CJS-to-ESM plugin for Babel
  # The babel plugin was erroring when trying to convert modules using `import`
  # in other places than at the top, which some of our dependencies are doing.
  # Plugin: https://github.com/tbranyen/babel-plugin-transform-commonjs

  # Webpack 4
  # Doesn’t export in ESM, so we can’t use it for a modern library.

  # Webpack 5
  # Provides an experimental ESM support, but breaks compatibility with some
  # connectors used in useWallet() expecting a Node.js environment.

  # esbuild
  # Builds and exports properly, but fails to convert the __esModule
  # format in for WalletConnect. It also fails to build the SquareLink module.

  # esbuild, then webpack or rollup
  # Too much added complexity, and was introducing other issues, like keeping
  # track of the sourcemaps.

  sed -E -i \
    's/(export default[^;]+);?$/\1.default;/' \
    "./dist/esm/node_modules/$1"
}

esbuild_cmd esm
esbuild_cmd cjs
