sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent",
    "vndrmgmt/listpage/model/Models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,UIComponent,Models) {
        "use strict";

        return Controller.extend("vndrmgmt.listpage.controller.Display", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.AppModel = this.getOwnerComponent().getModel("appModel");
                this.oRouter.getRoute("Display").attachPatternMatched(this.onDisplayRouteMatched, this);
            },
            onDisplayRouteMatched: function (oEvent) {
                var sUserId = oEvent.getParameter("arguments").userId;
                this.AppModel.setProperty("/action", 'Display');
                this._fnFetchUniqueUser(sUserId);
            },
            onCancel:function (oEvent) {
                this.oRouter.navTo("RouteListPage");
            }
            
        });
    });
