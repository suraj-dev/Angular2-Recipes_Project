import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {Ingredient} from "../ingredient";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.css']
})
export class ShoppingListAddComponent implements OnChanges {
  isAdd = true;
  @Input() item: Ingredient;
  @Output() cleared = new EventEmitter();

  constructor(private sls: ShoppingListService) { }

  ngOnChanges(changes) {
    if(changes.item.currentValue === null) {
      this.isAdd = true;
      this.item = {name: null, amount: null};
    } else {
      this.isAdd = false;
    }
  }

  onSubmit(ingredient: Ingredient) {
    if(!this.isAdd) {
      this.sls.editItem(this.item, new Ingredient(ingredient.name, ingredient.amount));
      this.onClear();
    } else {
      this.item = new Ingredient(ingredient.name, ingredient.amount);
      this.sls.addItem(this.item);
    }
  }

  onDelete() {
    this.sls.deleteItem(this.item);
  }

  onClear() {
    this.isAdd = true;
    this.cleared.emit(null);
  }

}
