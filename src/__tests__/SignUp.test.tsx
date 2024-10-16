import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignUp from '../pages/SignUp';
import '@testing-library/jest-dom';

jest.mock('../context/AuthContext');

describe('SignUp Component', () => {
  const mockSignup = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      signup: mockSignup,
    });
  });

  test('renders Sign Up form', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test('displays error message for failed sign up', async () => {
    mockSignup.mockResolvedValue(false);

    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    const buttons = screen.getAllByText(/Sign Up/i);
  
    fireEvent.click(buttons[1]);

    expect(await screen.findByText('Registration failed. Please try again.')).toBeInTheDocument();
  });

  test('navigates to sign in on successful sign up', async () => {
    mockSignup.mockResolvedValue(true);

    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    const buttons = screen.getAllByText(/Sign Up/i);
  
    fireEvent.click(buttons[1]);

    expect(mockSignup).toHaveBeenCalledWith('test@test.com', 'password');
  });
});
