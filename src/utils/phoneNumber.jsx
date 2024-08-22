export const phoneNumber = (event) => {
  const input = event.target;
  let rawValue = input.value.replace(/[^0-9]/g, "");
  let formattedValue = "";

  if (rawValue.length >= 3) {
    formattedValue += rawValue.substring(0, 3) + "-";
  } else {
    formattedValue += rawValue;
  }

  if (rawValue.length > 3) {
    formattedValue += rawValue.substring(3, 7);
  }

  if (rawValue.length >= 7) {
    formattedValue += "-";
    formattedValue += rawValue.substring(7, 11);
  }

  if (formattedValue.length > 13) {
    formattedValue = formattedValue.substring(0, 13);
  }

  input.value = formattedValue;
};
