import { pluginSystem } from '@cms-workspace/plugin-system';
import { ImagePlugin } from '@cms-workspace/plugin-system';

pluginSystem.registerPlugin(ImagePlugin);

function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

export default MyApp;
