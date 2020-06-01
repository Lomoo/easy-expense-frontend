import React from "react";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GoogleButton = styled.button`
  background-color: #4285f4 !Important;
  color: light grey !Important;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const GoogleIcon = styled.span`
  color: white;
  padding-left: 5px;
  padding-right: 5px;

`;
function Authbuttons(props) {
  return (
    <div>
      <GoogleButton
        className="button is-primary is-fullwidth"
        onClick={() => Auth.federatedSignIn({ provider: "Google" })}
      >
        <GoogleIcon>
          <FontAwesomeIcon icon={["fab", "google"]} />
        </GoogleIcon>
        Continue With Google
      </GoogleButton>
    </div>
  );
}

export default Authbuttons;
