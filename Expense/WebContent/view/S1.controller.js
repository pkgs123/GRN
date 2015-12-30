jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");
sap.ui.core.mvc.Controller.extend("Expense.view.S1", {
	onInit:function(){
		oModel = this.getOwnerComponent().getModel();
	        sap.ui.getCore().setModel(oModel);
	},
onElectricity:function(){
	
	this.getRouter().navTo("electricity",{});
},
onWater:function(){
	
	this.getRouter().navTo("telephone",{});
	
},

getRouter : function () 
{
	return sap.ui.core.UIComponent.getRouterFor(this);
},

onRent:function(){
	
	this.getRouter().navTo("rent",{});
	
},
onSundry:function(){
	
	this.getRouter().navTo("sundry",{});
},
onEmployee:function(){
	
	this.getRouter().navTo("employee",{});
},
onLocal:function(){
	
	this.getRouter().navTo("local",{});
},
onBack:function(){
	
        var navigationService = sap.ushell.Container.getService("CrossApplicationNavigation");
        navigationService.toExternal({
        target : { semanticObject : "", action: "" },
          });
        
}












});