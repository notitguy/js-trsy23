const button = document.querySelector('button');
const list = document.querySelector('ul');
const listItems = document.querySelectorAll('li');

function clearBtn() {
  
  const defaultListItem = document.createElement('li');
  defaultListItem.textContent = 'Empty list';

  listItems.forEach(item => {
    item.remove();
    list.insertAdjacentElement('afterbegin', defaultListItem);
  });
}

button.addEventListener('click', clearBtn);