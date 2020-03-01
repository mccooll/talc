class BalanceType {
  constructor(obj) {
    obj && Object.assign(this, obj);
  }
  shortName: string;
  name: string;
}

class Category {
  constructor(obj?) {
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
  number: string;
  category: Category;
  static categories: Category[] = [ 
    new Category({name:"Assets", balanceType: Account.balanceTypes.dr}),
    new Category({name:"Liability", balanceType: Account.balanceTypes.cr}),
    new Category({name:"Equity", balanceType: Account.balanceTypes.cr}),
    new Category({name:"Revenue", balanceType: Account.balanceTypes.cr}),
    new Category({name:"Expense", balanceType: Account.balanceTypes.dr})
  ];

  isValid(): Boolean {
    if(!this.number || !RegExp(/^\d+$/).test(this.number)) {
      return false;
    }
    if(!this.name) {
      return false;
    }
    if(!this.category) {
      return false;
    }
    if(!this.balanceType) {
      return false;
    }
    return true;
  }
  
  getCommittable(): Object {
    let saveable: Object = {
      _id: this.number.toString(),
      _rev: this._rev,
      number: this.number,
      name: this.name,
      category: this.category.name,
      balanceType: this.balanceType.shortName
    };
    return saveable;
  };
}
