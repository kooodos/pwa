import Payment from 'payment';

function clearNumber(value = '') {
  return value.replace(/\D+/g, '');
}

export function formatCreditCardNumber(value) {
  if (!value) {
    return value;
  }
  const clearValue = clearNumber(value);
  //let nextValue;

  // const issuer = Payment.fns.cardType(value);
  //
  // switch (issuer) {
  //   case 'amex':
  //     nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
  //       4,
  //       10,
  //     )} ${clearValue.slice(10, 15)}`;
  //     break;
  //   case 'dinersclub':
  //     nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
  //       4,
  //       10,
  //     )} ${clearValue.slice(10, 14)}`;
  //     break;
  //   default:
  //     nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
  //       4,
  //       8,
  //     )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
  //     break;
  // }

  let maxLength = 19;
  return clearValue.slice(0, maxLength);

}

export function formatCVC(value, prevValue, allValues = {}) {
  const clearValue = clearNumber(value);
  let maxLength = 4;

  if (allValues.number) {
    const issuer = Payment.fns.cardType(allValues.number);
    maxLength = issuer === 'amex' ? 4 : 3;
  }

  return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
  const clearValue = clearNumber(value);
  let month = ''
  let year = ''

  const current_date = new Date();
  const current_year = current_date.getFullYear();
  const current_year_two = current_year % 100;
  let current_month = current_date.getMonth()+1;
  current_month = (current_month < 10 ? '0' : '') + current_month;
  const current_yy_mm = current_year_two + '' + current_month;

  if (clearValue.length >= 4) {
    month = clearValue.slice(0, 2)
    year = clearValue.slice(2, 4)

    const expiry_yy_mm = year + '' + month

    console.log("current_yy_mm", current_yy_mm)
    console.log("expiry_yy_mm", expiry_yy_mm)

    if (Number(month) >= 1 && Number(month) <= 12 && Number(year) >= Number(current_year_two) && Number(expiry_yy_mm) >= Number(current_yy_mm)) {
      return `${month}/${year}`;
    } else {
      return ``;
    }

  }

  return clearValue;
}

export function formatFormData(data) {
  return Object.keys(data).map(d => `${d}: ${data[d]}`);
}
