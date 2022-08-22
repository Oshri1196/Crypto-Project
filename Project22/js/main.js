
$(function () {
    
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/",
        beforeSend: function () {
            $("#loadingProgressBar").show();
          },
          complete: function () {
            $("#loadingProgressBar").hide();
          },
        success: coins => informationFromWeb(coins),
        error: err => alert("error" + err)

        

    })



function informationFromWeb(coins) {

   

    for (let i = 0; i < 50; i++) {

        let card =
            `
            <div class="card" style="width:14rem;>
            <div class="card-body">

            <div class="custom-control custom-switch">
            <label class="switch">
            <input type="checkbox">
            <span class="slider round"
            is_clicked = 'false'
            id="${i}"></span>
            </label>
            
            
            </div>


            <h5 class="card-title">${coins[i].symbol}</h5>
            <p class="card-text">${coins[i].id}</p>
            
            <p>
            <a id="moreInfoBtn" class="btn btn-primary" data-toggle="collapse" href="#collapseExample${i}" >
            More Info
            </a>
            
            </p>
            <div class="collapse" id="collapseExample${i}">
            <div class="card card-body">
            <div id = "imageCards">
            <img id="coinsIMG" src= "${coins[i].image.small}">
            </div>
            <div>Currency Prices:<br>
        USD: $${coins[i].market_data.current_price.usd}<br>
        EUR: €${coins[i].market_data.current_price.eur}<br>
        ILS: ₪${coins[i].market_data.current_price.ils}
        </div>
            
          
            
            `


       
        $(".container").append(card);

        
    }


}

//The effectiveness of the home button

$("#btnHome").click(function () {
    $(".container").show();
    $("form").show();
    $(".about").css("display", "none");
    location.reload(true);


}
)




//The effectiveness of the about button

$("#btnabout").click(function () {
    $(".container").hide()
    $(".about").show()
    $("#serachForm").hide()
    $(".about").css("background-color", "beige");

}




)




$("#submitButton").on("click", function (e) {
        e.preventDefault();
        const inputData = $("#cName").val()

        

            $.ajax({
                
                url: `https://api.coingecko.com/api/v3/search?query=${inputData}`,
                beforeSend: function () {
                    $("#loadingProgressBar").show();
                },
                complete: function () {
                    $("#loadingProgressBar").hide();
                },
                success: function (response) {
                    if(response.coins.length== 0){
                        alert("No coin found");
                        return;
                    }
                    
                $.ajax({
                    url: `https://api.coingecko.com/api/v3/coins/${response.coins[0].id}`,
                        success: (response) => {
            $("#card").empty();
            $("#card").append(`<div class="card" style="width: 18rem;  border: 1px solid black ;display: block;
            margin-left: auto;
            margin-right: auto">
            <div class="card-body">
            
                  <h5 class="card-title">${response.symbol}</h5>
                  <p class="card-text">${response.id}</p>
                  
                  
                  <button class="btn btn-dark btnInfo"  type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"style="background-color:gold ; border: 1px solid black;; color: "white" >More Info</button>
                  <div class="collapse" id="collapseExample">
                  <div class="card card-body coinInfo">
                  <p><img src="${response.image.small}" alt="coinImg"></p>
                  <div>Currency Prices:<br>
                   <p class="card-text">  USD: ${response.market_data.current_price.usd} $</p>
                   <p class="card-text"> EUR: ${response.market_data.current_price.eur} €</p>
                    <p class="card-text"> ILS: ${response.market_data.current_price.ils} ₪</p>
                   </div>
                  </div>
                </div>
              </div>  
                  
              `

              )
              
            }
        })
        
    },
   
})

})

})