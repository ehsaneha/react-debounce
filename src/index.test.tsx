import React, { useState } from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { useDebounce } from "./index";

jest.useFakeTimers();

function TestComponent({ delay = 500 }: { delay?: number }) {
  const [value, setValue] = useState("");
  const debouncedSet = useDebounce((newVal: string) => {
    setValue(newVal);
  }, delay);

  return (
    <div>
      <input
        data-testid="input"
        onChange={(e) => debouncedSet(e.target.value)}
        placeholder="Type here"
      />
      <div data-testid="output">{value}</div>
    </div>
  );
}

describe("useDebounce", () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it("does not call function immediately", () => {
    render(<TestComponent />);
    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "a" } });
    expect(screen.getByTestId("output").textContent).toBe("");
  });

  it("calls function after delay", () => {
    render(<TestComponent />);
    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "hello" } });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId("output").textContent).toBe("hello");
  });

  it("resets timer on rapid input changes", () => {
    render(<TestComponent />);
    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "a" } });
    act(() => jest.advanceTimersByTime(300));
    fireEvent.change(input, { target: { value: "ab" } });
    act(() => jest.advanceTimersByTime(300));
    fireEvent.change(input, { target: { value: "abc" } });

    // Not enough time has passed
    act(() => jest.advanceTimersByTime(400));
    expect(screen.getByTestId("output").textContent).toBe("");

    // Now enough time has passed
    act(() => jest.advanceTimersByTime(100));
    expect(screen.getByTestId("output").textContent).toBe("abc");
  });

  it("cleans up timer on unmount", () => {
    const { unmount } = render(<TestComponent />);
    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "abc" } });
    unmount();

    act(() => {
      jest.runAllTimers();
    });

    // Should not throw or update state after unmount
    // Can't assert output change, but ensures no error
  });
});
