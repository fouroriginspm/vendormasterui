sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,UIComponent) {
        "use strict";

        return Controller.extend("vndrmgmt.listpage.controller.ViewDocument", {
            onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            // this.oRouter = UIComponent.getRouterFor(this);
            this._fnInitialSetModel();
              
            },
            _fnInitialSetModel: function()
            {
               var oProductModel = new JSONModel();
               oProductModel.loadData("/model/data.json");
               this.getView().setModel(oProductModel,"TableModel");
              
            },
            onCancel:function (oEvent) {
                this.oRouter.navTo("RouteListPage");
            }
        });
    });