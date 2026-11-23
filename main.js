
let nameOfproduct = document.getElementById('nameOfproduct');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let total = document.getElementById('total');
let submit = document.getElementById('submit');
let totalProducts = document.getElementById('totalProducts');
let totalCategories = document.getElementById('totalCategories');
let inventoryValue = document.getElementById('inventoryValue');
let totalStock = document.getElementById('totalStock');





let mood = 'create' ;
let index ;


                            /***********************************************/
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
        total.innerHTML = result;
        total.style.background = '#628968';
    }
    else{
        total.innerHTML ='';
        total.style.background = '#f32a18';
    }


}


                            /***********************************************/
let proData;
if(localStorage.product != null){
    proData = JSON.parse(localStorage.product);  
}
else{
    proData = [];
}


                            /***********************************************/
submit.onclick = function(){
    let newPro = {
        nameOfproduct: nameOfproduct.value.toLowerCase() ,
        price: price.value ,
        taxes: taxes.value ,
        ads: ads.value ,
        discount: discount.value ,
        count: count.value ,
        total: total.innerHTML ,
        category: category.value.toLowerCase(),
    }

    if(nameOfproduct.value != '' && category.value != '' 
        && price.value != '' && newPro.count < 100)
        {
    if(mood == 'create'){
     proData.push(newPro);}
    else {
        proData[index] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }

    clearData();
    }

    localStorage.setItem('product' , JSON.stringify(proData) );  
    readData();
    
    function clearData(){
        nameOfproduct.value='';
        price.value='';
        taxes.value='';
        ads.value='';
        discount.value='';
        count.value='';
        category.value='';
        getTotal(); 
    }

    

}


                            /***********************************************/
function readData(){    
    getTotal();
    let table = '';
    for(let i = 0; i<proData.length; i++ ){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${proData[i].nameOfproduct}</td>
            <td>${proData[i].price}</td>
            <td>${proData[i].taxes}</td>
            <td>${proData[i].ads}</td>
            <td>${proData[i].discount}</td>
            <td>${proData[i].count}</td>
            <td>${proData[i].category}</td>
            <td>${proData[i].total}</td>
            <td>
                <div class="Actions">
                    <button onclick="updateData(${i})" id="edit"> UPDATE </button>
                    <button onclick="deleteData(${i})" id="delete"> DELETE </button>
                </div> 
            </td>
        </tr> `;
    }

    document.getElementById('tbody').innerHTML = table ;
        
    let deleteBtn = document.getElementById('deleteAll');
    if(proData.length > 0){
        deleteBtn.innerHTML=` <button onclick='deleteAll()' > Delete All </button> `
    }
    else{
            deleteBtn.innerHTML='';
    }
    updateDashboard();
}

readData();


                            /***********************************************/
function deleteData(i){
    let confirmDelete = confirm('Are you sure you want to delete this product?');
    if(confirmDelete){
    proData.splice(i,1);
    localStorage.product = JSON.stringify(proData);
    readData();  }
    }



                            /***********************************************/
function deleteAll(){
    let confirmDelete = confirm('Are you sure you want to delete this product?');
    if(confirmDelete){
        localStorage.removeItem('product');
        proData.splice(0);
        readData();  }
    }


                            /***********************************************/
function updateData(i){
    nameOfproduct.value = proData[i].nameOfproduct;
    price.value = proData[i].price;
    taxes.value = proData[i].taxes;
    ads.value = proData[i].ads;
    discount.value = proData[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = proData[i].category;

    submit.innerHTML=' UPDATE '
    mood = 'update';
    index = i;

    scroll ({
        top:460 , 
        behavior:'smooth'
    })
}


                            /***********************************************/
let searchMood = 'searchTitle';
function getSearchMood(id){

    let search = document.getElementById('search');
    if( id == 'searchTitle'){
        searchMood = 'searchTitle';
        search.placeholder = 'Search for a product by Name...';
    }
    else{
        searchMood = 'searchCategory';
        search.placeholder = 'Search for a product by Category...';
    }
    search.focus();
    search.value = '';
    readData();
}

function search(value){
    let table ='' ;
    for(let i =0; i < proData.length ; i++){
    if(searchMood == 'searchTitle'){
        if(proData[i].nameOfproduct.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${proData[i].nameOfproduct}</td>
                    <td>${proData[i].price}</td>
                    <td>${proData[i].taxes}</td>
                    <td>${proData[i].ads}</td>
                    <td>${proData[i].discount}</td>
                    <td>${proData[i].count}</td>
                    <td>${proData[i].category}</td>
                    <td>${proData[i].total}</td>
                    <td>
                    <div class="Actions">
                        <button onclick="updateData(${i})" id="edit"> UPDATE </button>
                        <button onclick="deleteData(${i})" id="delete"> DELETE </button>
                    </div> 
                    </td>
                </tr> `;
        }  
    }
    else{
        if(proData[i].category.includes(value.toLowerCase())){
            table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${proData[i].nameOfproduct}</td>
                    <td>${proData[i].price}</td>
                    <td>${proData[i].taxes}</td>
                    <td>${proData[i].ads}</td>
                    <td>${proData[i].discount}</td>
                    <td>${proData[i].count}</td>
                    <td>${proData[i].category}</td>
                    <td>${proData[i].total}</td>
                    <td>
                    <div class="Actions">
                        <button onclick="updateData(${i})" id="edit"> UPDATE </button>
                        <button onclick="deleteData(${i})" id="delete"> DELETE </button>
                    </div> 
                    </td>
                </tr> `;
            }
        }
    
    }
    if(table == ''){
    table = `
        <tr>
            <td colspan="10" style="text-align:center;">
                No Products Found!
            </td>
        </tr> `;
    }
    document.getElementById('tbody').innerHTML = table ;
} 



                            /***********************************************/

function updateDashboard(){
    
    totalProducts.innerHTML = proData.length;
    let categories = [];

    for(let i = 0; i < proData.length; i++){
        if(!categories.includes(proData[i].category)){
            categories.push(proData[i].category);
        }
    }

    totalCategories.innerHTML = categories.length;


    let stock = 0;

    for(let i = 0; i < proData.length; i++){
        stock += Number(proData[i].count);
    }

    totalStock.innerHTML = stock;


    let value = 0;

    for(let i = 0; i < proData.length; i++){
        value += Number(proData[i].total) * Number(proData[i].count);
    }

    inventoryValue.innerHTML = '$' + value.toLocaleString();

}



    




