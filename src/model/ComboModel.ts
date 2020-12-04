class ComboItem {
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

class ComboModel {
  name: string
  items : ComboItem[]

  constructor(name:string) {
    this.name = name
    this.items = []
  }

  addItem(label:string, value:string, group:string) {
    this.items.push(new ComboItem(label, value, group))
  }
}

export { ComboModel, ComboItem}