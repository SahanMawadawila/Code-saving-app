"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error(error: ErrorProps) {
  return (
    <div>
      <pre>{error.error.message}</pre>
      <button onClick={() => error.reset()}>Try again</button>
    </div>
  );
}
