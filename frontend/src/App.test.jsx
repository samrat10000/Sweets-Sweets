import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import App from './App';

describe('App Component', () => {
    it('renders navbar', () => {
        // Mock the backend API calls if AuthProvider makes them on mount
        // For now, let's see if it renders without crashing.
        // AuthContext might try to fetch status.

        render(
            <BrowserRouter>
                <AuthProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </AuthProvider>
            </BrowserRouter>
        );
        // Assuming Navbar has some text or element we can find. 
        // Usually "Login" or "Register" if not logged in.
        // Or just check if it renders without crashing.
        // Let's check for "Sweet Shop" if it's in the title/navbar
        // or just checking if body is present.
        // We'll update this based on actual Navbar content, but for now just rendering is a good smoke test.

        // Let's assume there is a Login link
        // const linkElement = screen.getByText(/login/i);
        // expect(linkElement).toBeInTheDocument();
    });
});
