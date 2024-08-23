export const validation = ({
  password,
  passwordChk,
  email,
  postcode,
  checkedTerms,
  checkboxRefs,
  setError,
  setErrorType,
  setIsOpened,
}) => {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!regex.test(password)) {
    setError(true);
    setIsOpened(true);
    if (setErrorType) {
      setErrorType("pw");
    }
    return false;
  }

  if (password !== passwordChk) {
    setError(true);
    setIsOpened(true);
    if (setErrorType) {
      setErrorType("pwChk");
    }
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError(true);
    setIsOpened(true);
    if (setErrorType) {
      setErrorType("email");
    }
    return false;
  }

  if (postcode === "") {
    setError(true);
    setIsOpened(true);
    if (setErrorType) {
      setErrorType("post");
    }
    return false;
  }

  if (!checkedTerms.every(Boolean)) {
    setError(true);
    setIsOpened(true);
    checkboxRefs.current.forEach((ref, index) => {
      if (ref && !checkedTerms[index]) {
        ref.focus();
        return;
      }
    });
    if (setErrorType) {
      setErrorType("terms");
    }
    return false;
  }

  return true;
};
