import renderer from 'react-test-renderer';

export const expectSnapshot = (actual: unknown) => expect(actual).toMatchSnapshot();
export const expectElementSnapshot = (element: React.ReactElement) => expectSnapshot(renderer.create(element).toJSON());
