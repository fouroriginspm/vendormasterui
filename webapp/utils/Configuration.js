sap.ui.define([
	"sap/base/Log"
], function(Log) {
	"use strict";
	return {
		fnBasePathUserManagement: "https://spusermgmt-zwjymjbxva-as.a.run.app",
		fnBaseOrder2Pay:"https://order2pay-zwjymjbxva-as.a.run.app",
		dbOperations:{
           "fetchVendorList": "/sp/POList/get-vendor-list"
        }
		
	};
}, true);