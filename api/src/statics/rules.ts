const config = {
  active: false,
};

export default [
  {
    packageName: '@sketch-hq/sketch-core-assistant',
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
