---
path: react-dynamic-form
date: '2018-10-01'
title: React Dynamic Form
description: Building a form with a dynamic number of inputs with React
---
Let's implement the dynamic form from the last post in React. I started with a parent Form component:

```
class Form extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {}
  }
  
  handleSubmit(event){
    event.preventDefault()
    console.log('submitted')
  }
  
  render(){
    return ( 
        <form onSubmit={event => this.handleSubmit(event)}>
          Add items here:
          <DynamicInputBox />
          <button className="button is-primary">Submit </button>
        </form>
    )
  }
}

```

Pretty standard. DynamicInputBox is where most of the work is being done. First, the render method:

```
 render(){ 
    const items = this.state.items
    return(
        <div>
          <div className="field has-addons">
            <div className="control">
              <input className="input" value={this.state.newItem} onChange={event => this.newItemInput(event)}/>
            </div>
            <div className="control">
              <button className="button is-primary" type="button" onClick={this.addItem} > + </button> {/* type=button to prevent form from submitting*/}
            </div>
          </div>
```        
The first bit is an input field and an "add" button. This is where the user enters the name of the item, and clicking the Add button enters it into the list of total items. This is handled by the addItem method, where the new item is added to an array of items kept in state.

Here's addItem(), and it's buddy, newItemInput:
```
  addItem(){
    //add the new item to state
    if(this.state.newItem){ 
      const newId = this.makeId()
      
      this.setState({
        items: [...this.state.items, {'key': `item-${newId}`,'value': this.state.newItem}], 
        newItem: '',
        count: this.state.count + 1
      })
    }   
  }
  
  newItemInput(event){
    this.setState({newItem: event.target.value})
  }
```

newItemInput is simply listening for any change to the input field, and setting the new value into state. 

addItem is then taking the value of this.state.newItem, and adding it to this.state.items, an array of any previous items created. I'm saving each item with a key so we can access it later if we need to change or delete it. Ideally you'd use a library like uuid or something here, but in the interest of simplicity I wrote a simple helper function makeId(), which generates an 8 character long random string.


Back to the DynamicInputBox component, I render out all current items. I map over the items array, and pass each individual item to a child component called InputContainer.

I'm also passing two functions, deleteItemHandler and updateItemHandler. These are functions that handle the changing and deletion of already-created items. I'm passing them as props like this because I need the child component to be able to set the state of the parent component. https://react-cn.github.io/react/tips/communicate-between-components.html

```        
        {/* loop through the items kept in state */}
        {items.map((item) => {
          return(
            <div>
              <InputContainer 
                deleteItemHandler={this.deleteItemHandler} 
                updateItemHandler={this.updateItemHandler} 
                item={item}
                />
             </div>
            )
        })}
        </div>
    )
  }
```

A quick note about component methods: because I'm using 'this' in these handlers, I'm binding them in the constructor function like so: this.addItem = this.addItem.bind(this)
This is so that 'this' is the correct context; if you don't bind it, 'this' will refer to Window.
https://reactjs.org/docs/handling-events.html

The final child component is the InputContainer, which holds each individual item in an input element (so you can edit it after creating it) and its 'delete' button. 
