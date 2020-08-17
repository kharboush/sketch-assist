export const TEMPLATE_DIR = 'src/assistant/origin';

const config = {
  active: false,
};
export const RULES = [
  {
    assistant: '@sketch-hq/sketch-core-assistant',
    rules: [
      {
        name: 'artboards-grid',
        config: {
          ...config,
          grids: [
            { gridBlockSize: 5, thickLinesEvery: 10 },
            { gridBlockSize: 10, thickLinesEvery: 20 },
          ],
        },
      },
      {
        name: 'artboards-layout',
        config: {
          ...config,
          layouts: [
            {
              columnWidth: 10,
              drawHorizontal: true,
              drawHorizontalLines: true,
              drawVertical: true,
              gutterHeight: 10,
              gutterWidth: 10,
              guttersOutside: true,
              horizontalOffset: 0,
              numberOfColumns: 10,
              rowHeightMultiplication: 5,
              totalWidth: 200,
            },
          ],
        },
      },
      {
        name: 'artboards-max-ungrouped-layers',
        config: {
          ...config,
          maxUngroupedLayers: 5,
        },
      },
      { name: 'borders-no-disabled', config },
      { name: 'exported-layers-normal-blend-mode', config },
      { name: 'fills-no-disabled', config },
      {
        name: 'groups-max-layers',
        config: {
          ...config,
          maxLayers: 50,
          skipClasses: ['artboard'],
        },
      },
      { name: 'groups-no-empty', config },
      { name: 'groups-no-redundant', config },
      {
        name: 'groups-no-similar',
        config: {
          ...config,
          maxIdentical: 2,
        },
      },
      {
        name: 'images-no-outsized',
        config: {
          ...config,
          maxRatio: 2,
        },
      },
      {
        name: 'images-no-undersized',
        config: {
          ...config,
          minRatio: 0.5,
        },
      },
      { name: 'inner-shadows-no-disabled', config },
      { name: 'layer-styles-no-dirty', config },
      {
        name: 'layer-styles-prefer-shared',
        config: {
          ...config,
          maxIdentical: 2,
        },
      },
      { name: 'layers-no-hidden', config },
      { name: 'layers-no-loose', config },
      {
        name: 'layers-subpixel-positioning',
        config: {
          ...config,
          scaleFactors: ['@2x'],
        },
      },
      {
        name: 'library-layer-styles-allowed-libraries',
        config: {
          ...config,
          libraries: ['my-library'],
        },
      },
      {
        name: 'library-symbols-allowed-libraries',
        config: {
          ...config,
          libraries: ['my-library'],
        },
      },
      {
        name: 'library-text-styles-allowed-libraries',
        config: {
          ...config,
          libraries: ['my-library'],
        },
      },
      {
        name: 'name-pattern-artboards',
        config: {
          ...config,
          libraries: ['my-library'],
        },
      },
      {
        name: 'name-pattern-groups',
        config: {
          ...config,
          allowed: [],
          forbidden: ['^Group$'],
        },
      },
      {
        name: 'name-pattern-images',
        config: {
          ...config,
          allowed: [],
          forbidden: [],
        },
      },
      {
        name: 'name-pattern-pages',
        config: {
          ...config,
          allowed: [],
          forbidden: ['^Page d.?$'],
        },
      },
      {
        name: 'name-pattern-shapes',
        config: {
          ...config,
          allowed: [],
          forbidden: [
            '^Oval$',
            '^Rectangle$',
            '^Star$',
            '^Triangle$',
            '^Line$',
            '^Polygon$',
          ],
        },
      },
      {
        name: 'name-pattern-symbols',
        config: {
          ...config,
          allowed: ['^(w+/?)+w+$'],
          forbidden: [],
        },
      },
      {
        name: 'name-pattern-text',
        config: {
          ...config,
          allowed: [],
          forbidden: ['^Group$'],
        },
      },
      {
        name: 'result-messages-include',
        config: {
          ...config,
          messages: [
            'Save to Sketch Cloud',
            'Run copy past the marketing team',
          ],
        },
      },
      { name: 'shadows-no-disabled', config },
      { name: 'shared-styles-no-unused', config },
      { name: 'symbols-no-detached', config },
      { name: 'symbols-no-unused', config },
      { name: 'text-styles-no-dirty', config },
      {
        name: 'text-styles-prefer-shared',
        config: {
          ...config,
          maxIdentical: 2,
        },
      },
    ],
  },
];

export const PACKAGE_JSON = {
  name: 'sketch-assistant',
  homepage: 'https://github.com/kharboush/sketch-assistant',
  version: '1.0.0',
  main: 'dist/index.js',
  sketch: 'dist/sketch.js',
  license: 'MIT',
  'sketch-assistant': {
    title: 'Sketch Modular Assistant',
    description: 'Watch this space',
    icon: '',
  },
  author: {
    name: 'Anton Kharboush',
  },
  keywords: [
    'sketch',
    'sketch files',
    'sketch assistant',
    'public',
    'assistant',
    'design ops',
  ],
  files: ['dist'],
  scripts: {
    test: 'jest --no-cache',
    build: 'rm -rf dist && npm run build:node && npm run build:sketch',
    'build:node': 'tsc',
    'build:sketch': 'webpack',
    'package-tarball': 'npm run build && npm run pack',
    pack: '(cd out/ && exec npm pack ../)',
  },
  devDependencies: {
    '@sketch-hq/sketch-assistant-utils': '6.0.0',
    '@sketch-hq/sketch-assistant-types': '6.0.0',
    '@sketch-hq/sketch-core-assistant': '^6.1.0',
    '@types/jest': '26.0.4',
    '@types/node': '14.0.22',
    eslint: '^7.7.0',
    jest: '26.1.0',
    'node-fetch': '2.6.0',
    prettier: '2.0.5',
    'ts-jest': '26.1.2',
    typescript: '3.9.6',
    webpack: '4.43.0',
    'webpack-cli': '3.3.12',
  },
  dependencies: {},
};
