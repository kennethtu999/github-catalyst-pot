class MenuItem {
  label:string
  value:string
  parent:string
  group:string

  constructor(label:string, value:string, group:string) {
    this.label = label
    this.value = value
    this.group = group
  }
}

class MenuModel {
  name: string
  items : MenuItem[]

  constructor(name:string) {
    this.name = name
    this.items = []
  }

  addItem(label:string, value:string, group:string) {
    this.items.push(new MenuItem(label, value, group))
  }
}

export { MenuModel, MenuItem}