import { renderHook, act } from '@testing-library/react';
import useDebounce from '@/hooks/useDebounce';

describe('useDebounce', () => {
  it('should debounce a value with the provided delay', () => {
    jest.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initialInput', delay: 300 },
      }
    );

    expect(result.current).toBe('initialInput');

    rerender({ value: 'newInput', delay: 300 });
    expect(result.current).toBe('initialInput');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('newInput');

    jest.useRealTimers();
  });

  it('should use the 500ms default delay if not specified otherwise', () => {
    jest.useFakeTimers();

    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'initialInput' },
    });

    expect(result.current).toBe('initialInput');

    rerender({ value: 'newInput' });
    expect(result.current).toBe('initialInput');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('newInput');

    jest.useRealTimers();
  });

  it('should not modify the value if the provided or default time is not up yet', () => {
    jest.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'firstInput', delay: 500 },
      }
    );

    expect(result.current).toBe('firstInput');

    rerender({ value: 'newInput', delay: 500 });
    expect(result.current).toBe('firstInput');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('firstInput');

    jest.useRealTimers();
  });
});
