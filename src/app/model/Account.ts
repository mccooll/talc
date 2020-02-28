class BalanceType {
  constructor(obj) {
    obj && Object.assign(this, obj);
  }
  shortName: string;
  name: string;
}

class Category {
  constructor(obj) {
    obj && Object.assign(this, obj);
  }
  name: string;
  description: string;
  balanceType: BalanceType;
  static balanceTypes = {
    dr: new BalanceType({name:"Debit", shortName:"DR"}),
    cr: new BalanceType({name:"Credit", shortName:"CR"})
  };
}

export default class Account extends Category {
  private _rev: string;
  number: number;
  category: Category;
  static categories: Category[] = [ 
    new Category({name:"Assets", balanceType: Account.balanceTypes.dr}),
    new Category({name:"Liability", balanceType: Account.balanceTypes.cr}),
    new Category({name:"Equity", balanceType: Account.balanceTypes.cr}),
    new Category({name:"Revenue", balanceType: Account.balanceTypes.cr}),
    new Category({name:"Expense", balanceType: Account.balanceTypes.dr})
  ];
  
  getCommittable(): Object {
    let saveable: Object = {
      _id: this.number,
      _rev: this._rev,
      number: this.number,
      name: this.name,
      category: this.category.name,
      balanceType: this.balanceType.shortName
    };
    return saveable;
  };
}
