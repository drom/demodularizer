#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs-extra');

const babel = require('@babel/core');

const files = [
  './flame-chart-container.js',
  './flame-chart.js',
  './index.js',
  './types.js',
  './utils.js',

  './plugins/flame-chart-plugin.js',
  './plugins/marks-plugin.js',
  './plugins/timeframe-selector-plugin.js',
  './plugins/time-grid-plugin.js',
  './plugins/toggle-plugin.js',
  './plugins/ui-plugin.js',
  './plugins/waterfall-plugin.js',

  './plugins/utils/tree-clusters.js',

  './engines/basic-render-engine.js',
  './engines/interactions-engine.js',
  './engines/offscreen-render-engine.js',
  './engines/render-engine.js',
  './engines/separated-interactions-engine.js',
  './engines/time-grid.js'
];

const main = () => {
  for (const file of files) {
    babel.transformFile(
      path.join(process.cwd(), './node_modules/flame-chart-js/dist/', file),
      {plugins: ['@babel/plugin-transform-modules-commonjs']},
      (err, result) => {
        if (err) {
          throw new Error(err);
        }
        fs.outputFile(
          path.join(process.cwd(), 'flame-chart-js', file),
          result.code,
          (err) => {
            if (err) {
              throw new Error(err);
            }
          }
        );
      }
    );
  }
};

main();
