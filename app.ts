#!/usr/bin/env node
import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { PinpointStack } from './src/pinpoint-stack';

const app = new App();

new PinpointStack(app, 'PinpointStack');

app.synth();
