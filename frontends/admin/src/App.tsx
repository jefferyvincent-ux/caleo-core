// @apollo/client
import { ApolloProvider } from '@apollo/client';

// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// editor
import 'react-quill/dist/quill.snow.css';

// ----------------------------------------------------------------------

// @mui
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { LicenseInfo } from '@mui/x-license-pro';

// routes
import Router from 'src/routes/sections';
// theme
import ThemeProvider from 'src/theme';
// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// components
import ProgressBar from 'src/components/progress-bar';
import MotionLazy from 'src/components/animate/motion-lazy';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
// auth
import { AuthProvider, AuthConsumer } from 'src/auth/context/amplify';
import { client } from './utils/apollo';
import { SnackbarProvider } from './components/snackbar';
import ErrorComponent from './components/error/Error';

// ----------------------------------------------------------------------

LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_X_LICENSE_KEY || '');

export default function App() {
  const charAt = `

  ░░░    ░░░
  ▒▒▒▒  ▒▒▒▒
  ▒▒ ▒▒▒▒ ▒▒
  ▓▓  ▓▓  ▓▓
  ██      ██

  `;

  console.info(`%c${charAt}`, 'color: #5BE49B');

  useScrollToTop();

  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'dark', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'blue', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: true,
          }}
        >
          <ThemeProvider>
            <ApolloProvider client={client}>
              <MotionLazy>
                <SnackbarProvider>
                  <SettingsDrawer />
                  <ProgressBar />
                  <AuthConsumer>
                    <ErrorComponent>
                      <Router />
                    </ErrorComponent>
                  </AuthConsumer>
                </SnackbarProvider>
              </MotionLazy>
            </ApolloProvider>
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}
