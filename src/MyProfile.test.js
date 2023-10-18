import { render, fireEvent, waitFor } from '@testing-library/react';
import MyProfile from './MyProfile';
import { getUserById, updateUserById, deleteUserById, getAllBookings } from './repository2';

// Mocking the necessary functions from repository2.js
jest.mock('./repository2', () => ({
  getUserById: jest.fn(),
  updateUserById: jest.fn(),
  deleteUserById: jest.fn(),
  getAllBookings: jest.fn()
}));

describe('MyProfile Component', () => {
  it('renders without crashing', () => {
    render(<MyProfile userId="1" />);
  });

  it('fetches and displays user details correctly', async () => {
    getUserById.mockResolvedValue({ name: 'John Doe', email: 'john@example.com' });
    const { getByText } = render(<MyProfile userId="1" />);
    await waitFor(() => expect(getUserById).toHaveBeenCalledWith("1"));
    expect(getByText('Name: John Doe')).toBeInTheDocument();
    expect(getByText('Email: john@example.com')).toBeInTheDocument();
  });

  it('updates user details correctly', async () => {
    getUserById.mockResolvedValue({ userId: '1', name: 'John Doe', email: 'john@example.com' });
    const { getByText, getByLabelText } = render(<MyProfile userId="1" />);
    fireEvent.click(getByText('Edit'));
    fireEvent.change(getByLabelText('Name:'), { target: { value: 'Jane Doe' } });
    fireEvent.click(getByText('Save'));
    await waitFor(() => expect(updateUserById).toHaveBeenCalledWith("1", 
    expect.objectContaining({ userId: '1', name: 'Jane Doe' })
  ));
  });

  // ... (You can add more tests like deleting an account, etc.)
});
