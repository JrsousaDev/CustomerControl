export function sumeMoney(array) {

  const totalMoney = array?.reduce((total, obj) => total + obj.money, 0)
  .toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

  return totalMoney
}