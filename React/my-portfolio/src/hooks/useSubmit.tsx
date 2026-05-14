import {useState} from "react";

// FIX 1: Type 'ms' as a number
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// FIX 2: Define a type for the response object
interface SubmitResponse {
  type: 'success' | 'error';
  message: string;
}

export interface ContactFormData {
  firstName: string;
  email: string;
  type: 'hireMe' | 'openSource' | 'other';
  comment: string;
}

/**
 * This is a custom hook that can be used to submit a form and simulate an API call
 * It uses Math.random() to simulate a random success or failure, with 50% chance of each
 */
const useSubmit = () => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState<SubmitResponse | null>(null);

  const submit = async (url: string, data: ContactFormData) => {
    const random = Math.random();
    setLoading(true);
try {
      await wait(2000);
      if (random < 0.5) {
        throw new Error("Something went wrong");
      }
      setResponse({
        type: 'success',
        message: `Thanks for your submission ${data.firstName}, we will get back to you shortly!`,
      });
    } catch  {
      // FIX 5: Renamed variable to 'e' or use the underscore (_error) 
      // if you don't intend to use the error details.
      setResponse({
        type: 'error',
        message: 'Something went wrong, please try again later!',
      });
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, response, submit };
}

export default useSubmit;
