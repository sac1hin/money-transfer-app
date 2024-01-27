import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';

const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'http:',
});

export const AuthProviders = ({ children }) => (
    <AuthProvider store={store}>
        {children}
    </AuthProvider>
);