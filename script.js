const sectionCenter = document.querySelector('.section-center')
const btnContainer = document.querySelector('.btn-container')



function menuThings() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'menu.json', true);



  xhr.onload = function() {

    if(this.status == 200) {
     
      var menu = JSON.parse(this.responseText);

      displayMenuItems(menu)


      const categories = menu.reduce(function(values, item) {
        if(!values.includes(item.category)) {
            values.push(item.category) 
        }
        return values
    },['all']
    )


      const categoryBtns = categories.map(function (category) {
        return `<button class="filter-btn" data-id="${category}">${category}</button>`
    }).join('')
      btnContainer.innerHTML = categoryBtns
      
      
      
      const filterBtns = document.querySelectorAll('.filter-btn')

      filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
         
          const category = e.currentTarget.dataset.id;
          const menuCategory = menu.filter(function (menuItem) {
            
            if (menuItem.category === category) {
              return menuItem;
            }  
          });
          if (category === "all") {
            displayMenuItems(menu);
          } else {
            displayMenuItems(menuCategory);
          }
        });
      });

  /*  var output = ''

          for(let i = 0; i < menu.length; i++) {
            output += 
            `<article class="menu-item">
        <img class="photo" src="${menu[i].img}" alt="${menu[i].title}">
        <div class="item-info">
            <header>
                <h4>${menu[i].title}</h4>
                <h4 class="price">${menu[i].price}</h4>
            </header>
            <p class="item-text">${menu[i].desc}</p>
        </div>
    </article>`
          }
sectionCenter.innerHTML = output;
//console.log(output)
*/

    }
  }
  xhr.send()
}



function displayMenuItems(menuItem) {
  output = ''

  for(let i = 0; i < menuItem.length; i++) {
    output += 
    `<article class="menu-item">
<img class="photo" src="${menuItem[i].img}" alt="${menuItem[i].title}">
<div class="item-info">
    <header>
        <h4>${menuItem[i].title}</h4>
        <h4 class="price">${menuItem[i].price}</h4>
    </header>
    <p class="item-text">${menuItem[i].desc}</p>
</div>
</article>`

  }
  sectionCenter.innerHTML = output;
}




menuThings()