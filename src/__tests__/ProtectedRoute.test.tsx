import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../context/AuthContext');

describe('ProtectedRoute Component', () => {
  const MockChildComponent = () => <div>Protected Content</div>;

  test('redirects to /signin if no user is authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
    });

    const { container } = render(
      <BrowserRouter>
        <ProtectedRoute>
          <MockChildComponent />
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(container.innerHTML).toMatch('');
  });

  test('renders protected content if user is authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: 'test@test.com' },
    });

    const { getByText } = render(
      <BrowserRouter>
        <ProtectedRoute>
          <MockChildComponent />
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(getByText('Protected Content')).toBeInTheDocument();
  });
});
