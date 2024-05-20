export const getUID = () => {
  return Date.now().toString(36);

  // toString() arg goyulsa 2-lik sistema yada 10-lyk sistema yada 16-lyk sistema yaly sana owurer.
  // 2 den 36 cenli san goyyup bolar sebabi bu sistema 2-lik den baslaya 36-lyk da gutaryar.
  // 12345.toString(2) ==> "11000000111001" <---(2-lik sistema), 12345.toString(3) ==> "121221020" <---(3-lik sistema)
};
