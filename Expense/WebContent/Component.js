jQuery.sap.declare("Expense.Component");
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("sap.ui.core.routing.History");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
sap.ui.core.UIComponent.extend("Expense.Component", {
    metadata : {
        "name" : "Expense",
        "version" : "1.1.0-SNAPSHOT",
        "library" : "Expense",
        "includes" : [],
        "dependencies" : {
            "libs" : [ "sap.m", "sap.ui.layout" ],
            "components" : []
        },
		"config" : {
			resourceBundle : "i18n/messageBundle.properties",
			serviceConfig : {
				name: "",
			serviceUrl: "../../../../../Expense/proxy/sap/opu/odata/sap/ZJIO_PROPOSAL_CREATE_JC_BT_SRV/?saml2=disabled"
				//serviceUrl : "../../../../../Expense/proxy/sap/opu/odata/sap/ZRSF_PRJ_SRV/?saml2=disabled"
			}
		},
        routing : {
            config : {
                "viewType" : "XML",
                "viewPath" : "Expense.view",
                "targetControl" : "fioriContent", 
                "targetAggregation" : "pages",
                "clearTarget" : false
            },
			routes : [
				{
					pattern : "",
					name : "main",
					view : "S1"
				},
				{
					
					name : "telephone",
					view : "S2",
					pattern:"telephone"	
				},
				{
					
					name : "sundry",
					view : "S3",
					pattern:"sundry"
				},
				{
					
					name : "rent",
					view : "S4",
					pattern:"rent"
				},
				{
					
					name : "electricity",
					view : "S5",
					pattern:"electricity"
				},
{
					
					name : "employee",
					view : "S6",
					pattern:"employee"
				},
{
					
					name : "local",
					view : "S7",
					pattern:"local"
				}
			]
        }
    },
    createContent : function() {
        var oViewData = {
            component : this
        };

        return sap.ui.view({
            viewName : "Expense.view.Main",
            type : sap.ui.core.mvc.ViewType.XML,
            viewData : oViewData
        });
    },

    init : function() {
        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
        var sRootPath = jQuery.sap.getModulePath("Expense");
        var oServiceConfig = this.getMetadata().getConfig().serviceConfig;
        var sServiceUrl = oServiceConfig.serviceUrl;
        var mConfig = this.getMetadata().getConfig();
        this._routeMatchedHandler = new sap.m.routing.RouteMatchedHandler(this.getRouter(), this._bRouterCloseDialogs);
        this._initODataModel(sServiceUrl);
        var i18nModel = new sap.ui.model.resource.ResourceModel({
            bundleUrl : [ sRootPath, mConfig.resourceBundle ].join("/")
        });
        this.setModel(i18nModel, "i18n");
        this.getRouter().initialize();

    },

    exit : function() {
        this._routeMatchedHandler.destroy();
    },
    setRouterSetCloseDialogs : function(bCloseDialogs) {
        this._bRouterCloseDialogs = bCloseDialogs;
        if (this._routeMatchedHandler) {
            this._routeMatchedHandler.setCloseDialogs(bCloseDialogs);
        }
    },
    _initODataModel : function(sServiceUrl) {
        var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
        oModel.setDefaultCountMode(sap.ui.model.odata.CountMode.None);
        this.setModel(oModel);
    }
});