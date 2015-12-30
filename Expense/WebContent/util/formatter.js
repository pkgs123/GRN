jQuery.sap.declare("Expense.util.formatter");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
Expense.util.formatter = {
		keyText:function(ab,bc){
			return ab+"\n"+bc;
		}
};