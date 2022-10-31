/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-31 18:06:49
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-31 18:06:49
 * @FilePath     : /interview/react/hooks/src/App.test.tsx
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
