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
  if (password && !regex.test(password)) {
    setError(true);
    if (setIsOpened) {
      setIsOpened(true);
    }
    if (setErrorType) {
      setErrorType("pw");
    }
    return false;
  }

  if (password && passwordChk && password !== passwordChk) {
    setError(true);
    if (setIsOpened) {
      setIsOpened(true);
    }
    if (setErrorType) {
      setErrorType("pwChk");
    }
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    setError(true);
    if (setIsOpened) {
      setIsOpened(true);
    }
    if (setErrorType) {
      setErrorType("email");
    }
    return false;
  }

  if (postcode !== undefined && postcode === "") {
    setError(true);
    if (setIsOpened) {
      setIsOpened(true);
    }
    if (setErrorType) {
      setErrorType("post");
    }
    return false;
  }

  if (checkedTerms && !checkedTerms.every(Boolean)) {
    setError(true);
    if (setIsOpened) {
      setIsOpened(true);
    }
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
