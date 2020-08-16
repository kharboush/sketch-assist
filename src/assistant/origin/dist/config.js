"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = exports.extendedAssistants = void 0;
const sketch_core_assistant_1 = __importDefault(require("@sketch-hq/sketch-core-assistant"));
exports.extendedAssistants = [sketch_core_assistant_1.default];
exports.rules = JSON.parse(require('./rules.json'));
