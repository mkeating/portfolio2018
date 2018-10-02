---
path: /blog/react-dynamic-form
date: '2018-10-01'
title: React dynamic form
description: Building a form with a dynamic number of inputs with React
---
Let's implement the dynamic form from the [last post](/blog/dynamic-form-inputs) in React. You can see the full CodePen [here](https://codepen.io/mkeat/full/XPNBXL/). I started with a parent Form component:

```javascript
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
          <button> Submit </button>
        </form>
    )
  }
}
```

Pretty standard. DynamicInputBox is where most of the work is being done. First, the render method:

```javascript
 render(){ 
    const items = this.state.items
    return(
        <div>
          <div>
              <input value={this.state.newItem} onChange={event => this.newItemInput(event)}/>
            
              <button type="button" onClick={this.addItem} > + </button> {/* type=button to prevent form from submitting*/}
          </div>
```

The first bit is an input field and an "add" button. This is where the user enters the name of the item, and clicking the Add button enters it into the list of total items. This is handled by the addItem method, where the new item is added to an array of items kept in state.

Here's addItem(), and it's buddy, newItemInput:

```javascript
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

I'm also passing two functions, deleteItemHandler and updateItemHandler. These are functions that handle the changing and deletion of already-created items. I'm passing them as props like this because I need the child component to be able to set the state of the parent component. Read more here: <https://react-cn.github.io/react/tips/communicate-between-components.html>

```javascript
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
This is so that 'this' is the correct context; if you don't bind it, 'this' will refer to Window. Read more here:[ https://reactjs.org/docs/handling-events.html](https://reactjs.org/docs/handling-events.html)

The final child component is the InputContainer, which holds each individual item in an input element (so you can edit it after creating it) and its 'delete' button. It mirrors the structure of the DynamicInputBox component. Since this component doesn't have any state of it's own (it's inheriting props from it's parent and using handlers to pass data back up, but we never need to use 'this.state'), I've written it as a stateless functional component

```javascript
const InputContainer = props => {
  	return(
      	<div>
            <input 
              key={props.item.key} 
              value={props.item.value} 
              onChange={event => props.updateItemHandler(event, props.item.key)} /> 
         
            <button 
              type="button"
              onClick={() => props.deleteItemHandler(props.item.key)}> X 
            </button>
        </div>
  )
}
```

updateItemHandler and deleteItemHandler are functions passed as props that trigger on events in this component, but change state in the parent component.

You now have an arbitrary number of input fields, which can be deleted or edited as necessary, and their data is kept in state and can be sent off with a fetch() call on form submission.
