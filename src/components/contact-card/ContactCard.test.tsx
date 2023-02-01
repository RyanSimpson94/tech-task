import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import ContactCard from './ContactCard';

test('Card has details', async () => {
  const name = "Ryan";
  const id = "1"
  render(<ContactCard id={id} name={name} avatar="" />);

  expect(screen.getByTestId(id)).toHaveTextContent(name);
});