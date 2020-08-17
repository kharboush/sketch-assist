"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = exports.extendedAssistants = void 0;
const CoreAssistant = require('@sketch-hq/sketch-core-assistant');
exports.extendedAssistants = [CoreAssistant];
exports.rules = { "@sketch-hq/sketch-core-assistant/artboards-grid": { "active": true, "grids": [{ "gridBlockSize": 5, "thickLinesEvery": 10 }, { "gridBlockSize": 10, "thickLinesEvery": 20 }] }, "@sketch-hq/sketch-core-assistant/result-messages-include": { "ruleTitle": "Page names should start with a 🍆", "active": true, "messages": ["Don't save anything", "Run copy past the marketing team"] } };
