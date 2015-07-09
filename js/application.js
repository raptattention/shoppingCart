$(document).ready(function(){
	var totalShopping = function(price, quantity){
		return price*quantity;
	};

	var calTotalPrice=function(){
		var totalPrice=0;
		for(var i=0;i<$("#itemList .itemPrice").length;i++){
			var subTotalPrice=$("#itemList .subtotalPrice")[i];
			subTotalPrice=$(subTotalPrice).text();
			subTotalPrice=subTotalPrice.replace("$"," ");
			subTotalPrice=Number(subTotalPrice);
			totalPrice=totalPrice + subTotalPrice;
		}
		$("#total").text("$"+totalPrice)
	};

	$(document).on("blur", ".quantity", function(){
		var indPrice=$(this).parent().parent().children(".itemPrice").text().replace("$","");
		var indQuantity=$(this).val();
		var total=totalShopping(indPrice,indQuantity);
		if (isNaN(total)){
			total=0;
			window.alert("Please type in a valid number!");
		}
		$(this).parent().parent().children(".subtotalPrice").text("$"+total);
		calTotalPrice();
	});

	$(document).on("click", ".btn-danger",function(){
		$(this).parent().parent().fadeOut('slow'), function(){
			$(this).remove();
		};
		calTotalPrice();
	});
			
	var addNewitem=function(newItemName,newItemPrice){
		newItemPrice=parseFloat(newItemPrice).toFixed(2);
		$('<div class="itemRow col-xs-12">\
			<div class="itemName col-xs-3">'+newItemName+'</div>\
		<div class="itemPrice col-xs-3">$'+newItemPrice+'</div>\
		<div class="itemQuantity col-xs-3">\
			<label class="col-xs-6">QUANTITY</label>\
			<input class="col-xs-6 quantity" placeholder="0">\
		</div>\
		<div class="subtotalPrice col-xs-2">$0</div>\
		<div class="cancelButton col-xs-1">\
			<button type="button" class="btn btn-danger">Remove</button>\
		</div>\
		</div>').appendTo('#itemList').hide().fadeIn(1000);
	};
			
	$(".addButton button").click(function(){
		var itemName=$(".newName").val();
		var itemPrice=$(".newPrice").val();
		if($.isNumeric(itemPrice)===true){
			addNewitem(itemName,itemPrice);
			$(".newItemName").val("");
			$(".newItemPrice").val("");
		}
		else{window.alert("This is not a valid number")}
	})
});