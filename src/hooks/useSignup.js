import { useState } from "react";
import { post } from "../utils/api";

const useSignup = (setError) => {
	const [errorMessage, setErrorMessage] = useState("");

	const postSignup = async (formData) => {
		try {
      await post("user/signup", JSON.stringify(formData));
			setError(false);
      setErrorMessage("");
			return true;
    } catch (error) {
			setError(true);
      setErrorMessage(error.message);
			return false;
    }
	}

	return {postSignup, errorMessage}
}

export default useSignup;