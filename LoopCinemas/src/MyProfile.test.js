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
    getUserById.mockResolvedValue({ user_id: '1', name: 'John Doe', email: 'john@example.com' });
    const { findByText } = render(<MyProfile userId="1" />);
    const nameElement = await findByText(/Name: John Doe/); // Using regex to be more flexible
    expect(nameElement).toBeInTheDocument();
  });
  
  it('updates user details correctly', async () => {
    window.alert = jest.fn(); // Mock the alert function
    
    updateUserById.mockResolvedValue(true);
    const { getByText, getByLabelText } = render(<MyProfile userId="1" />);
    
    fireEvent.click(getByText('Edit'));
    fireEvent.change(getByLabelText('Name:'), { target: { value: 'Jane Doe' } });
    fireEvent.click(getByText('Save'));
    
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Your profile was updated successfully.'));
  });
  
  
});
