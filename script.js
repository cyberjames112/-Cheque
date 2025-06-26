// 建案對應的銀行戶名
const projectData = {
  "Quill": "Andarama SDN BHD",
  "Pavilion Square": "Armani Hartajaya SDN BHD",
  "Bon Kiara": "Land Marker Sdn Bhd",
  "Skylon": "GBD DEVELOPMENT SDN BHD",
  "Conlay": "PATSAWAN PROPERTIES SDN BHD",
  "裝修公司": "XINHAUS ENTERPRISE",
  "Skyline Embassy": "SKYLINE EMBASSY SDN BHD",
  "Oxley KLCC": "Oxley Rising Sdn Bhd",
  "二家代辦": "SHL INTERNATIONAL(MM2H) SDN.BHD"
};

// 數字轉英文大寫金額
function numberToWords(num) {
  if (num < 0) return "Negative numbers are not supported.";
  if (num === 0) return "Zero Only";

  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const thousands = ["", "Thousand", "Million"];

  function convertChunk(num) {
    let str = "";

    if (num >= 100) {
      str += units[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }

    if (num >= 11 && num <= 19) {
      str += teens[num - 10] + " ";
    } else {
      const tensPlace = Math.floor(num / 10);
      const unitsPlace = num % 10;
      if (tensPlace > 0) str += tens[tensPlace] + " ";
      if (unitsPlace > 0) str += units[unitsPlace] + " ";
    }

    return str.trim();
  }

  function convertIntegerPart(num) {
    let str = "", chunkIndex = 0;
    while (num > 0) {
      const chunk = num % 1000;
      if (chunk > 0) {
        const chunkWords = convertChunk(chunk);
        str = chunkWords + " " + thousands[chunkIndex] + " " + str;
      }
      num = Math.floor(num / 1000);
      chunkIndex++;
    }
    return str.trim();
  }

  function convertDecimalPart(num) {
    const decimalWords = convertChunk(num);
    return decimalWords + " Cents";
  }

  const integerPart = Math.floor(num);
  const decimalPart = Math.round((num - integerPart) * 100);

  let result = "";

  if (integerPart > 0) {
    result += convertIntegerPart(integerPart);
  }

  if (decimalPart > 0) {
    result += " And " + convertDecimalPart(decimalPart);
  }

  return result.trim() + " Only";
}

// 取得HTML元素
const projectSelect = document.getElementById('project');
const developerAccountInput = document.getElementById('developerAccount');
const amountInput = document.getElementById('amount');
const amountWordsInput = document.getElementById('amountWords');
const cashDateInput = document.getElementById('cashDate');
const formattedDateInput = document.getElementById('formattedDate');
const checkAccountName = document.getElementById('checkAccountName');
const checkAmountWords = document.getElementById('checkAmountWords');
const checkDate = document.getElementById('checkDate');
const checkAmountNumber = document.getElementById('checkAmountNumber');

// 建案選擇更新銀行戶名與支票模擬欄
projectSelect.addEventListener('change', () => {
  const selectedValue = projectSelect.value;
  const developerName = projectData[selectedValue] || '';
  developerAccountInput.value = developerName;
  checkAccountName.textContent = developerName;
});

// 金額輸入後轉換成英文大寫與支票顯示
amountInput.addEventListener('input', () => {
  const amount = Number(amountInput.value);
  if (isNaN(amount) || amount < 0) {
    amountWordsInput.value = '';
    checkAmountWords.textContent = '';
    checkAmountNumber.textContent = '';
  } else {
    const words = numberToWords(amount);
    amountWordsInput.value = words;
    checkAmountWords.textContent = words;
    checkAmountNumber.textContent = amount.toFixed(2);
  }
});

// 日期輸入後格式化並顯示
cashDateInput.addEventListener('change', () => {
  const dateValue = cashDateInput.value;
  if (dateValue) {
    const [year, month, day] = dateValue.split('-');
    const shortYear = year.slice(2);
    formattedDateInput.value = `${day}${month}${shortYear}`;
    checkDate.textContent = `${day}/${month}/${shortYear}`;
  } else {
    formattedDateInput.value = '';
    checkDate.textContent = '';
  }
});
