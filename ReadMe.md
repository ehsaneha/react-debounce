# useDebounce Hook

A lightweight and reusable React hook for debouncing function calls. It waits until a user stops triggering an event (e.g., typing) for a specified delay before executing the provided function — perfect for optimizing input handling, search boxes, and API requests.

---

## 🚀 Installation

```bash
npm install react-debounce
```

or

```bash
yarn add react-debounce
```

---

## 🔧 Usage

```tsx
import React, { useState } from "react";
import { useDebounce } from "react-debounce";

const SearchInput = () => {
  const [query, setQuery] = useState("");

  const debouncedSearch = useDebounce((value: string) => {
    // Your API call or logic here
    console.log("Searching for:", value);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <input value={query} onChange={handleChange} placeholder="Search..." />
  );
};
```

---

## 🧠 Hook Signature

```ts
function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T;
```

### Parameters:

- `callback`: The function to call after the debounce delay.
- `delay`: Time in milliseconds to wait after the last call before triggering.

### Returns:

- A debounced version of the original function.

---

## ✅ Features

- Fully typed (TypeScript)
- Works with any function signature
- Cleans up timers automatically on component unmount
- Ideal for search fields, input validation, and real-time optimization

---

## 🧪 Testing

Tested with `@testing-library/react`, `jest`, and `jsdom`. Includes:

- Immediate vs delayed execution
- Timer reset on rapid calls
- Cleanup on unmount

---

## ✨ Author

Made with ❤️ by [ehsaneha](https://github.com/ehsaneha)

---

## License

This package is licensed under the MIT License. See LICENSE for more information.

---

Feel free to modify or contribute to this package!
