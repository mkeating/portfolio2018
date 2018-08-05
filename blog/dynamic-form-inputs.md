---
path: /blog/dynamic-form-inputs
date: '2018-08-04'
title: Dynamic form inputs
description: >-
  A quick rundown of my solution for a front-end challenge: a form that allows
  users to create an arbitrary number of options
---
I had the thought that I might want to document some of the interview questions and exercises I've been given and the solutions I've come up with. It'll let me more easily remember and reference problems I've seen before, and maybe give me some give interesting jumping-off points to new things.

The requirement for this one was to create a form for creating a list of multiple options; for example, in a form builder like Google Forms or SurveyMonkey, you can create a checkbox queston with any number of options. Basically, a form with an arbitrary, user-defined number of inputs. 

I solved this with vanilla JS and basic DOM manipulation, but I'd like to also implement it in React in a later post. 

First, the markup; you can see the whole thing [here](https://codepen.io/mkeat/pen/qyYJBb): but it's a fairly standard form, so I'll just include the interesting part and remove the Bootstrap stuff:

```html
<div class="form-group row">
	<label for="choice" class="col-sm-2 col-form-label"> Choices </label>
    	
    <div class="col-sm-10">
        <input id="choice-input" type="text" name="label" class="form-control choice-input"> <button id="add-choice-button" class="btn btn-success"> + </button>
        	
        <div class="form-control">

	        <div id="choice-container">
	        	<div class="choice-box">
	        </div>
	    
	    </div>

    <span class="error" id="max-choices-error"></span>
    <span class="error" id="duplicate-choices-error"></span>
    </div>
</div>
```

`#choice-input` is the input box where the user enters each choice; when `#add-choice-button` is clicked, that choice is then moved into `#choice-box` and `#choice-input` is cleared, allowing for the user to enter more (and delete any created choices, which I'll get to later).

Here is the JS that handles this interaction. 

```javascript
//Add choices to the list
  const choiceContainer   = document.getElementById('choice-container');
  const choiceInput     = document.getElementById('choice-input');
  const addChoiceButton   = document.getElementById('add-choice-button');

// This function creates a new input with the text passed
const addChoice = function(text) {
    const newChoiceContainer  = document.createElement('div');
    const newChoice       = document.createElement('input');
    const deleteChoiceButton  = document.createElement('button');

    newChoice.type    = 'text';
    newChoice.value   = text;
    newChoice.className = 'form-control choice-input';
    newChoice.name    = 'choices[]';

    deleteChoiceButton.className = 'delete-choice-button';
    deleteChoiceButton.appendChild(document.createTextNode('X'));

    newChoiceContainer.className = 'choice-box';
    newChoiceContainer.appendChild(newChoice);
    newChoiceContainer.appendChild(deleteChoiceButton);

    choiceContainer.appendChild(newChoiceContainer);

  // Update choice object for validation purposes
  if(choices[text]){
     choices[text] += 1;
  } else {
     choices[text] = 1;
  }

  // Run choice validation on every new choice
  choiceValidation();
}
```

In addition to creating the choices\[] DOM elements, I'm keeping all current choices in a choices object, which I use for validation (React would be great here; an object that describes the shape of the DOM is basically what this.state is for).

I broke out the addChoice functionality into it's own function so I can call it from two different event listeners, so users can add choices either by hitting the + button or just hitting enter:

```javascript
// Allow add choice on enter
choiceInput.addEventListener('keypress', function(event){
  const key = event.charCode || event.keyCode || 0;
  if(key == 13){
    if(choiceInput.value){
      addChoice(this.value);
      this.value = '';
    }
  }
});

// Allow add choice on button click
addChoiceButton.addEventListener('click', function(event){
  event.preventDefault();
  if(choiceInput.value){
    addChoice(choiceInput.value);
    choiceInput.value = '';
  }
});
```

This will create an element that looks like this:

```html
<div class="choice-box">
    <input type="text" name="choices[]" class="form-control choice-input">
    <button class="delete-choice-button">X</button>
</div>
```

`name="choices[]"` is the important part; this is what allows an arbitrary number of values for choices. When the form is submitted and you receive it serverside, you can iterate over choices\[] and handle each one.

The delete function is pretty basic:

```javascript
// Delete choice button
document.addEventListener('click', function(event){
     if(event.target && event.target.className == 'delete-choice-button'){
      event.preventDefault();
      event.target.parentNode.remove();

      choices[event.target.previousSibling.value] -= 1;
      // Run choice validation on every deletion
      choiceValidation();
    } 
});
```

This listens for clicks on the whole docuement, then does some DOM-climbing to identify and remove the relevant choice (as well as update the choices state object)

There were some other requirements for the challenge, which I'll probably ignore, with the exception of validating this form(duplicate choices are not allowed, and a maximum number of choices can be set), which I'll cover in the next post as this is getting long.
