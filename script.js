function removeItem(itemNumber) {
  const ul = document.querySelector("ul");
  const li = document.querySelector(`li:nth-child(${itemNumber})`);

  if (itemNumber > ul.children.length || itemNumber <= 0) {
    console.log("Item doesn't exist");
  } else {
    ul.removeChild(li);
  }
}

removeItem(2);

// Events
