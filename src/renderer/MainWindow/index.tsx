import { RouterProvider, createHashRouter } from 'react-router';
import { routes } from './router/routes';

const router = createHashRouter(routes);

export function MainWindow() {
  return <RouterProvider router={router} />;
}
