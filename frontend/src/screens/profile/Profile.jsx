import { useMsal } from '@azure/msal-react';
import React, { useState } from 'react'
import { loginRequest } from "../../authConfig";
import { callMsGraph } from '../../graph';
const Profile = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    const RequestProfileData = () => {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        });
    }
  return (
    <div>{accounts[0].name}</div>
  )
}

export default Profile