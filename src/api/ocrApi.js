import Tesseract from "tesseract.js";

export const extractReceiptData = async (file) => {
  const { data: { text } } = await Tesseract.recognize(file, 'eng');
  // very basic text parsing example
  const amountMatch = text.match(/\d+(\.\d{1,2})?/);
  const dateMatch = text.match(/\d{2}[-/]\d{2}[-/]\d{4}/);
  return {
    amount: amountMatch ? amountMatch[0] : "",
    date: dateMatch ? dateMatch[0] : "",
    description: text.split("\n")[0] || "Expense from OCR",
  };
};
