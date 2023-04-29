const yaml = require('yaml');
const fs = require('fs');
const { resolve } = require('path');
const merge = require('merge-deep');

const defaultConfigPath = resolve('./config.yml');
const devConfigPath = resolve('./config.dev.yml');
const defaultConfig = yaml.parse(fs.readFileSync(defaultConfigPath, 'utf8'));

const config = !fs.existsSync(devConfigPath)
  ? defaultConfig
  : merge(defaultConfig, yaml.parse(fs.readFileSync(devConfigPath, 'utf8')));

module.exports = config;
