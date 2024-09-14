"use client"

import outputs from "@/../amplify_outputs.json";
import { Passwordless } from "amazon-cognito-passwordless-auth";
import { Fido2Toast, Passwordless as PasswordlessComponent, PasswordlessContextProvider } from "amazon-cognito-passwordless-auth/react";
import { Amplify } from "aws-amplify";
import React from "react";
import "./styles.css";

export default function Home() {
  Amplify.configure(outputs);
  Passwordless.configure({
    clientId: outputs.auth.user_pool_client_id,
    cognitoIdpEndpoint: outputs.auth.aws_region,
    fido2: {
      baseUrl: outputs.custom.fido2ApiUrl,
      authenticatorSelection: {
        userVerification: "required",
      },
    },
  });
  return (
    <>
      <h1>Hello amplify-passwordless-auth</h1>
      <h2>FIDO2 Sign-in</h2>
      <p><a href="/signin/simple">Go to Simple Sign-in</a></p>
      <PasswordlessContextProvider enableLocalUserCache={true}>
        <PasswordlessComponent
          brand={{
            backgroundImageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Manhattan_in_the_distance_%28Unsplash%29.jpg/2880px-Manhattan_in_the_distance_%28Unsplash%29.jpg",
            customerName: "Amazon Web Services",
            customerLogoUrl:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1280px-Amazon_Web_Services_Logo.svg.png",
          }}
        >
          <React.StrictMode>
            <p>FIDO2 authentication has suceeded.</p>
          </React.StrictMode>
        </PasswordlessComponent>
        <Fido2Toast /> {/* Add Fido2Toast below App so it is rendered on top */}
      </PasswordlessContextProvider>
    </>
  );
}
