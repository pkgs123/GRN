jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("sap.m.MessageToast");
var oToken;
sap.ui.core.mvc.Controller.extend("Expense.view.S7", {
  companydescription:"",
  plantdescription:"",
  taxdescription:"",
  vendvalue1:"",
  vend1:"",
  oModel:"",
  ccode:"",
  cctext:"",
  recode:"",
  retext:"",
  mprest:"",
  //represt:"",
  number:"",
  onInit: function() {
    
    this.mprest="";
       this.csrfToken();
    this.oModel = this.getOwnerComponent().getModel();
    sap.ui.getCore().setModel(this.oModel);
    this.oInitialLoadFinishedDeferred = jQuery.Deferred();
    this.getRouter().attachRoutePatternMatched(this.onRouteMatched, this);},
getRouter : function ()
{
  return sap.ui.core.UIComponent.getRouterFor(this);
},


onSelectone:function(evt){
  this.mprest="";
  this.oModel = this.getOwnerComponent().getModel();
this.getView().byId("itab206").destroyContent();
  this.getView().byId("itab122").destroyContent();
  this.getView().byId("itab2").destroyContent();

if(this.fragment1===undefined){
  var fragment1= new sap.ui.xmlfragment("Expense.view.abc",this);
}
  var adf=this.getView().byId("view2").getSelectedKey();
  var kdf=adf;
  this.getView().byId("itab"+adf).addContent(fragment1);
   var oFileUpload = sap.ui.getCore().byId('fileupload2');
     oFileUpload.setUseMultipart(false);
     var mockData = {
      dataitems : [
      ] };
     var mockDataModel = new sap.ui.model.json.JSONModel(mockData);
     oFileUpload.setModel(mockDataModel);
  var dateval=new Date();

    var oDateFormat = sap.ca.ui.model.format.DateFormat.getInstance({
      pattern : "dd MMM yyyy"
    });
    var showdate=oDateFormat.format(dateval);
    sap.ui.getCore().byId("startDate").setValue(showdate);
 if(kdf=="206"){
   /* sap.ui.getCore().byId("robj").setVisible(true);
     sap.ui.getCore().byId("robject").setVisible(true);*/
 }
if(adf=="2"){
    kdf="";
}
        var oController=this;
  this.oModel.read("/PROPOSALDETAILSSet(IvContype='"+kdf+"')",null,false,false,function(oData,response){
      
      data=oData;
      this.companydescription=data.Butxt;
      this.plantdescription=data.Plantdesc;
      this.taxdescription=data.Taxcode2Ind;
      if(taxdescription==""){
         sap.ui.getCore().byId("itr2").setVisible(false);
       }
       else{
       sap.ui.getCore().byId("itr2").setVisible(true);
       }

       oController.getView().byId("hjksagdvfkuj").setTitle(this.companydescription);
         oController.getView().byId("adff").setText(this.plantdescription);
     });

     this.oModel.read("/GETVENDORJCSet(Contype='"+kdf+"',OtherInd='',ImprestInd='I')",null,false,false,function(oData,response){
      
      data=oData;
      this.vendvalue1=data.EvVendor;
       sap.ui.getCore().byId("vend2").setValue(this.vendvalue1);
       sap.ui.getCore().byId("pabl").setValue(this.vendvalue1.substring(this.vendvalue1.indexOf("-")+1,this.vendvalue1.length));
    });

     sap.ui.getCore().byId("pabl").setVisible(true);
    sap.ui.getCore().byId("pabl").setEditable(false);
    var vfvendor=sap.ui.getCore().byId("vend2").getValue();
    if(this.mprest==="" && (vfvendor==="" || vfvendor===undefined)){
      sap.m.MessageBox.show("Please maintain imprest vendor in the user table !! Proposal can not be created");
      return;
    }
},


onRouteMatched : function(oEvent)
{
  if(oEvent.mParameters.name=="local"){
    this.mprest="";
    var fragment1= new sap.ui.xmlfragment("Expense.view.abc",this);
    this.getView().byId("itab206").addContent(fragment1);
    var oFileUpload = sap.ui.getCore().byId('fileupload2');
        oFileUpload.setUseMultipart(false);
        var mockData = {
         dataitems : [
         ] };
        var mockDataModel = new sap.ui.model.json.JSONModel(mockData);
        oFileUpload.setModel(mockDataModel);
     /*sap.ui.getCore().byId("robj").setVisible(true);
       sap.ui.getCore().byId("robject").setVisible(true);*/
    var dateval=new Date();

        var oDateFormat = sap.ca.ui.model.format.DateFormat.getInstance({
          pattern : "dd MMM yyyy"
        });
        var showdate=oDateFormat.format(dateval);
        sap.ui.getCore().byId("startDate").setValue(showdate);
  this.oModel = this.getOwnerComponent().getModel();
  sap.ui.getCore().setModel(this.oModel);
     this.vend1="";
     this.companydescription="";
     this.plantdescription="";
     var data = {};
     var oController=this;
     this.oModel.read("/PROPOSALDETAILSSet(IvContype=%27206%27)",null,false,false,function(oData,response){
      
      data=oData;
      this.companydescription=data.Butxt;
      this.plantdescription=data.Plantdesc;
      this.taxdescription=data.Taxcode2Ind;
      if(taxdescription==""){
         sap.ui.getCore().byId("itr2").setVisible(false);
         }
         else{
         sap.ui.getCore().byId("itr2").setVisible(true);
         }

       oController.getView().byId("hjksagdvfkuj").setTitle(companydescription);
         oController.getView().byId("adff").setText(plantdescription);
     });

     this.oModel.read("/GETVENDORJCSet(Contype='206',OtherInd='',ImprestInd='I')",null,false,false,function(oData,response){
      
      data=oData;
      this.vendvalue1=data.EvVendor;
       sap.ui.getCore().byId("vend2").setValue(this.vendvalue1);
         sap.ui.getCore().byId("pabl").setValue(this.vendvalue1.substring(this.vendvalue1.indexOf("-")+1,this.vendvalue1.length));
    });
    sap.ui.getCore().byId("pabl").setEditable(false);
    var vfvendor=sap.ui.getCore().byId("vend2").getValue();
    if(this.mprest==="" && (vfvendor==="" || vfvendor===undefined)){
      sap.m.MessageBox.show("Please maintain imprest vendor in the user table !! Proposal can not be created");
      return;
    }
  }},
   handlechange:function(){
    var amt=sap.ui.getCore().byId("Wrbtr").getValue();
    var myInteger = /^([0-9])+(\.[0-9]?[0-9]?)?$/;
    if(!amt.match(myInteger))
      {
      sap.ui.getCore().byId("Wrbtr").setValueState("Error");
      sap.ui.getCore().byId("Wrbtr").setValue("");
       sap.m.MessageToast.show("Enter digits only Or two digits after decimal");
      }

     else{
       sap.ui.getCore().byId("Wrbtr").setValueState("None");
     }
   },

   onBack:function(){
     sap.ui.getCore().byId("Billnum").setValue("");
     sap.ui.getCore().byId("startDate").setValue("");
     sap.ui.getCore().byId("Wrbtr").setValue("");
     sap.ui.getCore().byId("vend2").setValue("");
     sap.ui.getCore().byId("Billnum").setValueState("None");
     sap.ui.getCore().byId("startDate").setValueState("None");
     sap.ui.getCore().byId("Wrbtr").setValueState("None");
     sap.ui.getCore().byId("sw1").setState(true);
     sap.ui.getCore().byId("itr2").setState(false);
     sap.ui.getCore().byId("ven").setVisible(false);
       sap.ui.getCore().byId("pabl").setVisible(false);
     this.companydescription="";
    this.plantdescription="";
    this.taxdescription="";
    this.vendvalue1="";
    this.vend1="";
    this.oModel="";
    this.ccode="";
    this.cctext="";
    this.recode="";
    this.retext="";
    this.getView().byId("itab206").destroyContent();
    this.getView().byId("itab122").destroyContent();
    this.getView().byId("itab2").destroyContent();

     var router=sap.ui.core.UIComponent.getRouterFor(this);
    router.navTo("main",{});

   },

   handleValueHelp : function() {
     var adf=this.getView().byId("view2").getSelectedKey();
    var kdf=adf;

  if(adf=="2"){
      kdf="";
    }

       this._valueHelpDialog_1 = new sap.m.SelectDialog({
         title : "Vendor",
         growingThreshold : 1000,
         items : {
           path : "/SEARCHVENDORSet?$filter=Contyp eq '"+kdf+"'",
           template : new sap.m.ObjectListItem({
               attributes:[new sap.m.ObjectAttribute({
                 text:"{Name1}"
               })]
             })
         },
         search : [ this._handleValueHelpSearch1, this ],
         confirm : [ this._handleValueHelpClose1, this ],
         cancel : [ this._handleValueHelpClose1, this ]
       });

     this._valueHelpDialog_1.setModel(this.oModel);
     this._valueHelpDialog_1.open();
   },
   _handleValueHelpSearch1 : function(evt) {
 	  
       var sValue = evt.getParameter("value").toLowerCase();
             var keys = evt.getSource().getBinding("items").aKeys;
             for(var i=0 ;i<this._valueHelpDialog_1.getItems().length;i++){
             var val = evt.getSource().getModel().getProperty("/" + keys[i]).Lifnr.toLowerCase();
             var val1 = evt.getSource().getModel().getProperty("/" + keys[i]).Name1.toLowerCase();
             if(val.indexOf(sValue)> -1 || val1.indexOf(sValue) > -1){
               this._valueHelpDialog_1.getItems()[i].setVisible(true);
             }
             else{
               this._valueHelpDialog_1.getItems()[i].setVisible(false);
             }
             }
   },
   _handleValueHelpClose1 : function(evt) {

     var oSelectedItem = evt.getParameter("selectedItem");
     if (oSelectedItem) {
       var codepath1=evt.oSource._aSelectedItems[0].oParent._aSelectedPaths[0];
         this.ccode=evt.getSource().getModel().getProperty(codepath1).Lifnr;
         var addre=evt.mParameters.selectedItems[0].mAggregations.attributes[0].mProperties.text;
         sap.ui.getCore().byId("pabl").setValue(addre);
         sap.ui.getCore().byId("vend2").setValue(this.ccode);
         this.hc1();
     }
   },

   /*handleValueHelp1 : function() {
     this._valueHelpDialog_2 = new sap.m.SelectDialog({
           title : "Rental Object",
           growingThreshold : 1000,
           items : {
             path : "/SEARCHREOBJECTSet?$filter=IvReobj eq ''",
             template : new sap.m.ObjectListItem({
               attributes: [ new sap.m.ObjectAttribute({
                 text:"{Address}"
               })]
           })
         },
           search : [ this._handleValueHelpSearch2, this ],
           confirm : [ this._handleValueHelpClose2, this ],
           cancel : [ this._handleValueHelpClose2, this ]
         });

       this._valueHelpDialog_2.setModel(this.oModel);
       this._valueHelpDialog_2.open();
     },
     _handleValueHelpSearch2 : function(evt) {
       var sValue = evt.getParameter("value").toLowerCase();
         var token=false;
               var keys = evt.getSource().getBinding("items").aKeys;
               for(var i=0 ;i<this._valueHelpDialog_2.getItems().length;i++){
               var val = evt.getSource().getModel().getProperty("/" + keys[i]).Smenr.toLowerCase();
               var val1 = evt.getSource().getModel().getProperty("/" + keys[i]).Xmetxt.toLowerCase();
               var val2 = evt.getSource().getModel().getProperty("/" + keys[i]).Address.toLowerCase();
               if(val.indexOf(sValue)> -1 || val1.indexOf(sValue) > -1 || val2.indexOf(sValue) > -1){
                 this._valueHelpDialog_2.getItems()[i].setVisible(true);
                 token=true;

               }
               else{
                 this._valueHelpDialog_2.getItems()[i].setVisible(false);
               }
               }
               if(token===false){
                 var sValue1=evt.getParameter("value");
                 var ppath = "/SEARCHREOBJECTSet?$filter=IvReobj eq '"+sValue1+"'";
                   this._valueHelpDialog_2.bindAggregation("items",ppath,new sap.m.ObjectListItem({
                       attributes: [ new sap.m.ObjectAttribute({
                     text:"{Address}"
                   })]

                     }));
               }
     },
     _handleValueHelpClose2 : function(evt) {

       var oSelectedItem = evt.getParameter("selectedItem");
       if (oSelectedItem) {
         var codepath=evt.oSource._aSelectedItems[0].oParent._aSelectedPaths[0];
           this.recode=evt.getSource().getModel().getProperty(codepath).Smenr;
           var addr=evt.mParameters.selectedItems[0].mAggregations.attributes[0].mProperties.text;
           sap.ui.getCore().byId("robject").setValue(addr);
           this.hc1();
       }
   },*/

   onSave:function(evt){
     

    // this.represt="
     var vfvendor=sap.ui.getCore().byId("vend2").getValue();
    if(this.mprest==="" && (vfvendor==="" || vfvendor===undefined)){
      sap.m.MessageBox.show("Please maintain imprest vendor in the user table !! Proposal can not be created");
      return;
    }
     var billNum=sap.ui.getCore().byId("Billnum").getValue();
     if(billNum==="" || billNum===undefined){
       sap.ui.getCore().byId("Billnum").setValueState("Error");
       sap.m.MessageToast.show("Enter bill number");
       return;
     }

     var billDate=sap.ui.getCore().byId("startDate").getDateValue();
     var bilDate=new Date();

     if(billDate==="" || billDate===undefined || billDate===null){
       sap.ui.getCore().byId("startDate").setValueState("Error");
       sap.m.MessageToast.show("Select bill date");
       return;
     }

     if(bilDate.getTime()<billDate.getTime()){
       sap.ui.getCore().byId("startDate").setValueState("Error");
       sap.m.MessageToast.show("Bill Date can not be in future");
       return;
     }
     var startdat=billDate.getDate();
     var startMonth=billDate.getMonth()+1;
     var startYear=billDate.getFullYear();
     if(startdat<10){
       startdat="0"+startdat;
     }
     if(startMonth<10){
       startMonth="0"+startMonth;
     }
     var billDate1=startYear+"-"+startMonth+"-"+startdat+"T00:00:00";

     var amnt=sap.ui.getCore().byId("Wrbtr").getValue();
     if(amnt==="" || amnt===undefined){
       sap.ui.getCore().byId("Wrbtr").setValueState("Error");
       sap.m.MessageToast.show("Enter amount");
       return;
     }
     var taxindi=sap.ui.getCore().byId("itr2").getState();
     if(taxindi===true)
      {
      taxindi="X";
      }
     else{
      taxindi="";
     }
     var adf=this.getView().byId("view2").getSelectedKey();
    var kdf=adf;
    if(adf==="122"){
    //  this.represt="";
    }
  if(adf==="2"){
   // this.represt="";
      kdf="";
    }
  /*var rentalObj=sap.ui.getCore().byId("robject").getValue();
  if(this.represt==="
    sap.ui.getCore().byId("robject").setValueState("Error");
    sap.m.MessageToast.show("Select Rental Object");
    return;
  }*/
  var vfvendor=sap.ui.getCore().byId("vend2").getValue();
  var vfvendor1=vfvendor.substring(0,vfvendor.indexOf("-"));
  if(vfvendor.indexOf("-")<=0){
    vfvendor1=vfvendor;
  }
  if(this.mprest==="XX" && (vfvendor==="" || vfvendor===undefined)){
    sap.ui.getCore().byId("pabl").setValueState("Error");
    sap.m.MessageToast.show("Select Vendor");
    return;
  }
  var that=this;
     var saveData={
         Contyp:kdf,
         Billnum:billNum,
         Billdt:billDate1,
         Wrbtr:amnt,
         Taxcode2Ind:taxindi,
         Lifnr:vfvendor1,
         Smenr:that.recode
     };

     var abcd=sap.ui.getCore().byId("fileupload2");
     var lenabcd=abcd.getModel().getData().dataitems.length;

     var filenamdb=[];
     for(var i=0; i<lenabcd; i++){
       var filenam={FileName: abcd.getModel().getData().dataitems[i].filename};
       filenamdb.push(filenam);
     }
     saveData.PROPOSALFILENAV=filenamdb;

     that.oModel.create("/ProposalCreateSet",saveData,null,function(data, request) {
            // var x = $.parseJSON(request.body);
             var msg=JSON.parse(request.headers["sap-message"]).message;
             //var prp = x.d.Mblnr;
             //var pryear = x.d.Mjahr;
             sap.m.MessageBox.show(msg,{
                      title:"Information",
                     actions : [ sap.m.MessageBox.Action.OK ],
                   onClose : function(){
                     sap.ui.getCore().byId("Billnum").setValue("");
                     sap.ui.getCore().byId("startDate").setValue("");
                     sap.ui.getCore().byId("Wrbtr").setValue("");
                     sap.ui.getCore().byId("sw1").setState(true);
                     sap.ui.getCore().byId("itr2").setState(false);
                     that.ccode="";
                     that.recode="";
                     that.getView().byId("itab206").destroyContent();
                  that.getView().byId("itab122").destroyContent();
                  that.getView().byId("itab2").destroyContent();
                     var router=sap.ui.core.UIComponent.getRouterFor(that);
                  router.navTo("main",{});
                       }
                   }
               );
           },
           function(oError) {

          var x= JSON.parse(oError.response.body).error.message.value;

             sap.m.MessageBox.show(x, {title:"Error"});
           });

   },
   hc1:function(){
     var bvalue=sap.ui.getCore().byId("Billnum").getValue();
     var dvalue=sap.ui.getCore().byId("startDate").getValue();
     var avalue=sap.ui.getCore().byId("Wrbtr").getValue();
     var payval=sap.ui.getCore().byId("pabl").getValue();
     //var rentval= sap.ui.getCore().byId("robject").getValue();
     if(bvalue){
       sap.ui.getCore().byId("Billnum").setValueState("None");
     }
     if(dvalue){
       sap.ui.getCore().byId("startDate").setValueState("None");
     }
     if(avalue){
       sap.ui.getCore().byId("Wrbtr").setValueState("None");
     }
     if(payval){
       sap.ui.getCore().byId("pabl").setValueState("None");
     }
    /* if(rentval){
       sap.ui.getCore().byId("pabl").setValueState("None");
     }*/
   },
   onCancel:function(){
     var navigationService = sap.ushell.Container.getService("CrossApplicationNavigation");
       navigationService.toExternal({
       target : { semanticObject : "", action: "" },
         });

   },
   onRset:function(){
     sap.ui.getCore().byId("Billnum").setValue("");
     sap.ui.getCore().byId("startDate").setValue("");
     sap.ui.getCore().byId("Wrbtr").setValue("");
     sap.ui.getCore().byId("pabl").setValue("");
     sap.ui.getCore().byId("vend2").setValue("");
     sap.ui.getCore().byId("pabl").setValueState("None");
    // sap.ui.getCore().byId("robject").setValue("");
    // sap.ui.getCore().byId("robject").setValueState("None");
     sap.ui.getCore().byId("Billnum").setValueState("None");
     sap.ui.getCore().byId("startDate").setValueState("None");
     sap.ui.getCore().byId("Wrbtr").setValueState("None");
     sap.ui.getCore().byId("sw1").setState(true);
     sap.ui.getCore().byId("itr2").setState(false);
     this.companydescription="";
    this.plantdescription="";
    this.taxdescription="";
    this.vendvalue1="";
    this.vend1="";
   // this.oModel="";
    this.ccode="";
    this.cctext="";
    this.recode="";
    this.retext="";
    this.mprest="";
    this.oModel.read("/GETVENDORJCSet(Contype='206',OtherInd='',ImprestInd='I')",null,false,false,function(oData,response){
      
      data=oData;
      this.vendvalue1=data.EvVendor;
       sap.ui.getCore().byId("vend2").setValue(this.vendvalue1);
         sap.ui.getCore().byId("pabl").setValue(this.vendvalue1.substring(this.vendvalue1.indexOf("-")+1,this.vendvalue1.length));
    });
    sap.ui.getCore().byId("pabl").setEditable(false);
    var vfvendor=sap.ui.getCore().byId("vend2").getValue();
    if(this.mprest==="" && (vfvendor==="" || vfvendor===undefined)){
      sap.m.MessageBox.show("Please maintain imprest vendor in the user table !! Proposal can not be created");
      return;
    }

    },
    onChange:function(evt){

        if(evt.mParameters.state==false){
          this.mprest="XX";
          var adf=this.getView().byId("view2").getSelectedKey();
          var kdf=adf;
          if(adf==="122"){
          //  this.represt="";
          }
        if(adf==="2"){
         // this.represt="";
            kdf="";
          }
          this.oModel.read("/GETVENDORJCSet(Contype='"+kdf+"',OtherInd='O',ImprestInd='')",null,false,false,function(oData,response){
            
            data=oData;
            this.vendvalue1=data.EvVendor;
            sap.ui.getCore().byId("vend2").setValue(this.vendvalue1);
            sap.ui.getCore().byId("pabl").setValue(this.vendvalue1.substring(this.vendvalue1.indexOf("-")+1,this.vendvalue1.length));
          });
          sap.ui.getCore().byId("ven").setVisible(true);
                    sap.ui.getCore().byId("pabl").setVisible(true);
                    sap.ui.getCore().byId("pabl").setEditable(true);
        }
        else{
          this.mprest="";
          this.ccode="";
          var adf=this.getView().byId("view2").getSelectedKey();
          var kdf=adf;
        if(adf==="2"){
            kdf="";
          }
          this.oModel.read("/GETVENDORJCSet(Contype='"+kdf+"',OtherInd='',ImprestInd='I')",null,false,false,function(oData,response){
            
            data=oData;
            this.vendvalue1=data.EvVendor;
            sap.ui.getCore().byId("vend2").setValue(this.vendvalue1);
            sap.ui.getCore().byId("pabl").setValue(this.vendvalue1.substring(this.vendvalue1.indexOf("-")+1,this.vendvalue1.length));
          });
          sap.ui.getCore().byId("pabl").setEditable(false);
          var vfvendor=sap.ui.getCore().byId("vend2").getValue();
          if(this.mprest==="" && (vfvendor==="" || vfvendor===undefined)){
            sap.m.MessageBox.show("Please maintain imprest vendor in the user table !! Proposal can not be created");
            return;
          }
        }
    },
   onExit:function(){
     
     delete oView;
     this.getView().byId("itab206").destroyContent();
    this.getView().byId("itab122").destroyContent();
    this.getView().byId("itab2").destroyContent();
   },

   fileUpload:function(){
     
       var oFileUpload = sap.ui.getCore().byId('fileupload2');
       oFileUpload.setUseMultipart(false);
       var mockData = {
        dataitems : [
        ] };
       var mockDataModel = new sap.ui.model.json.JSONModel(mockData);
       oFileUpload.setModel(mockDataModel);
       delete oModel.mCustomHeaders["X-CSRF-Token"];
},
csrfToken:function(){
  
   var a = "../../../../../Expense/proxy/sap/opu/odata/sap/ZJIO_PROPOSAL_CREATE_JC_BT_SRV/PROPOSALDETAILSSet(IvContype=%27208%27)";
    var f = {
              headers : {
                "X-Requested-With" : "XMLHttpRequest",
                "Content-Type" : "application/atom+xml",
                DataServiceVersion : "2.0",
                "X-CSRF-Token" : "Fetch"
              },
              requestUri : a,
              method : "GET"
       };
              OData.request(f, function(data, oSuccess) {
                oToken = oSuccess.headers['x-csrf-token'];
                     oHeaders = {
                                  "x-csrf-token" : oToken,
                           };
                 });

},

  onDeleteFile : function(oEventData) {
    
    sap.ui.getCore().byId("fileupload2").removeFile(oEventData.mParameters.documentId);
    //var fileupload = sap.ui.getCore().byId(oEventData.mParameters.id);
    var exte=oEventData.mParameters.filename;
    //var usrinfo=sap.ushell.Container.getService("UserInfo").getId();
       var usrinfor=exte;//+"_"+usrinfo;
    var path="/HeaderFileSet(IvInd='X',IvFilename='"+usrinfor+"')/HeaderFilleNav";
    this.oModel.create(path,null,null,false,function(oRequest,oResponse){
      },function(oError){
      });
  },

  onRenameFile : function(oEventData) {
    
     //store the file details to be updated [oEventData.mParameters.newFilename]
  },

  onUploadFile : function(oEventData) {
    
      var id = oEventData.mParameters.id;
      //var fileupload = sap.ui.getCore().byId(id);
        if(true){
            //var host = window.location.host;
            //var protocol = window.location.protocol;
           // var urlprefix = protocol + "//" + host;
            var oData = oEventData.getParameters();
            var dataItem = new Object();
            var size = "";
            if(oData.d!=undefined){
              dataItem.mimeType = oData.d.IvMimetype;
              dataItem.filename=  ext_filename;
              dataItem.size = size;
              var str = '';
                str += Math.floor(Math.random()*7) + 1;
             var number = parseInt(str);
              dataItem.documentId=100000-number;
            }else{}
            if(size > 1000000){
              }else{
                 sap.ui.getCore().byId(id).setRenameEnabled(false);
                 console.log(dataItem.documentId);
                 sap.ui.getCore().byId(id).commitFileUpload(dataItem);
             }
        }
    },

   onBeforeUploadFile : function(e) {
     
     var id = e.mParameters.id;
     var fileupload = sap.ui.getCore().byId(id);
     var type = ["jpg","jpeg","JPG","JPEG"];
     var ext = e.getParameter("name");
ext_filename=ext;
var extn = ext.substring(ext.lastIndexOf(".")+1,ext.length);
       if(sap.ui.Device.os.android !== true){
       if(ext.length > 26){
       sap.m.MessageBox.show("File name should not be more than 20 characters",{title:"Error"});
       fileupload.abortUpload();
       return false;
       }
         if(type.indexOf(extn)== -1){
               sap.m.MessageBox.show("File Type not supported",{title:"Error"});
               fileupload.abortUpload();
               return false;
               }
        }

       //var usrinfo=sap.ushell.Container.getService("UserInfo").getId();
       var usrinfor=ext;//+"_"+usrinfo;
       fileupload.setCustomHeader('slug',usrinfor+"|S");
            fileupload.setXsrfToken(oToken);
  },

  onFileUploadFailed : function(e) {
    
    sap.m.MessageToast.show("file upload failed, try again");
  },

  onSaveClicked: function () {
      var success = true;
      var fileUploadControl = this.byId("fileupload");
      setTimeout(jQuery.proxy(function () {
          if (success) {
              fileUploadControl.commitPendingRenames();
          } else {
              fileUploadControl.abandonPendingRenames();
          }

      }, this), 3000);
  },

  onCancelClicked: function () {

  }

  });