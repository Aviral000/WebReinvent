import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignIn from '../pages/SignIn';
import '@testing-library/jest-dom';

jest.mock('../context/AuthContext');

describe('SignIn Component', () => {
  const mockSignin = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      signin: mockSignin,
    });
  });

  test('renders Sign In form', () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  test('displays error message for invalid sign in', async () => {
    mockSignin.mockResolvedValue(false);

    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });
    const buttons = screen.getAllByText(/Sign In/i);
  
    fireEvent.click(buttons[1]);

    expect(await screen.findByText('Invalid email or password')).toBeInTheDocument();
  });

  test('navigates to dashboard on successful sign in', async () => {
    mockSignin.mockResolvedValue(true);

    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    const buttons = screen.getAllByText(/Sign In/i);
  
    fireEvent.click(buttons[1]);

    expect(mockSignin).toHaveBeenCalledWith('test@test.com', 'password');
  });
});
