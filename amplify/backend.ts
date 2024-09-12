import { defineBackend } from '@aws-amplify/backend';
import { Passwordless } from 'amazon-cognito-passwordless-auth/cdk';
import * as cdk from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import { auth } from './auth/resource';
import { data } from './data/resource';

const AUTH_FRONTEND_URL = process.env.AUTH_FRONTEND_URL ?? "http://localhost:3000";
const AUTH_FRONTEND_HOST = process.env.AUTH_FRONTEND_HOST ?? "localhost";
const AUTH_EMAIL_FROM_ADDRESS = process.env.AUTH_EMAIL_FROM_ADDRESS ?? "no-reply@dev-amazonses.link";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
});

const userPool = backend.auth.resources.userPool as cdk.aws_cognito.UserPool;
const userPoolClient = backend.auth.resources.userPoolClient as cdk.aws_cognito.UserPoolClient;
const authStack = Stack.of(userPool);

const passwordless = new Passwordless(authStack, "Passwordless", {
  userPool,
  userPoolClients: [userPoolClient],
  allowedOrigins: [
    AUTH_FRONTEND_URL!
  ],
  fido2: {
    allowedRelyingPartyIds: [
      AUTH_FRONTEND_HOST!
    ],
  },
  magicLink: {
    sesFromAddress: AUTH_EMAIL_FROM_ADDRESS!,
  },
});

backend.addOutput({
  custom: {
    fido2ApiUrl: passwordless.fido2Api?.url ?? "",
  },
});