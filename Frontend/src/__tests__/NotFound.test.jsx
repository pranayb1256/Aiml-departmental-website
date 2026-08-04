import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import { describe, it, expect } from 'vitest';

describe('NotFound Component', () => {
  it('renders the 404 text', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    expect(screen.getByText(/404/i)).toBeInTheDOM || expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
