// This file runs the authentication for our React app from our API endpoints

import { createAuthProvider } from 'react-token-auth'


export const { useAuth, authFetch, login, logout } =
    createAuthProvider({
        getAccessToken: access_token,
        storage: localStorage,
        onUpdateToken: token =>
            fetch('/refresh', {
                method: 'POST',
                body: token.refresh_token,
            }).then(r => r.json()),
    });