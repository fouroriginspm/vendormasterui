sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/models",
    "sap/ui/export/Spreadsheet",
    'sap/ui/export/library',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    'sap/m/MessageToast',
    'sap/ui/model/Sorter',
    "../utils/Configuration",
    "../utils/service",
    "sap/m/MessageBox"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, models, Spreadsheet, exportLibrary, Filter, FilterOperator, Fragment, MessageToast, Sorter,Configuration, Services,MessageBox) {
        "use strict";
        var EdmType = exportLibrary.EdmType;
        return Controller.extend("vndrmgmt.listpage.controller.ListPage", {

            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                // this.oRouter = UIComponent.getRouterFor(this);
                this._fnGetVendorList();
               
                this.AppModel = this.getOwnerComponent().getModel("appModel");

            },
            _fnGetVendorList: function () {
                var sUrl = Configuration.fnBaseOrder2Pay + Configuration.dbOperations.fetchVendorList;
                var headerRequest = {
                    "Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDAxLCJlbWFpbElkIjoia2VlLnN1ZUBmb3Vyb3JpZ2luLmNvbSIsImZpcnN0TmFtZSI6ImtlZSIsImxhc3ROYW1lIjoic3VlIiwidXNlclR5cGUiOiJQYXJ0bmVyIiwiaWF0IjoxNjgyMzQ1NTg4LCJleHAiOjE2ODIzNDkxODh9.GtAn9eNjFx3HbDKZ7rTfR-sNxD2U2K2JclGGDfmMGMM"
                };
                Services._fnRead(sUrl, "GET", {}, headerRequest,function (response, textStatus, xhr) {
                    debugger;
                    if(xhr.status === 200){
                        this.AppModel.setProperty("/items", response.data.vendorCode);
                    }else{
                        MessageBox.error("");
                    }
                    
                    
                
            }.bind(this), function(response){
                // if(response.status === 403){
                    MessageBox.error(response.responseJSON.message);
                // }
            });

            },
            onPressDisplay: function () {
                this.oRouter.navTo("Display");
            },
            onPressViewDocument: function () {
                this.oRouter.navTo("ViewDocument");
            },
            onPressUploadDocument: function () {
                this.oRouter.navTo("UploadDocument");
            },
            onDisplay: function (oEvent) {

                var oProductDisModel = this.getView().getModel("TableModel");
                var oSelectedObj = oEvent.getSource().getBindingContext("TableModel").getObject();
                oProductDisModel.setProperty("/displayGroup", oSelectedObj);
                this.oRouter.navTo("Display");
            },
            onDownload: function (oEvent) {

                var aCols, aUsers, oSettings, oSheet;
                aCols = this.createColumnConfig();
                aUsers = this.getOwnerComponent().getModel("TableModel").getProperty('/List');

                oSettings = {
                    workbook: { columns: aCols },
                    dataSource: aUsers,
                    fileName: "Vendor List"
                };

                oSheet = new Spreadsheet(oSettings);
                oSheet.build()
                    .then(function () {
                        MessageToast.show('Spreadsheet export has finished');
                    })
                    .finally(oSheet.destroy);
            },
            createColumnConfig: function () {
                return [
                    {
                        label: 'VENDOR_CODE',
                        property: 'VENDOR_CODE',
                        type: EdmType.Number
                    },
                    {
                        label: 'VENDOR_NAME',
                        property: 'VENDOR_NAME',
                        type: EdmType.String
                    },

                    {
                        label: 'SEQUENCE_ID',
                        property: 'SEQUENCE_ID',
                        type: EdmType.Number
                    },

                    {
                        label: 'VERSION',
                        property: 'VERSION',
                        type: EdmType.Number
                    },


                    {
                        label: 'DOCUMENT_NAME',
                        property: 'DOCUMENT_NAME',
                        type: EdmType.String
                    },
                    {
                        label: 'DOCUMENT_LINK',
                        property: 'DOCUMENT_LINK',
                        type: EdmType.String
                    },
                    {
                        label: 'DOCUMENT_UPLOAD DATE',
                        property: 'DOCUMENT_UPLOAD DATE',
                        type: EdmType.String
                    },
                    {
                        label: 'DOCUMENT_SIGNED DATE',
                        property: 'DOCUMENT_SIGNED DATE',
                        type: EdmType.String
                    },
                    {
                        label: 'DOCUMENT_REMARKS',
                        property: 'DOCUMENT_REMARKS',
                        type: EdmType.String
                    },
                    {
                        label: 'STATUS',
                        property: 'STATUS',
                        type: EdmType.String
                    }
                ];
            },
            onSort: function (oEvent) {
                var that = this;
                that.oMainKey = oEvent.getSource();
                if (!that._oSortF4) {
                    that._SortDialog = sap.ui.core.Fragment.load({
                        id: that.createId("_SortF4"),
                        name: "vndrmgmt.listpage.fragments.Sort",
                        controller: that
                    }).then(function (oDialog) {
                        that._oSortF4 = oDialog;
                        that.getView().addDependent(that._oSortF4);
                    });
                }
                that._SortDialog.then(function (oDialog) {
                    that._oSortF4.open();
                }.bind(this));
                if(!this.sortDialog){
                    this.sortDialog = sap.ui.xmlfragment();
                }
            },
            handleSortDialogConfirm: function (oEvent) {
                var oTable = this.getView().byId("idProductsTable"),
                    mParams = oEvent.getParameters(),
                    oBinding = oTable.getBinding("items"),
                    sPath,
                    bDescending,
                    aSorters = [];

                sPath = mParams.sortItem.getKey();
                bDescending = mParams.sortDescending;
                aSorters.push(new Sorter(sPath, bDescending));

                // apply the selected sort and group settings
                oBinding.sort(aSorters);
            },
           

        });
    });
