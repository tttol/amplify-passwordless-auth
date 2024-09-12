"use client"
import  outputs  from "@/../amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);
export default function Simple() {
  return (
    <>
      <h1>Simple Sign-in</h1>
      <p><a href="/">FIDO2 Sign-in</a></p>
      <Authenticator>
        {({user}) => (
            <p>Hello {user?.signInDetails?.loginId}!</p>
        )}
      </Authenticator>
    </>
  );
}
