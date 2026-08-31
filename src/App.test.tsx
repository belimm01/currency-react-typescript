import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

vi.mock('./api/currencyApi', () => ({
  getRates: vi.fn().mockResolvedValue({ data: '' }),
}));

describe('App', () => {
  it('renders the exchange-rate heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /czk live exchange rates/i }),
    ).toBeInTheDocument();
  });
});
