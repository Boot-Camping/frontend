export const phoneNumber = (event) => {
  const input = event.target;
  let rawValue = input.value.replace(/-/g, "");
  let formattedValue = "";

  if (rawValue.length > 0) {
    formattedValue += rawValue.substring(0, 3);
  }
  if (rawValue.length >= 4) {
    formattedValue += "-" + rawValue.substring(3, 7);
  }
  if (rawValue.length >= 8) {
    formattedValue += "-" + rawValue.substring(7, 11);
  }

  input.value = formattedValue;

  const cursorPos = formattedValue.length;
  input.setSelectionRange(cursorPos, cursorPos);
};
