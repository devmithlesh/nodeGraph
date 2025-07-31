export const allowedChildMap = {
  account: ['loan', 'collateral'],
  loan: ['collateral'],
  collateral: [],
};

export const isRootType = (type) => ['account', 'loan'].includes(type);
export const getAllowedChildren = (type) => allowedChildMap[type] || [];
