import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import Contact from './Contact';
import { IContact } from '@/models/IContact';

const mockContact: IContact = {
  id: "1",
  name: "Ryan",
  birthday: "01/01/2023",
  phone: "07123456789",
  email: "ryan@test.com",
  avatar: "",
  createdAt: "2023-01-01"
}

test('Contact has details', async () => {
  render(<Contact contact={mockContact} onUpdateContact={jest.fn()} />);

  expect(screen.getByTestId('name-input').querySelector('input')).toHaveDisplayValue(mockContact.name);
  expect(screen.getByTestId('phone-input').querySelector('input')).toHaveDisplayValue(mockContact.phone);
  expect(screen.getByTestId('email-input').querySelector('input')).toHaveDisplayValue(mockContact.email);
  expect(screen.getByTestId('birthday-input').querySelector('input')).toHaveDisplayValue(mockContact.birthday);
});

test('Contact name is editable', async () => {
  const expectedName = 'NewName';

  render(<Contact contact={mockContact} isEditing={true} onUpdateContact={jest.fn()} />);

  const input = screen.getByTestId('name-input').querySelector('input') as HTMLInputElement;

  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: expectedName } })

  expect(input.value).toBe(expectedName);
});